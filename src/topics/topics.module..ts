import { Module } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { TopicsController } from './topics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Topic } from './entities/topics.entity';
import { CoursesModule } from 'src/courses/courses.module';

@Module({
  imports: [CoursesModule, TypeOrmModule.forFeature([Topic])],
  controllers: [TopicsController],
  providers: [TopicsService],
  exports: [TopicsService]
})
export class TopicsModule {}
