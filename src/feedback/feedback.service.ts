import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CoursesService } from 'src/courses/courses.service';
import { Repository } from 'typeorm';
import { FeedbackTicketDto } from './dto/feedback.dto';
import { Feedback } from './entities/feedback.entity';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
    private courseService: CoursesService,
  ) {}

  async addFeedbackTicket(dto: FeedbackTicketDto) {
    const courseExist = await this.courseService.findCourseById(dto.courseId);
    if (!courseExist) throw new BadRequestException('Course does not exist');

    const ticket = new Feedback();

    ticket.problem = dto.problem;
    ticket.details = dto.details;
    ticket.ticket_id = '12345';
    ticket.course = courseExist;

    return this.feedbackRepository.save(ticket);
  }
}
