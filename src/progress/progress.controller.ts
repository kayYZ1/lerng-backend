import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { GetCurrId } from 'src/common/decorators/getCurrId.decorator';
import { ATGuard } from 'src/common/guards/accessToken.guard';
import { SaveProgressDto } from './dto/save-progress.dto';
import { ProgressService } from './progress.service';

@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Patch('/save/:id')
  @UseGuards(ATGuard)
  saveProgress(
    @GetCurrId() userId: string,
    @Body() dto: SaveProgressDto,
    @Param('id') topicId: string,
  ) {
    return this.progressService.saveProgress(userId, dto, topicId);
  }

  @Get('/get/:id')
  @UseGuards(ATGuard)
  getUserProgress(@GetCurrId() userId: string, @Param('id') courseId: string) {
    return this.progressService.getUserProgress(userId, courseId);
  }
}
