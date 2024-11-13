import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { EditTopicDto } from './dto/edit-topic.dto';
import { TopicsService } from './topics.service';

import { GetCurrId } from 'src/common/decorators/getCurrId.decorator';
import { ROLES } from '../common/decorators/roles.decorator';
import { ATGuard } from '../common/guards/accessToken.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { UserRole } from '../users/enums/user.enum';

@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Post('/create/:id')
  @UseGuards(ATGuard, RolesGuard)
  @ROLES(UserRole.INSTRUCTOR)
  createTopic(
    @Body() dto: CreateTopicDto,
    @Param('id') id: string,
    @GetCurrId() userId: string,
  ) {
    return this.topicsService.createTopic(dto, id, userId);
  }

  @Patch('/edit/')
  @UseGuards(ATGuard, RolesGuard)
  @ROLES(UserRole.INSTRUCTOR)
  editTopic(@Body() dto: EditTopicDto, @GetCurrId() userId: string) {
    return this.topicsService.editTopic(dto, userId);
  }

  @Get('/topic/:id')
  @UseGuards(ATGuard)
  getTopic(@Param('id') id: string) {
    return this.topicsService.getTopic(id);
  }

  @Delete('/topic/:id')
  @UseGuards(ATGuard, RolesGuard)
  @ROLES(UserRole.INSTRUCTOR)
  removeTopic(@Param('id') id: string, @GetCurrId() userId: string) {
    return this.topicsService.removeTopic(id, userId);
  }

  @Get('/:id')
  @UseGuards(ATGuard)
  getTopicsFromCourse(@Param('id') id: string) {
    return this.topicsService.getTopicsFromCourse(id);
  }
}
