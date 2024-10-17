/* eslint-disable prettier/prettier */
import { Controller, Delete, Param } from '@nestjs/common';
import { TopicService } from './topic.service';

@Controller('topic')
export class TopicController {
    constructor(private topicsService: TopicService) {}

    @Delete(':id')
    deleteTopic(@Param('id') id: string) {
        return this.topicsService.deleteTopic(id);
    }
}
