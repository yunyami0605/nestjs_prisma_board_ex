import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserRepository } from 'src/user/user.repository';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { JwtToken } from './interface/token.interface';
import { User } from '@prisma/client';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepo: UserRepository,
  ) {}

  async signUp(createAuthDto: SignUpDto) {
    /**
     *@todo 추후 round env로 적용
     */
    const round = 5;

    const hashedPassword = await bcrypt.hash(createAuthDto.password, round);
    // $2a$05$uo7bf0NF/di6a4nJFP67tO/yH.W1rGS0NrY8qIriVuJ1tX2c3tRAG
    // 2a: 암호화 방식, 05: 버전 정보, uo7bf0NF: 알고리즘 정보,
    // di6a4nJFP67tO: 해쉬 솔트, yH.W1rGS0NrY8qIriVuJ1tX2c3tRAG: 비밀번호

    const result = await this.userRepo.create({
      ...createAuthDto,
      password: hashedPassword,
    });

    const tokens = await this.createToken(result);

    this.userRepo.update(result.id, {
      refreshToken: tokens.refresh,
    });

    return tokens;
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepo.findOneCredential(loginDto.email);

    if (!user) throw new NotFoundException('계정 정보를 찾을 수 없습니다');

    const isAuth = await bcrypt.compare(loginDto.password, user.password);

    if (!isAuth) throw new UnauthorizedException('비밀번호를 확인해주세요.');

    const token = await this.createToken(user);

    this.userRepo.update(user.id, {
      refreshToken: token.refresh,
    });

    return token;
  }

  async createToken(user: Pick<User, 'id'>): Promise<JwtToken> {
    const payload = {
      sub: user.id,
    };
    /**
     *@todo 추후 env 적용
     */
    const salt = 'test';
    const expire = '30d';

    return {
      access: this.jwtService.sign(payload, {
        secret: salt,
        expiresIn: expire,
      }),
      refresh: this.jwtService.sign(payload, {
        secret: salt,
        expiresIn: expire,
      }),
    };
  }

  async verifyToken(token: string, options: JwtVerifyOptions) {
    try {
      return this.jwtService.verify<{ sub: number }>(token, options);
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  async getUserId(token: string, options: JwtVerifyOptions) {
    try {
      return this.jwtService.verify<{ sub: number }>(token, options);
    } catch (err) {
      return { sub: undefined };
    }
  }
}
