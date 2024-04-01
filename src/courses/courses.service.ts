import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course) private courseRepository: Repository<Course>,
    private userService: UsersService,
  ) {}

  async createCourse(dto: CreateCourseDto, userId: string) {
    const course: Course = new Course();

    const instructor = await this.userService.findOne(userId);
    if (!instructor) throw new BadRequestException('Instructor does not exist');

    course.title = dto.title;
    course.description = dto.description;
    course.imageUrl = dto.imageUrl;
    course.user = instructor;

    return this.courseRepository.save(course);
  }

  async findCourseById(courseId: string) {
    return await this.courseRepository.findOne({ where: { id: courseId } });
  }

  async getCourse(id: string) {
    return await this.courseRepository.findOneBy({ id });
  }

  async getCourses() {
    return await this.courseRepository.find();
  }
}
