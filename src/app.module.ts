import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';
import { Course } from './courses/entities/course.entity';
import { TopicsModule } from './topics/topics.module.';
import { User } from './users/entity/user.entity';
import { UsersModule } from './users/users.module';

import { ContentsModule } from './contents/contents.module';
import { Content } from './contents/entities/content.entity';
import { Progress } from './progress/entities/progress.entity';
import { ProgressModule } from './progress/progress.module';
import { Question } from './questions/entities/question.entity';
import { QuestionsModule } from './questions/questions.module';
import { Topic } from './topics/entities/topics.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'kayz',
      password: '1234',
      database: 'LMSLinux',
      entities: [User, Course, Topic, Content, Question, Progress],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    CoursesModule,
    TopicsModule,
    ContentsModule,
    QuestionsModule,
    ProgressModule,
  ],
})
export class AppModule {}
