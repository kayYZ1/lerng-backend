import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { User } from './users/entity/user.entity';
import { Course } from './courses/entities/course.entity';
import { AuthModule } from './auth/auth.module';
import { ModulesModule } from './modules/modules.module';
import { CoursesModule } from './courses/courses.module';

import { CourseModule } from './modules/entities/module.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'kayz',
      password: '1234',
      database: 'LMSLinux',
      entities: [User, Course, CourseModule],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    CoursesModule,
    ModulesModule,
  ],
})
export class AppModule {}
