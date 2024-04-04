import { Module } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { ContentsController } from './contents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from './entities/content.entity';
import { TopicsModule } from '../topics/topics.module.';

@Module({
  imports: [TopicsModule, TypeOrmModule.forFeature([Content])],
  controllers: [ContentsController],
  providers: [ContentsService],
})
export class ContentsModule {}
