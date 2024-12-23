import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';

import { UsersModule } from '../users/user.module';
import { Course } from './entities/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course]), UsersModule],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {}
