import { Body, Controller, Patch, UseGuards } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { ATGuard } from 'src/common/guards/accessToken.guard';
import { SaveProgressDto } from './dto/save-progress.dto';

@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Patch(':id')
  @UseGuards(ATGuard)
  saveProgress(@Body() dto: SaveProgressDto, topicId: string) {
    return this.progressService.saveProgress(dto, topicId);
  }
}
