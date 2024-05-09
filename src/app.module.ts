import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';
import { TopicsModule } from './topics/topics.module.';
import { UsersModule } from './users/users.module';

import { ContentsModule } from './contents/contents.module';
import { EnrolledModule } from './enrolled/enrolled.module';
import { ProgressModule } from './progress/progress.module';
import { QuestionsModule } from './questions/questions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'kayz',
      password: '1234',
      database: 'LMSLinux',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    CoursesModule,
    TopicsModule,
    ContentsModule,
    QuestionsModule,
    ProgressModule,
    EnrolledModule,
  ],
})
export class AppModule {}
