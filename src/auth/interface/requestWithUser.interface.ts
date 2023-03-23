import { Request } from 'express';
import { User } from '@prisma/client';

export interface RequestWithUser extends Request {
  user: {
    sub: number;
    iat: number;
    exp: number;
  };
}
