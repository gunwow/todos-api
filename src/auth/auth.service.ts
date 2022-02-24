import { UserService } from '../user/user.service';
import { SignUpDTO } from './dto/sign-up.dto';
import { User } from '../user/user.model';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { AuthTokensDTO } from './dto/auth-tokens.dto';
import { IJwtPayload } from './type/jwt-payload.interface';
import { SignInDTO } from './dto/sign-in.dto';
import { HashService } from '../common/hash/hash.service';

@Injectable()
export class AuthService {
  static ACCESS_TOKEN_LIFETIME = 300; // 5 min
  static REFRESH_TOKEN_LIFETIME = 2592000; // 30 days

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
  ) {}

  async signIn({ email, password }: SignInDTO): Promise<AuthTokensDTO> {
    const user: User = await this.userService.findByEmail(email);

    if (
      !user ||
      !(await this.hashService.compareHash(password, user.password))
    ) {
      throw new UnauthorizedException(`Credentials don't match.`);
    }

    return this.generateAuthTokens(user.id);
  }

  async signUp(payload: SignUpDTO): Promise<AuthTokensDTO> {
    const user: User = await this.userService.findByEmail(payload.email);
    if (user) {
      throw new ConflictException(
        `User with ${payload.email} email already exists.`,
      );
    }

    const createdUser: User = await this.userService.create(payload);

    return this.generateAuthTokens(createdUser.id);
  }

  async decodeToken(token: string): Promise<IJwtPayload> {
    return this.jwtService.verifyAsync(token);
  }

  private async generateAuthTokens(userId: string): Promise<AuthTokensDTO> {
    const accessToken: string = await this.generateAccessToken(userId);
    const refreshToken: string = await this.generateRefreshToken(userId);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async generateAccessToken(userId: string): Promise<string> {
    return this.jwtService.signAsync(
      <IJwtPayload>{
        userId,
      },
      {
        expiresIn: AuthService.ACCESS_TOKEN_LIFETIME,
      },
    );
  }

  private async generateRefreshToken(userId: string): Promise<string> {
    return this.jwtService.signAsync(
      <IJwtPayload>{
        userId,
        data: uuidv4(),
        isRefresh: true,
      },
      {
        expiresIn: AuthService.REFRESH_TOKEN_LIFETIME,
      },
    );
  }
}
