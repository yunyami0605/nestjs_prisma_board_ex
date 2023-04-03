import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRecommentDto {
  @ApiProperty({
    required: true,
    example: 'test_content',
  })
  @IsString()
  content: string;
}
