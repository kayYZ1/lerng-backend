import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicsModule } from '../topics/topics.module.';
import { Question } from './entities/question.entity';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Question]), TopicsModule],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
