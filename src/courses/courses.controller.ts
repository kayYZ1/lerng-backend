import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';

import { ATGuard } from '../common/guards/accessToken.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { ROLES } from '../common/decorators/roles.decorator';
import { GetCurrId } from '../common/decorators/getCurrId.decorator';
import { UserRole } from '../users/enums/user.enum';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post('/create')
  @UseGuards(ATGuard, RolesGuard)
  @ROLES(UserRole.INSTRUCTOR)
  createCourse(@Body() dto: CreateCourseDto, @GetCurrId() userId: string) {
    return this.coursesService.createCourse(dto, userId);
  }

  @Get('/')
  @UseGuards(ATGuard)
  getCourses() {
    return this.coursesService.getCourses();
  }

  @Get('/:id')
  @UseGuards(ATGuard)
  getCourseById(@Param('id') id: string) {
    return this.coursesService.getCourse(id);
  }
}
