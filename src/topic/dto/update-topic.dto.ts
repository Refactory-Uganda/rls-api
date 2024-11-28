/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateTopicDto } from './create-topic.dto';

export class UpdateTopicDto extends PartialType(CreateTopicDto) {
  // static lessons: any;
}
