import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { AuthService } from '../auth.service';
import { IJwtPayload } from '../type/jwt-payload.interface';

export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader: string = request.header('Authorization');

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Not authorized.');
    }

    const token: string = authorizationHeader.replace('Bearer ', '');
    const { userId, isRefresh }: IJwtPayload =
      await this.authService.decodeToken(token);

    if (isRefresh) {
      throw new UnauthorizedException(
        'Refresh token provided instead of access token.',
      );
    }

    request.user = await this.userService.findByIdOrFail(userId);
    return true;
  }
}
