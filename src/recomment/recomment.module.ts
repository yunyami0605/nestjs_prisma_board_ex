import { Module } from '@nestjs/common';
import { RecommentService } from './recomment.service';
import { RecommentController } from './recomment.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RecommentRepository } from './recomment.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [RecommentController],
  providers: [RecommentService, RecommentRepository],
})
export class RecommentModule {}
