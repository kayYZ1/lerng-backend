import { BadRequestException, Injectable } from '@nestjs/common';
import { Progress } from './entities/progress.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SaveProgressDto } from './dto/save-progress.dto';
import { TopicsService } from '../topics/topics.service';
import { UsersService } from '../users/users.service';
import { GetProgressDto } from './dto/get-progress.dto';
import { CoursesService } from '../courses/courses.service';

@Injectable()
export class ProgressService {
  constructor(
    @InjectRepository(Progress)
    private readonly progressRepository: Repository<Progress>,
    private topicsService: TopicsService,
    private usersService: UsersService,
  ) {}

  async saveProgress(dto: SaveProgressDto, topicId: string) {
    const topicExist = await this.topicsService.findTopicById(topicId);
    const userExist = await this.usersService.findOne(dto.userId);

    if (!topicExist) throw new BadRequestException('Topic does not exist');
    if (!userExist) throw new BadRequestException('User does not exist');

    const progressExist = await this.progressRepository.findOne({
      where: { user: { id: userExist.id }, topic: { id: topicExist.id } },
    });

    if (progressExist) {
      progressExist.quizScore = dto.quizScore;
      progressExist.progressScore = dto.progressScore;

      this.progressRepository.update(progressExist.id, progressExist);
    } else {
      const progress = new Progress();

      progress.topic = topicExist;
      progress.user = userExist;

      this.progressRepository.save(progress);
    }
  }

  async getUserProgress(dto: GetProgressDto, courseId: string) {
    const topicsFromCourse =
      await this.topicsService.getTopicsFromCourse(courseId);

    const progressArray = await Promise.all(
      topicsFromCourse.map(async (topic) => {
        const progressExist = await this.progressRepository.findOne({
          where: { user: { id: dto.userId }, topic: { id: topic.id } },
        });

        return {
          id: topic.id,
          title: topic.title,
          progress: progressExist ? progressExist.progressScore : 0,
          quizScore: progressExist ? progressExist.quizScore : 0,
        };
      }),
    );

    console.log(progressArray);
    return progressArray;
  }
}
