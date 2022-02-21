import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Category } from '../category/category.model';

@Table({
  tableName: 'todos',
})
export class Todo extends Model {
  @Default(DataType.UUIDV4)
  @Column({
    primaryKey: true,
    type: DataType.UUIDV4,
  })
  id: string;

  @ForeignKey(() => Category)
  @Column(DataType.UUIDV4)
  categoryId: string | null;

  @BelongsTo(() => Category)
  category: Category;

  @Column({
    allowNull: false,
  })
  content: string;

  @Column
  completedAt: Date | null;
}
