import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicsModule } from '../topic/topic.module.';
import { ContentsController } from './contents.controller';
import { ContentsService } from './contents.service';
import { Content } from './entities/content.entity';

@Module({
  imports: [TopicsModule, TypeOrmModule.forFeature([Content])],
  controllers: [ContentsController],
  providers: [ContentsService],
  exports: [ContentsService],
})
export class ContentsModule {}
