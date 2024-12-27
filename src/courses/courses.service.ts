import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UsersService } from '../users/user.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { EditCourseDto } from './dto/edit-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course) private courseRepository: Repository<Course>,
    private userService: UsersService,
  ) {}

  async createCourse(dto: CreateCourseDto, userId: string) {
    const course: Course = new Course();

    const instructor = await this.userService.findOne(userId);
    if (!instructor)
      throw new BadRequestException('Instructor does not exist');

    course.title = dto.title;
    course.description = dto.description;
    course.imageUrl = dto.imageUrl;
    course.categories = dto.categories;
    course.user = instructor;

    return this.courseRepository.save(course);
  }

  async editCourse(dto: EditCourseDto, userId: string) {
    const courseExist = await this.findCourseById(dto.courseId);
    if (!courseExist)
      throw new BadRequestException('Course does not exist');

    if (courseExist.user.id !== userId)
      throw new BadRequestException('Your not the creator of this course');

    return await this.courseRepository.update(courseExist.id, {
      description: dto.description,
      title: dto.title,
      categories: dto.categories,
      imageUrl: dto.imageUrl,
    });
  }

  async removeCourse(courseId: string, userId: string) {
    const courseExist = await this.findCourseById(courseId);
    if (!courseExist)
      throw new BadRequestException('Course does not exist');

    if (courseExist.user.id !== userId)
      throw new BadRequestException('Your not the creator of this course');

    return await this.courseRepository.delete(courseId);
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

  async getInstructorDataFromCourse(courseId: string) {
    const existingCourse = await this.findCourseById(courseId);
    if (!existingCourse)
      throw new BadRequestException('Course does not exist');

    const courseInstructor = await this.userService.findOne(
      existingCourse.user.id,
    );

    const instructorModified = {
      id: courseInstructor.id,
      email: courseInstructor.email,
      username: courseInstructor.username,
      imageUrl: courseInstructor.imageUrl,
      joined: courseInstructor.created,
    };

    return instructorModified;
  }

  async getInstructorCourses(userId: string) {
    return await this.courseRepository.find({
      where: { user: { id: userId } },
    });
  }

  async getCategoriesStats() {
    const allCategories = await this.courseRepository.find({
      select: {
        categories: true,
      },
    });

    const categoriesMap = new Map<string, number>();

    allCategories.forEach((item) => {
      item.categories.forEach((category) => {
        if (categoriesMap.has(category)) {
          categoriesMap.set(category, categoriesMap.get(category) + 1);
        } else {
          categoriesMap.set(category, 1);
        }
      });
    });

    return Array.from(categoriesMap.entries()).map(
      ([category, count]) => ({
        category,
        count,
      }),
    );
  }
}
