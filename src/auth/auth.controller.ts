import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDTO } from './dto/sign-up.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() payload: SignUpDTO) {
    return this.authService.signUp(payload);
  }
}
