import { BaseRepository } from '../common/crud';
import { User } from './user.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(User);
  }

  async findByEmail(email: string): Promise<User> {
    return this.findOne({
      where: { email },
    });
  }
}
