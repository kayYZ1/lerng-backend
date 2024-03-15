import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course) private courseRepository: Repository<Course>,
  ) {}

  async createCourse(dto: CreateCourseDto) {
    const course: Course = new Course();

    course.name = dto.name;
    course.imageUrl = dto.imageUrl; 

    return this.courseRepository.save(course);
  }
}
