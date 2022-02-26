import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HashModule } from '../common/hash/hash.module';
import { JwtTokenModule } from '../common/jwt-token/jwt-token.module';

@Module({
  imports: [UserModule, HashModule, JwtTokenModule],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
