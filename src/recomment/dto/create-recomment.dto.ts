import { IsString } from 'class-validator';

export class CreateRecommentDto {
  @IsString()
  content: string;
}
