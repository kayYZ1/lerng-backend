import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { GetCurrId } from 'src/common/decorators/getCurrId.decorator';
import { ROLES } from 'src/common/decorators/roles.decorator';
import { ATGuard } from 'src/common/guards/accessToken.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UserRole } from '../users/enums/user.enum';
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

  @Get('/statistics/instructor')
  @UseGuards(ATGuard, RolesGuard)
  @ROLES(UserRole.INSTRUCTOR)
  getEnrolledCoursesStatistics() {
    return this.enrolledService.coursesStatistics();
  }
}
