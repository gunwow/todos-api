import { Injectable } from '@nestjs/common';
import { BaseService } from '../common/crud/base.service';
import { User } from './user.model';
import { UserRepository } from './user.repository';
import { HashService } from '../hash/hash.service';
import { ModelPayload } from '../common/crud';

@Injectable()
export class UserService extends BaseService<User, UserRepository> {
  constructor(
    protected readonly repository: UserRepository,
    private readonly hashService: HashService,
  ) {
    super(repository);
  }

  private async transformPayload(
    payload: ModelPayload<User>,
  ): Promise<ModelPayload<User>> {
    const hashedPassword: string = await this.hashService.hash(
      payload.password,
    );
    return {
      ...payload,
      password: hashedPassword,
    };
  }

  async findByEmail(email: string): Promise<User> {
    return this.repository.findByEmail(email);
  }

  async create(payload: ModelPayload<User>): Promise<User> {
    const newPayload: ModelPayload<User> = await this.transformPayload(payload);
    return super.create(newPayload);
  }

  async createMany(payload: ModelPayload<User>[]): Promise<User[]> {
    const newPayload: ModelPayload<User>[] = await Promise.all(
      payload.map((item: ModelPayload<User>) => this.transformPayload(item)),
    );
    return super.createMany(newPayload);
  }
}
