import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createCommentDto: CreateCommentDto,
    postId: number,
    userId: number,
  ) {
    return this.prisma.comment
      .create({
        data: {
          ...createCommentDto,
          postId,
          userId,
        },
        select: {
          id: true,
        },
      })
      .catch((error) => {
        throw new NotFoundException();
      });
  }

  findAll() {
    return this.prisma.comment.findMany();
  }

  findCommentCursor(postId: string, cursorId?: string, userId?: number) {
    const commentShowCount = 4;

    return this.prisma.comment.findMany({
      where: {
        postId: Number(postId),
        // deletedAt: null,
      },
      select: {
        content: true,
        id: true,
        like: true,
        postId: true,
        thank: true,
        userId: true,
        recomments: {
          select: {
            id: true,
            content: true,
            thank: true,
            like: true,
            userId: true,
            commentId: true,
            createdAt: true,
            updatedAt: true,
            deletedAt: true,
            user: {
              select: {
                nickname: true,
              },
            },
            recommentLikeJoin: {
              where: {
                userId,
              },
            },
          },
        },
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        user: {
          select: {
            nickname: true,
          },
        },
        commentLikeJoin: {
          where: {
            userId,
          },
        },
      },
      take: commentShowCount,
      skip: cursorId ? 1 : 0,
      ...(cursorId && {
        cursor: {
          id: Number(cursorId),
        },
      }),
    });
  }

  findOne(id: number) {
    return this.prisma.comment.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return this.prisma.comment.update({
      where: {
        id,
      },
      data: updateCommentDto,
    });
  }

  async remove(id: number) {
    const deleteData = await this.prisma.comment.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return deleteData.id;
  }

  like(id: number, userId: number) {
    return this.prisma.comment.update({
      where: {
        id,
      },
      data: {
        like: { increment: 1 },
        commentLikeJoin: {
          create: {
            userId,
          },
        },
      },
    });
  }

  dislike(id: number, userId: number) {
    return this.prisma.comment.update({
      where: {
        id,
      },
      data: {
        like: { decrement: 1 },
        commentLikeJoin: {
          delete: {
            userId_commentId: {
              commentId: id,
              userId,
            },
          },
        },
      },
    });
  }
}
