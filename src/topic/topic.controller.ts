/* eslint-disable prettier/prettier */
import { Controller, Delete, Param } from '@nestjs/common';
import { TopicService } from './topic.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('topic')
@ApiTags('Topic')
export class TopicController {
    constructor(private topicsService: TopicService) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a Topic'})
    deleteTopic(@Param('id') id: string) {
        return this.topicsService.deleteTopic(id);
    }
}
