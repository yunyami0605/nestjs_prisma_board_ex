import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(private readonly postRepo: PostRepository) {}

  create(createPostDto: CreatePostDto) {
    return this.postRepo.create(createPostDto);
  }

  findAll() {
    return this.postRepo.findAll();
  }

  findOne(id: number, userId?: number) {
    return this.postRepo.findOne(id, userId);
  }

  findPage(page: number) {
    return this.postRepo.findPage(page);
  }

  findPageCursor(search?: string, id?: number) {
    return this.postRepo.findPageCursor(search, id);
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.postRepo.update(id, updatePostDto);
  }

  remove(id: number) {
    return this.postRepo.remove(id);
  }

  like(id: number, userId: number) {
    return this.postRepo.like(id, userId);
  }

  dislike(id: number, userId: number) {
    return this.postRepo.dislike(id, userId);
  }
}
