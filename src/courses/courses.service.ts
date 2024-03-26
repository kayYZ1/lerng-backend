import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course) private courseRepository: Repository<Course>,
  ) {}

  async createCourse(dto: CreateCourseDto) {
    const course: Course = new Course();

    course.title = dto.title;
    course.imageUrl = dto.imageUrl;

    return this.courseRepository.save(course);
  }

  async findCourseById(courseId: number) {
    return await this.courseRepository.findOne({ where: { id: courseId } });
  }

  async getCourse(id: number) {
    return await this.courseRepository.findOneBy({ id });
  }

  async getCourses() {
    return await this.courseRepository.find();
  }
}
