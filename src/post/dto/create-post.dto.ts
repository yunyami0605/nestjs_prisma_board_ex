import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly content: string;

  @IsOptional()
  @IsNumber()
  readonly authorId?: number;

  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  // @ApiProperty({
  //   name: 'tags',
  //   type: [String],
  //   description: 'tags',
  //   example: ['햄스터', '피부병'],
  //   required: true,
  // })
  tags: string[];
}
