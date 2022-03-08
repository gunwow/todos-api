import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { HashModule } from '../common/hash/hash.module';
import { UserController } from './user.controller';

@Module({
  imports: [HashModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
