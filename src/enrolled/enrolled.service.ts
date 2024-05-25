import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CoursesService } from 'src/courses/courses.service';
import { UsersService } from 'src/users/users.service';
import { Enrolled } from './entities/enrolled.entity';

@Injectable()
export class EnrolledService {
  constructor(
    @InjectRepository(Enrolled)
    private readonly enrolledRepository: Repository<Enrolled>,
    private userService: UsersService,
    private courseService: CoursesService,
  ) {}

  async getEnrolledCourses(userId: string) {
    return await this.enrolledRepository.find({
      where: { user: { id: userId } },
      relations: ['course'],
    });
  }

  async addToEnrolled(userId: string, courseId: string) {
    const userExist = await this.userService.findOne(userId);
    const courseExist = await this.courseService.findCourseById(courseId);

    if (!userExist) throw new BadRequestException('User does not exist');
    if (!courseExist) throw new BadRequestException('Course does not exist.');

    const enrolledExist = await this.enrolledRepository.find({
      where: { user: { id: userId }, course: { id: courseId } },
    });

    if (enrolledExist)
      throw new BadRequestException('Already enrolled in that course');

    const enrolled = new Enrolled();

    enrolled.user = userExist;
    enrolled.course = courseExist;

    return this.enrolledRepository.save(enrolled);
  }
}
