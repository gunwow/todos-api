import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as queryString from 'qs';
import { NestExpressApplication } from '@nestjs/platform-express';

const bootstrap = async () => {
  const app: NestExpressApplication =
    await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  app.set('query parser', (str) =>
    queryString.parse(str, { parseArrays: false }),
  );

  const config: ConfigService = app.get(ConfigService);
  const port: number = +config.get<number>('APP_PORT');
  await app.listen(port);
};

bootstrap();
