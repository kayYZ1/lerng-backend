import { Module } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LearningModule } from './entities/module.entity';
import { CoursesModule } from 'src/courses/courses.module';

@Module({
  imports: [CoursesModule, TypeOrmModule.forFeature([LearningModule])],
  controllers: [ModulesController],
  providers: [ModulesService],
  exports: [ModulesService]
})
export class ModulesModule {}
