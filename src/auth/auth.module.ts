import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from 'src/user/user.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AccessGuard } from './guard/AccessGuard';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, JwtService, AccessGuard],
  exports: [AuthService],
})
export class AuthModule {}
