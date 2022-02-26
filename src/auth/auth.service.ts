import { UserService } from '../user/user.service';
import { SignUpDTO } from './dto/sign-up.dto';
import { User } from '../user/user.model';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthTokensDTO } from './dto/auth-tokens.dto';
import { SignInDTO } from './dto/sign-in.dto';
import { HashService } from '../common/hash/hash.service';
import { JwtTokenService } from '../common/jwt-token/jwt-token.service';
import { IJwtPayload } from './type/jwt-payload.interface';
import { RefreshDTO } from './dto/refresh.dto';
import { AccessTokenDTO } from './dto/access-token.dto';
import { AuthError } from './error/auth-error.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashService: HashService,
    private readonly jwtTokenService: JwtTokenService,
  ) {}

  async signIn({ email, password }: SignInDTO): Promise<AuthTokensDTO> {
    const user: User = await this.userService.findByEmail(email);

    if (
      !user ||
      !(await this.hashService.compareHash(password, user.password))
    ) {
      throw new UnauthorizedException(`Credentials don't match.`);
    }

    return this.jwtTokenService.generateAuthTokens(user.id);
  }

  async refresh(payload: RefreshDTO): Promise<AccessTokenDTO> {
    let decoded: IJwtPayload;
    try {
      decoded = await this.decodeToken(payload.refreshToken);
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }

    if (!decoded.isRefresh) {
      throw new UnauthorizedException(AuthError.REFRESH_TOKEN_NOT_PROVIDED);
    }

    const accessToken: string = await this.jwtTokenService.generateAccessToken(
      decoded.userId,
    );
    return { accessToken };
  }

  async signUp(payload: SignUpDTO): Promise<AuthTokensDTO> {
    const user: User = await this.userService.findByEmail(payload.email);
    if (user) {
      throw new ConflictException(
        `User with ${payload.email} email already exists.`,
      );
    }

    const createdUser: User = await this.userService.create(payload);

    return this.jwtTokenService.generateAuthTokens(createdUser.id);
  }

  async decodeToken(token: string): Promise<IJwtPayload> {
    return this.jwtTokenService.decodeToken(token);
  }
}
