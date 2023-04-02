import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    required: true,
    example: 'test_content',
  })
  @IsString()
  content: string;
}
