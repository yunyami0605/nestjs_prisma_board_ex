import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentRepository } from './comment.repository';
import { Error403, Error404 } from 'src/error/exception';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepo: CommentRepository) {}

  create(
    createCommentDto: CreateCommentDto,
    postId: number,
    authorId?: number,
  ) {
    if (!postId) Error404();
    if (!authorId) Error403();
    return this.commentRepo.create(createCommentDto, postId, authorId);
  }

  findAll() {
    return this.commentRepo.findAll();
  }

  findCommentCursor(postId?: string, cursorId?: string) {
    if (!postId) Error403();
    return this.commentRepo.findCommentCursor(postId, cursorId);
  }

  findOne(id: number) {
    return this.commentRepo.findOne(id);
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return this.commentRepo.update(id, updateCommentDto);
  }

  async remove(id: number, userId: number) {
    const commentData = await this.commentRepo.findOne(id);

    if (commentData.userId !== userId) Error403();

    return this.commentRepo.remove(id);
  }

  like(id: number) {
    return this.commentRepo.like(id);
  }

  dislike(id: number) {
    return this.commentRepo.dislike(id);
  }
}
