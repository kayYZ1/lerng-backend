import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicsModule } from '../topic/topic.module.';
import { Question } from './entities/question.entity';
import { QuestionsController } from './question.controller';
import { QuestionsService } from './question.service';

@Module({
  imports: [TypeOrmModule.forFeature([Question]), TopicsModule],
  controllers: [QuestionsController],
  providers: [QuestionsService],
  exports: [QuestionsService],
})
export class QuestionsModule {}
