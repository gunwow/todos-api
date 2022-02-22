import { IMigratorOptions } from '../type';

export const up = async ({ context }: IMigratorOptions): Promise<void> => {
  await context.sequelize.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
};

export const down = async ({ context }: IMigratorOptions): Promise<void> => {
  await context.dropTable(`DROP EXTENSION IF EXISTS "uuid-ossp";`);
};
