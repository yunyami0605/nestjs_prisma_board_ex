import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    required: true,
    example: 'test1_nick',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(10)
  nickname: string;

  @ApiProperty({
    required: true,
    example: 'test1@test.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'test1_name',
  })
  @IsOptional()
  @MinLength(1)
  name?: string;

  @ApiProperty({
    required: true,
    example: 'test1234',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?=.*[0-9])(?=.*[a-zA-Z])/, {
    message: '영문, 숫자를 포함해야합니다',
  })
  password: string;
}
