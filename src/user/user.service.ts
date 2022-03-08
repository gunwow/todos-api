import { Injectable } from '@nestjs/common';
import { BaseCrudService } from '../common/crud/base-crud.service';
import { User } from './user.model';
import { UserRepository } from './user.repository';
import { HashService } from '../common/hash/hash.service';
import { ModelPayload } from '../common/crud';
import { FindOptions } from 'sequelize';

type UserFields = (keyof User)[];

@Injectable()
export class UserService extends BaseCrudService<User, UserRepository> {
  private excludedFields: UserFields = ['password'];

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

  private resolveExcludedFields(exclude?: UserFields): UserFields {
    return exclude ?? this.excludedFields;
  }

  async findByIdWithoutExcludedFieldsOrFail(
    id: string,
    exclude?: UserFields,
  ): Promise<User> {
    return this.findOneWithoutExcludedFieldsOrFail(
      {
        where: { id },
      },
      exclude,
    );
  }

  async findOneWithoutExcludedFieldsOrFail(
    options?: FindOptions<User>,
    exclude?: UserFields,
  ): Promise<User> {
    return this.findOneOrFail({
      ...options,
      attributes: { exclude: this.resolveExcludedFields(exclude) },
    });
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
