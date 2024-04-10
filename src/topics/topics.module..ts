import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicsController } from './topics.controller';
import { TopicsService } from './topics.service';

import { CoursesModule } from 'src/courses/courses.module';
import { Topic } from './entities/topics.entity';

@Module({
  imports: [CoursesModule, TypeOrmModule.forFeature([Topic])],
  controllers: [TopicsController],
  providers: [TopicsService],
  exports: [TopicsService],
})
export class TopicsModule {}
