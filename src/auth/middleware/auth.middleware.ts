import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';
import { Response } from 'express';
import { IJwtPayload } from '../type/jwt-payload.interface';
import { IRequestWithUser } from '../type/request-with-user.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly logger: Logger = new Logger();

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async use(
    request: IRequestWithUser,
    response: Response,
    next: () => void,
  ): Promise<any> {
    const authorizationHeader: string = request.header('Authorization');

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      this.logException(request, 'Bearer token not provided.');
      return next();
    }

    const token: string = authorizationHeader.replace('Bearer ', '');

    try {
      const { userId, isRefresh }: IJwtPayload =
        await this.authService.decodeToken(token);

      if (isRefresh) {
        this.logException(request, 'Bearer token not provided.');
        return next();
      }

      request.user = await this.userService.findByIdOrFail(userId);
    } catch (err) {
      this.logException(request, err.message);
    }
    return next();
  }

  logException(request: IRequestWithUser, message: string) {
    request.authError = message;
    this.logger.log(message);
  }
}
