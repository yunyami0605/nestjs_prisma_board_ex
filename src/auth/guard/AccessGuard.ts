import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;

    const token = request.headers.authorization?.replace('Bearer', '').trim();

    if (!token) {
      throw new UnauthorizedException();
    }

    const salt = 'test';

    const payload = await this.authService.verifyToken(token, {
      secret: salt,
    });

    console.log('@@@ payload');
    console.log(payload);

    request['user'] = payload;

    return true;
  }
}
