import { Module } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { ContentsController } from './contents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModuleContent } from './entities/content.entity';
import { ModulesModule } from '../modules/modules.module';

@Module({
  imports: [ModulesModule, TypeOrmModule.forFeature([ModuleContent])],
  controllers: [ContentsController],
  providers: [ContentsService],
})
export class ContentsModule {}
