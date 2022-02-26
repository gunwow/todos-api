import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IRequestWithUser } from '../type/request-with-user.interface';

export const ReqUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request: IRequestWithUser = context.switchToHttp().getRequest();
    return request.user;
  },
);
