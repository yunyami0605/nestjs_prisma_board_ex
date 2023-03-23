import { Module } from '@nestjs/common';
import { RecommentService } from './recomment.service';
import { RecommentController } from './recomment.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RecommentRepository } from './recomment.repository';

@Module({
  imports: [PrismaModule],
  controllers: [RecommentController],
  providers: [RecommentService, RecommentRepository],
})
export class RecommentModule {}
