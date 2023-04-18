import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRecommentDto } from './dto/create-recomment.dto';
import { UpdateRecommentDto } from './dto/update-recomment.dto';

@Injectable()
export class RecommentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createRecommentDto: CreateRecommentDto,
    commentId: number,
    userId: number,
  ) {
    return this.prisma.recomment.create({
      data: {
        ...createRecommentDto,
        commentId,
        userId,
      },
      select: {
        id: true,
      },
    });
  }

  findAll() {
    return this.prisma.recomment.findMany();
  }

  findOne(id: number) {
    return this.prisma.recomment.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  update(id: number, updateRecommentDto: UpdateRecommentDto) {
    return this.prisma.recomment.update({
      where: {
        id,
      },
      data: updateRecommentDto,
    });
  }

  remove(id: number) {
    return this.prisma.recomment.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  like(id: number, userId: number) {
    return this.prisma.recomment.update({
      where: {
        id,
      },
      data: {
        like: { increment: 1 },
        recommentLikeJoin: {
          create: {
            userId,
          },
        },
      },
    });
  }

  dislike(id: number, userId: number) {
    return this.prisma.recomment.update({
      where: {
        id,
      },
      data: {
        like: { decrement: 1 },
        recommentLikeJoin: {
          delete: {
            userId_recommentId: {
              recommentId: id,
              userId,
            },
          },
        },
      },
    });
  }
}
