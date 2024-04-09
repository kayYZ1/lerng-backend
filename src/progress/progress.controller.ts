import { Body, Controller, Param, Patch, Get, UseGuards } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { ATGuard } from 'src/common/guards/accessToken.guard';
import { SaveProgressDto } from './dto/save-progress.dto';
import { GetProgressDto } from './dto/get-progress.dto';

@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Patch('/save/:id')
  @UseGuards(ATGuard)
  saveProgress(@Body() dto: SaveProgressDto, @Param('id') topicId: string) {
    return this.progressService.saveProgress(dto, topicId);
  }

  @Get('/get/:id')
  @UseGuards(ATGuard)
  getUserProgress(@Body() dto: GetProgressDto, @Param('id') courseId: string) {
    return this.progressService.getUserProgress(dto, courseId);
  }
}
