import { Injectable } from '@nestjs/common';
import { IJwtPayload } from '../../auth/type/jwt-payload.interface';
import { AuthTokensDTO } from '../../auth/dto/auth-tokens.dto';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService {
  static ACCESS_TOKEN_LIFETIME = 300; // 5 min
  static REFRESH_TOKEN_LIFETIME = 2592000; // 30 days

  constructor(private readonly jwtService: JwtService) {}

  async decodeToken(token: string): Promise<IJwtPayload> {
    return this.jwtService.verifyAsync(token);
  }

  async generateAuthTokens(userId: string): Promise<AuthTokensDTO> {
    const accessToken: string = await this.generateAccessToken(userId);
    const refreshToken: string = await this.generateRefreshToken(userId);

    return {
      accessToken,
      refreshToken,
    };
  }

  async generateAccessToken(userId: string): Promise<string> {
    return this.jwtService.signAsync(
      <IJwtPayload>{
        userId,
      },
      {
        expiresIn: JwtTokenService.ACCESS_TOKEN_LIFETIME,
      },
    );
  }

  async generateRefreshToken(userId: string): Promise<string> {
    return this.jwtService.signAsync(
      <IJwtPayload>{
        userId,
        data: uuidv4(),
        isRefresh: true,
      },
      {
        expiresIn: JwtTokenService.REFRESH_TOKEN_LIFETIME,
      },
    );
  }
}
