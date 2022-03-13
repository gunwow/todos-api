import { Injectable } from '@nestjs/common';
import { IJwtPayload } from '../../auth/type/jwt-payload.interface';
import { AuthTokensDTO } from '../../auth/dto/auth-tokens.dto';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

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
    const accessTokenTTL: number = +this.configService.get(
      'JWT_ACCESS_TOKEN_TTL',
    );

    return this.jwtService.signAsync(
      <IJwtPayload>{
        userId,
      },
      {
        expiresIn: accessTokenTTL,
      },
    );
  }

  async generateRefreshToken(userId: string): Promise<string> {
    const refreshTokenTTL: number = +this.configService.get(
      'JWT_REFRESH_TOKEN_TTL',
    );

    return this.jwtService.signAsync(
      <IJwtPayload>{
        userId,
        data: uuidv4(),
        isRefresh: true,
      },
      {
        expiresIn: refreshTokenTTL,
      },
    );
  }
}
