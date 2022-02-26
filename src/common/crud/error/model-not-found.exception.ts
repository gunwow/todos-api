import { HttpException, HttpStatus } from '@nestjs/common';

interface IModelNotFoundExceptionOptions {
  id?: string;
}

export class ModelNotFoundException extends HttpException {
  constructor(options?: IModelNotFoundExceptionOptions) {
    super(
      {
        code: 'modelNotFound',
        message: options?.id
          ? `Model with id [${options.id}] not found.`
          : 'Model not found',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
