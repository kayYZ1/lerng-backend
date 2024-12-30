import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CoursesService } from '../courses/courses.service';
import { Course } from '../courses/entities/course.entity';
import { UsersService } from '../user/user.service';
import { Enrolled } from './entities/enrolled.entity';

@Injectable()
export class EnrolledService {
  constructor(
    @InjectRepository(Enrolled)
    private readonly enrolledRepository: Repository<Enrolled>,
    private userService: UsersService,
    private courseService: CoursesService,
  ) {}

  async getUserEnrolledCourses(userId: string) {
    return await this.enrolledRepository.find({
      where: { user: { id: userId } },
      relations: ['course'],
    });
  }

  async enrollUserInCourse(userId: string, courseId: string) {
    const userExist = await this.userService.findOne(userId);
    const courseExist = await this.courseService.findCourseById(courseId);

    if (!userExist) throw new BadRequestException('User does not exist');
    if (!courseExist)
      throw new BadRequestException('Course does not exist.');

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

  async updateCourseRating(
    userId: string,
    courseId: string,
    rating: number,
  ) {
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

  async getCourseRating(userId: string, courseId: string) {
    const enrolledExist = await this.enrolledRepository.findOne({
      where: {
        course: { id: courseId },
        user: { id: userId },
      },
      select: { id: true, rating: true },
    });

    return enrolledExist.rating;
  }

  async getCourseAverageRating(courseId: string) {
    const enrolledCourses = await this.enrolledRepository.find({
      where: { course: { id: courseId } },
      select: {
        id: true,
        rating: true,
      },
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

  async getUserCourseStatistics(userId: string) {
    const enrolledCourses = await this.enrolledRepository.find({
      relations: ['course.user'],
      select: {
        id: true,
        course: { id: true, title: true },
        rating: true,
        user: { id: true },
      },
    });

    if (enrolledCourses.length === 0)
      throw new BadRequestException('No courses found');

    const statistics: Record<
      string,
      { course: string; count: number; rating: number }
    > = enrolledCourses.reduce((acc, enrolled) => {
      if (enrolled.course.user.id !== userId) return acc;

      const course = enrolled.course.title;
      if (!acc[course]) {
        acc[course] = { course: course, count: 0, rating: 0 };
      }
      acc[course].count++;
      acc[course].rating += enrolled.rating;

      return acc;
    }, {});

    return Object.values(statistics).map((stat) => ({
      course: stat.course,
      count: stat.count,
      rating: stat.rating / stat.count,
    }));
  }

  async getTopPopularCourses() {
    const enrolledCourses = await this.enrolledRepository.find({
      relations: ['course'],
      select: {
        course: { id: true, title: true, description: true },
      },
    });

    const popularCourses: Record<
      string,
      { course: Course; users: number }
    > = enrolledCourses.reduce((acc, enrolled) => {
      const course = enrolled.course;
      if (!acc[course.id]) {
        acc[course.id] = { course, users: 0 };
      }
      acc[course.id].users++;

      return acc;
    }, {});

    return Object.values(popularCourses)
      .sort((a, b) => b.users - a.users)
      .slice(0, 3); //Return 3 most popular courses
  }
}
