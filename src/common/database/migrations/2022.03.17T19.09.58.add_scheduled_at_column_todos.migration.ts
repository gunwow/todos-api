import { DataTypes } from 'sequelize';
import { IMigratorOptions } from '../type';

export const up = async ({ context }: IMigratorOptions): Promise<void> => {
  await context.addColumn('todos', 'scheduledAt', {
    type: DataTypes.DATE,
    allowNull: true,
  });
};

export const down = async ({ context }: IMigratorOptions): Promise<void> => {
  await context.removeColumn('todos', 'scheduledAt');
};
