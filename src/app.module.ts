import {
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './common/database';
import { CommandModule } from 'nestjs-command';
import { TodoModule } from './todo/todo.module';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { CategoryModule } from './category/category.module';
import { ForeignKeyConstraintFilter } from './common/filter';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './auth/middleware/auth.middleware';
import { DocumentModule } from './document/document.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    CommandModule,
    TodoModule,
    CategoryModule,
    UserModule,
    AuthModule,
    DocumentModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useFactory: () => new ValidationPipe({ transform: true }),
    },
    {
      provide: APP_FILTER,
      useClass: ForeignKeyConstraintFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
