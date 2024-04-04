import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dto/create-topic.dto';

import { ATGuard } from '../common/guards/accessToken.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { ROLES } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/enums/user.enum';

@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Post('/create/:id')
  @UseGuards(ATGuard, RolesGuard)
  @ROLES(UserRole.INSTRUCTOR)
  createTopic(@Body() dto: CreateTopicDto, @Param('id') id: string) {
    return this.topicsService.createTopic(dto, id);
  }

  @Get('/topic/:id')
  @UseGuards(ATGuard)
  getTopic(@Param('id') id: string) {
    return this.topicsService.getTopic(id);
  }

  @Get('/:id')
  @UseGuards(ATGuard)
  getTopicsFromCourse(@Param('id') id: string) {
    return this.topicsService.getTopicsFromCourse(id);
  }
}
