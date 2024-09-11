import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from 'src/courses/courses.module';
import { QuestionsModule } from 'src/questions/questions.module';
import { TopicsModule } from '../topics/topics.module.';
import { UsersModule } from '../users/users.module';
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
