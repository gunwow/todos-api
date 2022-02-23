import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class HashService {
  async hash(value: string): Promise<string> {
    const salt: string = await bcrypt.genSalt(10);
    return bcrypt.hash(value, salt);
  }

  async compareHash(rawValue: string, hash: string): Promise<boolean> {
    return bcrypt.compare(rawValue, hash);
  }
}
