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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiPostDecorator } from 'src/customDecorator/swagger/post.decorator';

@ApiTags('COMMENT API')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(':postId')
  @ApiPostDecorator({
    summary: '댓글 생성 api',
    DtoType: CreateCommentDto,
  })
  create(
    @Body() createCommentDto: CreateCommentDto,
    @Param('postId') postId: string,
  ) {
    const authorId = 1;

    return this.commentService.create(createCommentDto, +postId, authorId);
  }

  @Get('all')
  @ApiOperation({
    summary: '댓글 전체 조회 api',
  })
  findAll() {
    return this.commentService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: '댓글 조회 api',
  })
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  @Get('/cursor/:postId')
  @ApiOperation({
    summary: '댓글 리스트 커서 api',
  })
  findCommentCursor(
    @Param('postId') postId: string,
    @Query('cursorId') cursorId?: string,
  ) {
    return this.commentService.findCommentCursor(+postId, +cursorId);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '댓글 수정 api',
  })
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @ApiOperation({
    summary: '댓글 삭제 api',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }

  @Post('like/:id')
  @ApiOperation({
    summary: '댓글 좋아요 api',
  })
  like(@Param('id') id: string) {
    return this.commentService.like(+id);
  }

  @Post('dislike/:id')
  @ApiOperation({
    summary: '댓글 싫어요 api',
  })
  dislike(@Param('id') id: string) {
    return this.commentService.dislike(+id);
  }
}
