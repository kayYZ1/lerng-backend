import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ATGuard } from '../common/guards/accessToken.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { ROLES } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/enums/user.enum';
import { AddQuestionDto } from './dto/add-question.dto';
import { EditQuestionDto } from './dto/edit-question.dto';
import { QuestionsService } from './questions.service';

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
