import { Injectable } from '@nestjs/common';
import { CreateRecommentDto } from './dto/create-recomment.dto';
import { UpdateRecommentDto } from './dto/update-recomment.dto';
import { RecommentRepository } from './recomment.repository';

@Injectable()
export class RecommentService {
  constructor(private readonly recommentRepo: RecommentRepository) {}
  create(
    createRecommentDto: CreateRecommentDto,
    commentId: number,
    userId: number,
  ) {
    return this.recommentRepo.create(createRecommentDto, commentId, userId);
  }

  findAll() {
    return this.recommentRepo.findAll();
  }

  findOne(id: number) {
    return this.recommentRepo.findOne(id);
  }

  update(id: number, updateRecommentDto: UpdateRecommentDto) {
    return this.recommentRepo.update(id, updateRecommentDto);
  }

  remove(id: number) {
    return this.recommentRepo.remove(id);
  }

  like(id: number, userId?: number) {
    return this.recommentRepo.like(id, userId);
  }

  dislike(id: number, userId?: number) {
    return this.recommentRepo.dislike(id, userId);
  }
}
