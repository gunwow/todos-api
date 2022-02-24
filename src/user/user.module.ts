import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { HashModule } from '../common/hash/hash.module';

@Module({
  imports: [HashModule],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
