import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { ATGuard } from 'src/common/guards/accessToken.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AddQuestionDto } from './dto/add-question.dto';
import { SolveQuestionDto } from './dto/solve-question.dto';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post('/add/:id')
  @UseGuards(ATGuard, RolesGuard)
  addQuestion(@Body() dto: AddQuestionDto, @Param('id') id: string) {
    return this.questionsService.addQuestion(dto, id);
  }

  @Get('/:id')
  @UseGuards(ATGuard)
  getQuestionsFromTopic(@Param('id') id: string) {
    return this.questionsService.getQuestionsFromTopic(id);
  }

  @Post('/solve/:id')
  @UseGuards(ATGuard)
  solveQuestion(@Body() dto: SolveQuestionDto, @Param('id') id: string) {
    return this.questionsService.questionSolve(dto, id);
  }
}
