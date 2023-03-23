import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(':postId')
  create(
    @Body() createCommentDto: CreateCommentDto,
    @Param('postId') postId: string,
  ) {
    const authorId = 1;

    return this.commentService.create(createCommentDto, +postId, authorId);
  }

  @Get('all')
  findAll() {
    return this.commentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  @Get('/cursor/:postId')
  findCommentCursor(
    @Param('postId') postId: string,
    @Query('cursorId') cursorId?: string,
  ) {
    return this.commentService.findCommentCursor(+postId, +cursorId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }

  @Post('like/:id')
  like(@Param('id') id: string) {
    return this.commentService.like(+id);
  }

  @Post('dislike/:id')
  dislike(@Param('id') id: string) {
    return this.commentService.dislike(+id);
  }
}
