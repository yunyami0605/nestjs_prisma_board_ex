import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentRepository } from './comment.repository';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepo: CommentRepository) {}

  create(createCommentDto: CreateCommentDto, postId: number, authorId: number) {
    return this.commentRepo.create(createCommentDto, postId, authorId);
  }

  findAll() {
    return this.commentRepo.findAll();
  }

  findCommentCursor(postId?: number, cursorId?: number) {
    return this.commentRepo.findCommentCursor(postId, cursorId);
  }

  findOne(id: number) {
    return this.commentRepo.findOne(id);
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return this.commentRepo.update(id, updateCommentDto);
  }

  remove(id: number) {
    return this.commentRepo.remove(id);
  }

  like(id: number) {
    return this.commentRepo.like(id);
  }

  dislike(id: number) {
    return this.commentRepo.dislike(id);
  }
}
