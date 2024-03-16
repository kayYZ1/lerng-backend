import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { User } from './users/entity/user.entity';
import { Course } from './courses/entities/course.entity';
import { AuthModule } from './auth/auth.module';
import { ModulesModule } from './modules/modules.module';
import { CoursesModule } from './courses/courses.module';

import { LearningModule } from './modules/entities/module.entity';
import { ContentsModule } from './contents/contents.module';
import { ModuleContent } from './contents/entities/content.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'kayz',
      password: '1234',
      database: 'LMSLinux',
      entities: [User, Course, LearningModule, ModuleContent],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    CoursesModule,
    ModulesModule,
    ContentsModule,
  ],
})
export class AppModule {}
