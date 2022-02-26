import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { IRequestWithUser } from '../type/request-with-user.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: IRequestWithUser = context.switchToHttp().getRequest();

    if (!request.user) {
      throw new UnauthorizedException(request.authError || 'Not authorized.');
    }
    return true;
  }
}
