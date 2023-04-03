import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('USER API')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: '유저 생성 api',
    description: '유저 생성',
  })
  @ApiBody({
    description: 'post swagger',
    type: CreateUserDto,
  })
  @ApiResponse({
    status: 201,
    description: '생성 성공',
  })
  @ApiResponse({
    status: 400,
    description: '잘못된 폼',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: '유저 전체 조회 api',
    description: '유저 전체 조회',
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: '유저 조회 api',
    description: '유저 id로 조회',
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '유저 수정 api',
    description: '유저 수정',
  })
  @ApiResponse({
    status: 400,
    description: '잘못된 폼',
  })
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '유저 삭제 api',
    description: '유저 삭제',
  })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
