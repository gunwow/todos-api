import { Column, DataType, Default, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'categories',
})
export class Category extends Model {
  @Default(DataType.UUIDV4)
  @Column({
    primaryKey: true,
    type: DataType.UUIDV4,
  })
  id: string;

  @Column
  name: string;

  @Column
  description: string | null;

  @Column
  color: string | null;
}
