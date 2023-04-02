import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HttpErrorResponse4 } from 'src/error/dto/HttpErrorResponse4';

/**
 * @todo 회원탈퇴
 */
@ApiTags('AUTH API')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({
    summary: '유저 회원가입 api',
  })
  @ApiBody({
    type: SignUpDto,
  })
  @ApiOkResponse({
    status: 201,
    schema: {
      example: {
        access:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjksImlhdCI6MTY4MDQxNjU0MywiZXhwIjoxNjgzMDA4NTQzfQ.pHAtwZzcxMShV-fVnq_tK2v4_2B9iETpNznffIysT08',
        refresh:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjksImlhdCI6MTY4MDQxNjU0MywiZXhwIjoxNjgzMDA4NTQzfQ.pHAtwZzcxMShV-fVnq_tK2v4_2B9iETpNznffIysT08',
      },
    },
  })
  @ApiBadRequestResponse({
    status: 400,
    description: '잘못된 폼',
    type: HttpErrorResponse4,
  })
  async signUp(@Body() signupDto: SignUpDto) {
    return this.authService.signUp(signupDto);
  }

  @Post('login')
  @ApiOperation({
    summary: '유저 로그인 api',
  })
  @ApiOkResponse({
    status: 201,
    schema: {
      example: {
        access:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjksImlhdCI6MTY4MDQxNjU0MywiZXhwIjoxNjgzMDA4NTQzfQ.pHAtwZzcxMShV-fVnq_tK2v4_2B9iETpNznffIysT08',
        refresh:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjksImlhdCI6MTY4MDQxNjU0MywiZXhwIjoxNjgzMDA4NTQzfQ.pHAtwZzcxMShV-fVnq_tK2v4_2B9iETpNznffIysT08',
      },
    },
  })
  @ApiBadRequestResponse({
    status: 400,
  })
  @ApiBody({
    type: LoginDto,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: '잘못된 폼',
    type: HttpErrorResponse4,
  })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
