import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ReqUser } from '../auth/decorator/req-user.decorator';
import { User } from './user.model';
import { UserService } from './user.service';

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  async me(@ReqUser() user: User): Promise<User> {
    return user;
  }
}
