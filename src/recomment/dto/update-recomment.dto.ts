import { PartialType } from '@nestjs/mapped-types';
import { CreateRecommentDto } from './create-recomment.dto';

export class UpdateRecommentDto extends PartialType(CreateRecommentDto) {}
