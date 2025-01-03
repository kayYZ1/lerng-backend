import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ROLES } from '../common/decorators/roles.decorator';
import { ATGuard } from '../common/guards/accessToken.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { UserRole } from '../user/enums/user.enum';
import { AddQuestionDto } from './dto/add-question.dto';
import { EditQuestionDto } from './dto/edit-question.dto';
import { QuestionsService } from './question.service';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post('/add/:id')
  @UseGuards(ATGuard, RolesGuard)
  @ROLES(UserRole.INSTRUCTOR)
  addQuestion(@Body() dto: AddQuestionDto, @Param('id') id: string) {
    return this.questionsService.addQuestion(dto, id);
  }

  @Patch('/edit')
  @UseGuards(ATGuard, RolesGuard)
  @ROLES(UserRole.INSTRUCTOR)
  editQuestion(@Body() dto: EditQuestionDto) {
    return this.questionsService.editQuestion(dto);
  }

  @Get('/:id')
  @UseGuards(ATGuard)
  getQuestionsFromTopic(@Param('id') id: string) {
    return this.questionsService.getQuestionsFromTopic(id);
  }
}
