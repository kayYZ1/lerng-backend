import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicsController } from './topic.controller';
import { TopicsService } from './topic.service';

import { CoursesModule } from 'src/courses/courses.module';
import { Topic } from './entities/topic.entity';

@Module({
  imports: [CoursesModule, TypeOrmModule.forFeature([Topic])],
  controllers: [TopicsController],
  providers: [TopicsService],
  exports: [TopicsService],
})
export class TopicsModule {}
