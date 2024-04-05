import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DriverOptionNotSetError, Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { AddQuestionDto } from './dto/add-question.dto';
import { TopicsService } from '../topics/topics.service';
import { SolveQuestionDto } from './dto/solve-question.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
    private topicsService: TopicsService,
  ) {}

  async addQuestion(dto: AddQuestionDto, topicId: string) {
    const newQuestion = new Question();

    const topicExist = await this.topicsService.findTopicById(topicId);

    if (!topicExist) throw new BadRequestException('Topic does not exist.');

    newQuestion.question = dto.question;
    newQuestion.type = dto.type;
    newQuestion.answer = dto.answer;
    newQuestion.topic = topicExist;

    return this.questionsRepository.save(newQuestion);
  }

  async getQuestionsFromTopic(topicId: string) {
    const topicExist = await this.topicsService.findTopicById(topicId);

    if (!topicExist) throw new BadRequestException('Topic does not exist.');

    const questions = await this.questionsRepository.find({
      where: { topic: { id: topicId } },
    });

    return questions;
  }

  async questionSolve(dto: SolveQuestionDto, questionId: string) {
    const questionExist = await this.questionsRepository.findOne({
      where: { id: questionId },
    });

    if (!questionExist)
      throw new BadRequestException('Question does not exist.');

    if (questionExist.answer !== dto.questionAnswer) return 'Wrong answer!';
    return 'Correct answer!';
  }
}
