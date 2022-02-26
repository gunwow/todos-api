import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../user/user.model';

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

  @ForeignKey(() => User)
  @Column(DataType.UUIDV4)
  userId: string | null;

  @Column
  name: string;

  @Column
  description: string | null;

  @Column
  color: string | null;

  @BelongsTo(() => User)
  user?: User;
}
