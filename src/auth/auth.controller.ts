import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDTO } from './dto/sign-up.dto';
import { AuthService } from './auth.service';
import { AuthTokensDTO } from './dto/auth-tokens.dto';
import { SignInDTO } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async signIn(@Body() payload: SignInDTO): Promise<AuthTokensDTO> {
    return this.authService.signIn(payload);
  }

  @Post('sign-up')
  async signUp(@Body() payload: SignUpDTO): Promise<AuthTokensDTO> {
    return this.authService.signUp(payload);
  }
}
