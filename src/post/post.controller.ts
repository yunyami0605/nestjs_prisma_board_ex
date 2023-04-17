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
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AccessGuard } from 'src/auth/guard/AccessGuard';
import { RequestWithUser } from 'src/auth/interface/requestWithUser.interface';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiPostDecorator } from 'src/customDecorator/swagger/post.decorator';

@ApiTags('POST API')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AccessGuard)
  @Post()
  @ApiPostDecorator({
    summary: '유저 생성',
    DtoType: CreatePostDto,
  })
  create(@Body() createPostDto: CreatePostDto, @Req() req: RequestWithUser) {
    return this.postService.create({
      ...createPostDto,
      authorId: req.user.sub,
    });
  }

  @Get()
  @ApiOperation({
    summary: '게시글 리스트 페이지네이션 형식 조회 api',
  })
  findPage(@Query('page') page: string) {
    return this.postService.findPage(+page);
  }

  @Post('like/:id')
  @ApiOperation({
    summary: '게시글 좋아요 api',
  })
  like(@Param('id') id: string) {
    return this.postService.like(+id);
  }

  @Post('dislike/:id')
  @ApiOperation({
    summary: '게시글 싫어요 api',
  })
  dislike(@Param('id') id: string) {
    return this.postService.dislike(+id);
  }

  @Get('cursor')
  @ApiOperation({
    summary: '게시글 리스트 커서 방식 조회 api',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'id',
    required: false,
    type: String,
  })
  findPageCursor(@Query('search') search?: string, @Query('id') id?: string) {
    return this.postService.findPageCursor(search, +id);
  }

  @Get('all')
  @ApiOperation({
    summary: '전체 게시글 조회 api',
  })
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: ' 게시글 조회 api',
  })
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '게시글 수정 api',
  })
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '게시글 삭제 api',
  })
  @ApiResponse({
    status: 200,
    description: '게시글 삭제 성공',
  })
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
