import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { GetCurrId } from 'src/common/decorators/getCurrId.decorator';
import { ATGuard } from 'src/common/guards/accessToken.guard';
import { EnrolledService } from './enrolled.service';

@Controller('enrolled')
export class EnrolledController {
  constructor(private readonly enrolledService: EnrolledService) {}

  @Post('/add/:id')
  @UseGuards(ATGuard)
  addToEnrolled(@GetCurrId() userId: string, @Param('id') courseId: string) {
    return this.enrolledService.addToEnrolled(userId, courseId);
  }

  @Get('/')
  @UseGuards(ATGuard)
  getEnrolledCourses(@GetCurrId() userId: string) {
    return this.enrolledService.getEnrolledCourses(userId);
  }
}
