import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { User } from './users/entity/user.entity';
import { Course } from './courses/entities/course.entity';
import { AuthModule } from './auth/auth.module';
import { TopicsModule } from './topics/topics.module.';
import { CoursesModule } from './courses/courses.module';

import { Topic } from './topics/entities/topics.entity';
import { ContentsModule } from './contents/contents.module';
import { Content } from './contents/entities/content.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'kayz',
      password: '1234',
      database: 'LMSLinux',
      entities: [User, Course, Topic, Content],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    CoursesModule,
    TopicsModule,
    ContentsModule,
  ],
})
export class AppModule {}
