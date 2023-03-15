import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  checkConnect() {
    return 'CONNECT SUCCESS';
  }

  getUser(payload) {
    return this.prisma.user.findFirst({
      where: {
        email: payload.email,
      },
    });
  }
}
