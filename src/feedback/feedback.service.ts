import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CoursesService } from 'src/courses/courses.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { FeedbackTicketDto } from './dto/feedback.dto';
import { Feedback } from './entities/feedback.entity';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
    private courseService: CoursesService,
    private userService: UsersService,
  ) {}

  async addFeedbackTicket(dto: FeedbackTicketDto, userId: string) {
    const courseExist = await this.courseService.findCourseById(dto.courseId);
    if (!courseExist) throw new BadRequestException('Course does not exist');

    const userExist = await this.userService.findOne(userId);
    if (!userExist) throw new BadRequestException('User does not exist');

    const ticket = new Feedback();

    ticket.problem = dto.problem;
    ticket.details = dto.details;
    ticket.ticket_id = '12345';
    ticket.user = userExist;
    ticket.course = courseExist;

    return this.feedbackRepository.save(ticket);
  }

  async getFeedbackTickets(userId: string) {
    return await this.feedbackRepository.find({
      where: { user: { id: userId } },
    });
  }

  async getInstructorsTickets(userId: string) {
    return await this.feedbackRepository.find({
      where: {
        course: { user: { id: userId } },
      },
    });
  }
}
