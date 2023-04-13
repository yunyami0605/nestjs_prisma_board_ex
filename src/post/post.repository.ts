import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(createPostDto: CreatePostDto) {
    const uniqueTagTexts = [...new Set(createPostDto.tags)];

    return this.prisma.post.create({
      data: {
        title: createPostDto.title,
        content: createPostDto.content,
        authorId: createPostDto.authorId,
        tags: {
          // connectOrCreate: 존재하는 태그를 연결하고 존재하지 않으면 생성함
          connectOrCreate: createPostDto.tags.map((tagText) => ({
            where: { text: tagText },
            create: { text: tagText },
          })),
        },
      },
      select: {
        id: true,
      },
    });
  }

  findAll() {
    return this.prisma.post.findMany();
  }

  findOne(id: number) {
    return this.prisma.post.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
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
        tags: true,
      },
      skip: (page - 1) * postCount,
      take: postCount,
    });
  }

  findPageCursor(search?: string, id?: number) {
    const postCount = 10;

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
        tags: true,
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
        tags: {
          create: uniqueTagTexts.map((tag) => ({
            text: tag,
          })),
        },
      },
    });
  }

  remove(id: number) {
    return this.prisma.post.delete({
      where: {
        id,
      },
    });
  }

  like(id: number) {
    return this.prisma.post.update({
      where: {
        id,
      },
      data: {
        like: { increment: 1 },
      },
    });
  }

  dislike(id: number) {
    return this.prisma.post.update({
      where: {
        id,
      },
      data: {
        like: { decrement: 1 },
      },
    });
  }
}
