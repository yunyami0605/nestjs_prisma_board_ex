import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as bcrypt from 'bcryptjs';
import { SignUpDto } from './dto/signup.dto';
import { JwtToken } from './interface/token.interface';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

/**
 * @todo 회원가입 닉네임 필드 추가
 * @todo 토큰 로직
 * @todo 로그인
 * @todo 회원탈퇴
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signupDto: SignUpDto) {
    return this.authService.signUp(signupDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
