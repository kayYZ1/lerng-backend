import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CoursesService } from 'src/courses/courses.service';
import { Course } from 'src/courses/entities/course.entity';
import { User } from 'src/users/entity/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Feedback } from './entities/feedback.entity';
import { FeedbackService } from './feedback.service';

describe('Feedback service', () => {
  let feedbackService: FeedbackService;
  let feedbackRepository: Repository<Feedback>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        FeedbackService,
        CoursesService,
        UsersService,
        {
          provide: getRepositoryToken(Feedback),
          useClass: Repository<Feedback>,
        },
        {
          provide: getRepositoryToken(Course),
          useValue: {},
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
    }).compile();

    feedbackService = moduleRef.get<FeedbackService>(FeedbackService);
    feedbackRepository = moduleRef.get<Repository<Feedback>>(
      getRepositoryToken(Feedback),
    );
  });

  it('should be defined', () => {
    expect(feedbackService).toBeDefined();
  });

  describe('feedback ticket algorithm', () => {
    it('should return 6 letter unique identifier', () => {
      const ticketId = feedbackService.generateTicketId();
      expect(ticketId).toHaveLength(6);
    });
  });
});
