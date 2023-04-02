import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    required: true,
    example: 'test_title',
  })
  @IsString()
  readonly title: string;

  @ApiProperty({
    required: true,
    example: 'test_content',
  })
  @IsString()
  readonly content: string;

  @ApiProperty({
    example: '2',
  })
  @IsOptional()
  @IsNumber()
  readonly authorId?: number;

  @ApiProperty({
    type: [String],
    example: ['태그1', '태그2'],
  })
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  tags: string[];
}
