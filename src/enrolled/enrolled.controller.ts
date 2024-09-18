import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetCurrId } from 'src/common/decorators/getCurrId.decorator';
import { ROLES } from 'src/common/decorators/roles.decorator';
import { ATGuard } from 'src/common/guards/accessToken.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UserRole } from '../users/enums/user.enum';
import { UpdateRatingDto } from './dto/update-rating.dto';
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

  @Patch('/review/:id')
  @UseGuards(ATGuard)
  updateRating(
    @GetCurrId() userId: string,
    @Param('id') courseId: string,
    @Body() { rating }: UpdateRatingDto,
  ) {
    return this.enrolledService.updateRating(userId, courseId, rating);
  }

  @Get('/review/:id')
  @UseGuards(ATGuard)
  getRating(@GetCurrId() userId: string, @Param('id') courseId: string) {
    return this.enrolledService.getRating(userId, courseId);
  }

  @Get('/average-rating/:id')
  @UseGuards(ATGuard)
  getAverageRating(@Param('id') courseId: string) {
    return this.enrolledService.countAverageRating(courseId);
  }

  @Get('/statistics/instructor')
  @UseGuards(ATGuard, RolesGuard)
  @ROLES(UserRole.INSTRUCTOR)
  getEnrolledCoursesStatistics() {
    return this.enrolledService.coursesStatistics();
  }
}
