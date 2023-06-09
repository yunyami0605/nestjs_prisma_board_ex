import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { RecommentService } from './recomment.service';
import { CreateRecommentDto } from './dto/create-recomment.dto';
import { UpdateRecommentDto } from './dto/update-recomment.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiPostDecorator } from 'src/customDecorator/swagger/post.decorator';
import { NoAccessGuard } from 'src/auth/guard/NoAccessGuard';
import { RequestWithUser } from 'src/auth/interface/requestWithUser.interface';

@ApiTags('RECOMMENT API')
@Controller('recomment')
export class RecommentController {
  constructor(private readonly recommentService: RecommentService) {}

  @Post(':commentId')
  @ApiPostDecorator({
    summary: '답글 생성 api',
    DtoType: CreateRecommentDto,
  })
  create(
    @Body() createRecommentDto: CreateRecommentDto,
    @Param('commentId') commentId: string,
  ) {
    const userId = 1;
    return this.recommentService.create(createRecommentDto, +commentId, userId);
  }

  @Get('all')
  @ApiOperation({
    summary: '답글 전체 조회',
  })
  findAll() {
    return this.recommentService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: '답글 조회 api',
  })
  findOne(@Param('id') id: string) {
    return this.recommentService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '답글 수정 api',
  })
  update(
    @Param('id') id: string,
    @Body() updateRecommentDto: UpdateRecommentDto,
  ) {
    return this.recommentService.update(+id, updateRecommentDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '답글 삭제 api',
  })
  remove(@Param('id') id: string) {
    return this.recommentService.remove(+id);
  }

  @UseGuards(NoAccessGuard)
  @Post('like/:id')
  @ApiOperation({
    summary: '답글 좋아요 api',
  })
  like(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.recommentService.like(+id, req.user.sub);
  }

  @UseGuards(NoAccessGuard)
  @Post('dislike/:id')
  @ApiOperation({
    summary: '답글 싫어요 api',
  })
  dislike(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.recommentService.dislike(+id, req.user.sub);
  }
}
