import { UserService } from '../user/user.service';
import { SignUpDTO } from './dto/sign-up.dto';
import { User } from '../user/user.model';
import { ConflictException, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signUp(payload: SignUpDTO): Promise<any> {
    const user: User = await this.userService.findByEmail(payload.email);
    if (user) {
      throw new ConflictException(
        `User with ${payload.email} email already exists.`,
      );
    }

    await this.userService.create(payload);
    return {
      accessToken: '',
      refreshToken: '',
    };
  }
}
