import sequelize, { DataTypes } from 'sequelize';
import { IMigratorOptions } from '../type';

export const up = async ({ context }: IMigratorOptions): Promise<void> => {
  await context.createTable('users', {
    id: {
      type: DataTypes.UUID,
      defaultValue: sequelize.literal('uuid_generate_v4()'),
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  });

  await context.addColumn('categories', 'userId', {
    type: DataTypes.UUID,
    references: {
      model: 'users',
      key: 'id',
    },
    allowNull: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  await context.addColumn('todos', 'userId', {
    type: DataTypes.UUID,
    references: {
      model: 'users',
      key: 'id',
    },
    allowNull: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
};

export const down = async ({ context }: IMigratorOptions): Promise<void> => {
  await context.removeColumn('todos', 'userId');
  await context.removeColumn('categories', 'userId');
  await context.dropTable('users');
};
