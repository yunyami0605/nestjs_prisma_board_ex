import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiPostDecorator } from 'src/customDecorator/swagger/post.decorator';
import { AccessGuard } from 'src/auth/guard/AccessGuard';
import { RequestWithUser } from 'src/auth/interface/requestWithUser.interface';
import { NoAccessGuard } from 'src/auth/guard/NoAccessGuard';

@ApiTags('COMMENT API')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AccessGuard)
  @Post(':postId')
  @ApiPostDecorator({
    summary: '댓글 생성 api',
    DtoType: CreateCommentDto,
  })
  create(
    @Body() createCommentDto: CreateCommentDto,
    @Param('postId') postId: string,
    @Req() req: RequestWithUser,
  ) {
    const authorId = req.user.sub;

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

  @UseGuards(NoAccessGuard)
  @Get('/cursor/:postId')
  @ApiOperation({
    summary: '댓글 리스트 커서 api',
  })
  @ApiParam({
    name: 'postId',
    required: true,
    type: String,
  })
  @ApiQuery({
    name: 'cursorId',
    required: false,
    type: String,
  })
  findCommentCursor(
    @Req() req: RequestWithUser,
    @Param('postId') postId?: string,
    @Query('cursorId') cursorId?: string,
  ) {
    return this.commentService.findCommentCursor(
      postId,
      cursorId,
      req.user.sub,
    );
  }

  @Patch(':id')
  @ApiOperation({
    summary: '댓글 수정 api',
  })
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @UseGuards(AccessGuard)
  @ApiOperation({
    summary: '댓글 삭제 api',
  })
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    const userId = req.user.sub;

    return this.commentService.remove(+id, userId);
  }

  @UseGuards(NoAccessGuard)
  @Post('like/:id')
  @ApiOperation({
    summary: '댓글 좋아요 api',
  })
  like(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.commentService.like(+id, req.user.sub);
  }

  @UseGuards(NoAccessGuard)
  @Post('dislike/:id')
  @ApiOperation({
    summary: '댓글 싫어요 api',
  })
  dislike(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.commentService.dislike(+id, req.user.sub);
  }
}
