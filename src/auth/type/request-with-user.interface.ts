import { Request } from 'express';
import { User } from '../../user/user.model';

export interface IRequestWithUser extends Request {
  user?: User;
  authError?: string;
}
