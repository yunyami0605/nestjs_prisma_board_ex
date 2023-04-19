import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto) {
    const createdPost = await this.prisma.post.create({
      data: {
        title: createPostDto.title,
        content: createPostDto.content,
        authorId: createPostDto.authorId,
      },
      select: {
        id: true,
      },
    });

    const postTagCreatePromises = createPostDto.tags.map((text) =>
      this.prisma.postTagJoin.create({
        data: {
          tag: {
            connectOrCreate: {
              where: { text },
              create: { text, postId: createdPost.id },
            },
          },
          post: { connect: { id: createdPost.id } },
        },
      }),
    );

    await Promise.all(postTagCreatePromises);

    return createdPost;
  }

  findAll() {
    return this.prisma.post.findMany();
  }

  findOne(id: number, userId?: number) {
    return this.prisma.post.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      select: {
        id: true,
        title: true,
        content: true,
        like: true,
        view: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        postLikeJoin: true,
        postTagJoin: { select: { tag: { select: { text: true } } } },
        author: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    });
  }

  findPage(page: number) {
    const postCount = 4;

    return this.prisma.post.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        postTagJoin: true,
      },
      skip: (page - 1) * postCount,
      take: postCount,
    });
  }

  findPageCursor(search?: string, id?: number) {
    const postCount = 8;

    return this.prisma.post.findMany({
      where: {
        deletedAt: null,
        title: { contains: search },
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        content: true,
        like: true,
        view: true,

        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            comments: true,
          },
        },
        postTagJoin: true,
        author: {
          select: {
            nickname: true,
          },
        },
      },

      take: postCount,
      skip: id ? 1 : 0,
      ...(id && {
        cursor: {
          id,
        },
      }),
    });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    const { title, content, authorId, tags } = updatePostDto;
    const uniqueTagTexts = [...new Set(tags)];

    return this.prisma.post.update({
      where: {
        id,
      },
      data: {
        title,
        content,
        authorId,
        // tags: {
        //   create: uniqueTagTexts.map((tag) => ({
        //     text: tag,
        //   })),
        // },
      },
    });
  }

  remove(id: number) {
    return this.prisma.post.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  like(id: number, userId: number) {
    return this.prisma.post.update({
      where: {
        id,
      },
      data: {
        like: { increment: 1 },
        postLikeJoin: {
          create: {
            userId,
          },
        },
      },
    });
  }

  dislike(id: number, userId: number) {
    return this.prisma.post.update({
      where: {
        id,
      },
      data: {
        like: { decrement: 1 },
        postLikeJoin: {
          delete: {
            userId_postId: { postId: id, userId },
          },
        },
      },
    });
  }
}
