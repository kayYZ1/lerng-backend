import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { GetCurrId } from '../common/decorators/getCurrId.decorator';
import { ATGuard } from '../common/guards/accessToken.guard';
import { SaveProgressScoreDto } from './dto/save-progress.dto';
import { SaveQuizScoreDto } from './dto/save-quiz.dto';
import { ProgressService } from './progress.service';

@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Get('/get/:id')
  @UseGuards(ATGuard)
  getUserProgress(@GetCurrId() userId: string, @Param('id') courseId: string) {
    return this.progressService.getUserProgress(userId, courseId);
  }

  @Patch('/save/:id')
  @UseGuards(ATGuard)
  saveProgressScore(
    @GetCurrId() userId: string,
    @Param('id') topicId: string,
    @Body() dto: SaveProgressScoreDto,
  ) {
    return this.progressService.saveProgressScore(userId, topicId, dto);
  }

  @Patch('/save/quiz/:id')
  @UseGuards(ATGuard)
  saveQuizScore(
    @GetCurrId() userId: string,
    @Param('id') topicId: string,
    @Body() dto: SaveQuizScoreDto,
  ) {
    return this.progressService.saveQuizScore(userId, topicId, dto);
  }
}
