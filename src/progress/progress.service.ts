import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Progress } from './entities/progress.entity';

import { QuestionsService } from 'src/questions/questions.service';
import { TopicsService } from '../topics/topics.service';
import { UsersService } from '../users/users.service';
import { SaveQuizScoreDto } from './dto/save-quiz.dto';

@Injectable()
export class ProgressService {
  constructor(
    @InjectRepository(Progress)
    private readonly progressRepository: Repository<Progress>,
    private topicsService: TopicsService,
    private usersService: UsersService,
    private questionsService: QuestionsService,
  ) {}

  async getProgress(userId: string, topicId: string) {
    return await this.progressRepository.findOne({
      where: { user: { id: userId }, topic: { id: topicId } },
    });
  }

  async getUserProgress(userId: string, courseId: string) {
    const topicsFromCourse =
      await this.topicsService.getTopicsFromCourse(courseId);

    const progressArray = await Promise.all(
      topicsFromCourse.map(async (topic) => {
        const progressExist = await this.getProgress(userId, topic.id);

        if (progressExist) {
          return {
            id: topic.id,
            title: topic.title,
            scorePercentage: progressExist.scorePercentage,
            quizScore: progressExist.quizScore,
          };
        } else return null;
      }),
    );

    const progressArrayFiltered = progressArray.filter(
      (progress) => progress !== null,
    );

    if (progressArrayFiltered.length === 0) {
      return [];
    }

    return progressArrayFiltered;
  }

  async initializeProgress(userId: string, topicId: string) {
    const progressExist = await this.getProgress(userId, topicId);
    if (!progressExist) {
      const topicExist = await this.topicsService.findTopicById(topicId);
      const userExist = await this.usersService.findOne(userId);

      if (!topicExist) throw new BadRequestException('Topic does not exist');
      if (!userExist) throw new BadRequestException('User does not exist');

      const progressInit = new Progress();

      progressInit.topic = topicExist;
      progressInit.user = userExist;
      progressInit.scorePercentage = 0;
      progressInit.quizScore = 0;

      await this.progressRepository.save(progressInit);
    }
  }

  async saveQuizScore(userId: string, topicId: string, dto: SaveQuizScoreDto) {
    await this.initializeProgress(userId, topicId);

    const progressExist = await this.getProgress(userId, topicId);
    const questions =
      await this.questionsService.getQuestionsFromTopic(topicId);

    progressExist.quizScore = dto.quizScore;
    progressExist.scorePercentage = (dto.quizScore / questions.length) * 100;

    await this.progressRepository.update(progressExist.id, progressExist);
  }
}
