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

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AccessGuard)
  @Post()
  create(@Body() createPostDto: CreatePostDto, @Req() req: RequestWithUser) {
    return this.postService.create({
      ...createPostDto,
      authorId: req.user.sub,
    });
  }

  @Get()
  findPage(@Query('page') page: string) {
    return this.postService.findPage(+page);
  }

  @Post('like/:id')
  like(@Param('id') id: string) {
    return this.postService.like(+id);
  }

  @Post('dislike/:id')
  dislike(@Param('id') id: string) {
    return this.postService.dislike(+id);
  }

  @Get('cursor')
  findPageCursor(@Query('search') search?: string, @Query('id') id?: string) {
    return this.postService.findPageCursor(search, +id);
  }

  @Get('all')
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
