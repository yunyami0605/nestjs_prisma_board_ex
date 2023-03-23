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
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(10)
  nickname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @MinLength(1)
  name?: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?=.*[0-9])(?=.*[a-zA-Z])/, {
    message: '영문, 숫자를 포함해야합니다',
  })
  password: string;
}
