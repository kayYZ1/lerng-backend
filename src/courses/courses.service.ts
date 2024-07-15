import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UsersService } from '../users/users.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { Course } from './entities/course.entity';
import { DateFilter } from './enum/courses.enum';

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
    return await this.courseRepository.findOne({
      where: { id: courseId },
      relations: ['user'],
    });
  }
  async getCourse(id: string) {
    return await this.courseRepository.findOneBy({ id });
  }

  async getCourses() {
    return await this.courseRepository.find();
  }

  async filterCourses(search: string) {
    const courses = await this.courseRepository.find();

    return search
      ? courses.filter((course) => course.title.toLowerCase().includes(search))
      : courses;
  }

  async filterCoursesByDate(date: DateFilter) {
    return await this.courseRepository.find({
      order: {
        created: date,
      },
    });
  }

  async getInstructorDataFromCourse(courseId: string) {
    const existingCourse = await this.findCourseById(courseId);
    if (!existingCourse) throw new BadRequestException('Course does not exist');

    const courseInstructor = await this.userService.findOne(
      existingCourse.user.id,
    );
    const instructorModified = {
      id: courseInstructor.id,
      email: courseInstructor.email,
      username: courseInstructor.username,
      avatar: courseInstructor.imageUrl,
      joined: courseInstructor.created,
    };

    return instructorModified;
  }

  async getInstructorCourses(userId: string) {
    return await this.courseRepository.find({
      where: { user: { id: userId } },
    });
  }
}
