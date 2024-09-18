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

    const enrolledExist = await this.enrolledRepository.findOne({
      where: { user: { id: userId }, course: { id: courseId } },
    });

    if (enrolledExist)
      throw new BadRequestException('Already enrolled in that course');

    const enrolled = new Enrolled();

    enrolled.user = userExist;
    enrolled.course = courseExist;

    return this.enrolledRepository.save(enrolled);
  }

  async updateRating(userId: string, courseId: string, rating: number) {
    const enrolledExist = await this.enrolledRepository.findOne({
      where: {
        user: { id: userId },
        course: { id: courseId },
      },
    });

    if (!enrolledExist)
      throw new BadRequestException('Not enrolled in that course');

    enrolledExist.rating = rating;

    return this.enrolledRepository.save(enrolledExist);
  }

  async getRating(userId: string, courseId: string) {
    const enrolledExist = await this.enrolledRepository.findOne({
      where: {
        user: { id: userId },
        course: { id: courseId },
      },
    });

    return enrolledExist.rating;
  }

  async countAverageRating(courseId: string) {
    const enrolledCourses = await this.enrolledRepository.find({
      where: { course: { id: courseId } },
    });

    let ratedCourses = 0;
    let rate = 0;

    enrolledCourses.forEach((course) => {
      if (course.rating > 0) {
        rate += course.rating;
        ratedCourses++;
      }
    });

    const averageRating = {
      rating: (rate || ratedCourses) === 0 ? 0 : rate / ratedCourses,
      votes: ratedCourses,
    };

    return averageRating;
  }

  async coursesStatistics() {
    const enrolledCourses = await this.enrolledRepository.find({
      relations: ['course'],
    });

    const statistics = enrolledCourses.reduce((acc, enrollment) => {
      const course = enrollment.course.title;
      if (!acc[course]) {
        acc[course] = { course, count: 0 };
      }
      acc[course].count++;

      return acc;
    }, {});

    return Object.values(statistics);
  }
}
