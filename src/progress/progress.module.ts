import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from 'src/courses/courses.module';
import { QuestionsModule } from 'src/question/question.module';
import { TopicsModule } from '../topic/topic.module.';
import { UsersModule } from '../user/user.module';
import { Progress } from './entities/progress.entity';
import { ProgressController } from './progress.controller';
import { ProgressService } from './progress.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Progress]),
    TopicsModule,
    UsersModule,
    QuestionsModule,
    CoursesModule,
  ],
  controllers: [ProgressController],
  providers: [ProgressService],
})
export class ProgressModule {}
