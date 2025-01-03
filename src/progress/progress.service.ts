import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Progress } from './entities/progress.entity';

import { CoursesService } from 'src/courses/courses.service';
import { QuestionsService } from 'src/question/question.service';
import { TopicsService } from '../topic/topic.service';
import { UsersService } from '../user/user.service';
import { SaveQuizScoreDto } from './dto/save-quiz.dto';

@Injectable()
export class ProgressService {
  constructor(
    @InjectRepository(Progress)
    private readonly progressRepository: Repository<Progress>,
    private topicsService: TopicsService,
    private usersService: UsersService,
    private coursesService: CoursesService,
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

      if (!topicExist)
        throw new BadRequestException('Topic does not exist');
      if (!userExist) throw new BadRequestException('User does not exist');

      const progressInit = new Progress();

      progressInit.topic = topicExist;
      progressInit.user = userExist;
      progressInit.scorePercentage = 0;
      progressInit.quizScore = 0;

      await this.progressRepository.save(progressInit);
    }
  }

  async saveQuizScore(
    userId: string,
    topicId: string,
    dto: SaveQuizScoreDto,
  ) {
    await this.initializeProgress(userId, topicId);

    const progressExist = await this.getProgress(userId, topicId);
    const questions =
      await this.questionsService.getQuestionsFromTopic(topicId);

    if (dto.quizScore > progressExist.quizScore) {
      progressExist.quizScore = dto.quizScore;
      progressExist.scorePercentage =
        (dto.quizScore / questions.length) * 100;

      await this.progressRepository.update(
        progressExist.id,
        progressExist,
      );
    }
  }

  async countProgress(userId: string, courseId: string) {
    const courseExist = await this.coursesService.findCourseById(courseId);
    if (!courseExist)
      throw new BadRequestException('Course does not exists');

    const topicsFromCourse = await this.topicsService.getTopicsFromCourse(
      courseExist.id,
    );

    let totalProgress = 0;

    for (const topic of topicsFromCourse) {
      const progressExist = await this.getProgress(userId, topic.id);
      totalProgress += progressExist ? +progressExist.scorePercentage : 0;
    }

    return totalProgress !== 0
      ? (totalProgress / topicsFromCourse.length).toFixed()
      : 0;
  }
}
