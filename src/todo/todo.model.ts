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
import { User } from '../user/user.model';

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

  @ForeignKey(() => User)
  @Column(DataType.UUIDV4)
  userId: string | null;

  @Column({
    allowNull: false,
  })
  content: string;

  @Column
  scheduledAt: Date | null;

  @Column
  completedAt: Date | null;

  @BelongsTo(() => Category)
  category?: Category;

  @BelongsTo(() => User)
  user?: User;
}
