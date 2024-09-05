import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';

import { GetCurrId } from '../common/decorators/getCurrId.decorator';
import { ROLES } from '../common/decorators/roles.decorator';
import { ATGuard } from '../common/guards/accessToken.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { UserRole } from '../users/enums/user.enum';
import { EditCourseDto } from './dto/edit-course.dto';
import { DateFilter } from './enum/courses.enum';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post('/create')
  @UseGuards(ATGuard, RolesGuard)
  @ROLES(UserRole.INSTRUCTOR)
  createCourse(@Body() dto: CreateCourseDto, @GetCurrId() userId: string) {
    return this.coursesService.createCourse(dto, userId);
  }

  @Patch('/edit')
  @UseGuards(ATGuard, RolesGuard)
  @ROLES(UserRole.INSTRUCTOR)
  editCourse(@Body() dto: EditCourseDto) {
    return this.coursesService.editCourse(dto);
  }

  @Get('/')
  @UseGuards(ATGuard)
  getCourses() {
    return this.coursesService.getCourses();
  }

  @Post('/query')
  @UseGuards(ATGuard)
  filterCourses(@Query('search') search: string) {
    return this.coursesService.filterCourses(search);
  }

  @Post('/filter')
  @UseGuards(ATGuard)
  filterCoursesByDate(@Query('sort') date: DateFilter) {
    return this.coursesService.filterCoursesByDate(date);
  }

  @Get('/instructor')
  @UseGuards(ATGuard)
  @ROLES(UserRole.INSTRUCTOR)
  getInstructorCourses(@GetCurrId() userId: string) {
    return this.coursesService.getInstructorCourses(userId);
  }

  @Get('/course/instructor/:id')
  @UseGuards(ATGuard)
  getInstructorDataFromCourse(@Param('id') id: string) {
    return this.coursesService.getInstructorDataFromCourse(id);
  }

  @Get('/:id')
  @UseGuards(ATGuard)
  getCourseById(@Param('id') id: string) {
    return this.coursesService.getCourse(id);
  }
}
