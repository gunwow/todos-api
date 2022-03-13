import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

@Catch(Error)
export class DatabaseErrorFilter implements ExceptionFilter {
  exceptionNamesToHandle: string[] = ['SequelizeDatabaseError'];

  catch(exception: Error, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();

    if (this.exceptionNamesToHandle.includes(exception.name)) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST.toString(),
        key: `${HttpStatus.BAD_REQUEST} Bad Request`,
        message: `Exception message: '${exception.message}'`,
      });
    }

    return this.throw500Exception(response, exception);
  }

  throw500Exception(response: Response, exception: Error) {
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR.toString(),
      key: '500 internal server error',
      message: `Exception message: '${exception.message}'`,
    });
  }
}
