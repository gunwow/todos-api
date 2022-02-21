import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { ForeignKeyConstraintError } from 'sequelize';
import { Response } from 'express';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

@Catch(ForeignKeyConstraintError)
export class ForeignKeyConstraintFilter implements ExceptionFilter {
  catch(exception: ForeignKeyConstraintError, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();
    const status: number = HttpStatus.CONFLICT;

    response.status(status).json({
      statusCode: status.toString(),
      key: exception.index,
      message: `Constraint violation by key: '${exception.index}'`,
    });
  }
}
