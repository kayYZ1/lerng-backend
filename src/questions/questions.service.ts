import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TopicsService } from '../topics/topics.service';
import { AddQuestionDto } from './dto/add-question.dto';
import { EditQuestionDto } from './dto/edit-question.dto';
import { Question } from './entities/question.entity';

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

    if (!topicExist)
      throw new BadRequestException('Topic does not exist.');

    newQuestion.question = dto.question;
    newQuestion.type = dto.type;
    newQuestion.answer = dto.answer;
    newQuestion.topic = topicExist;

    return this.questionsRepository.save(newQuestion);
  }

  async editQuestion(dto: EditQuestionDto) {
    const questionExist = await this.questionsRepository.findOne({
      where: { id: dto.questionId },
    });

    if (!questionExist)
      throw new BadRequestException('Question does not exist.');

    return this.questionsRepository.update(dto.questionId, {
      question: dto.question,
      type: dto.type,
      answer: dto.answer,
    });
  }

  async getQuestionsFromTopic(topicId: string) {
    const topicExist = await this.topicsService.findTopicById(topicId);

    if (!topicExist)
      throw new BadRequestException('Topic does not exist.');

    const questions = await this.questionsRepository.find({
      where: { topic: { id: topicId } },
    });

    return questions;
  }
}
