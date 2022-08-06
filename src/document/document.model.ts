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
  tableName: 'documents',
})
export class Document extends Model {
  @Default(DataType.UUIDV4)
  @Column({
    primaryKey: true,
    type: DataType.UUIDV4,
  })
  id: string;

  @Column({
    allowNull: false,
  })
  content: string;

  @ForeignKey(() => User)
  @Column(DataType.UUIDV4)
  userId: string;

  @BelongsTo(() => User)
  user: User;
}
