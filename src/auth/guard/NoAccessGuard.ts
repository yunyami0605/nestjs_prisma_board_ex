import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class NoAccessGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;

    const token = request.headers.authorization?.replace('Bearer', '').trim();

    const salt = 'test';

    const payload = await this.authService.getUserId(token, {
      secret: salt,
    });

    request['user'] = payload;

    return true;
  }
}
