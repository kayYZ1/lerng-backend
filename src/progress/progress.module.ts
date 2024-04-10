import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicsModule } from '../topics/topics.module.';
import { UsersModule } from '../users/users.module';
import { Progress } from './entities/progress.entity';
import { ProgressController } from './progress.controller';
import { ProgressService } from './progress.service';

@Module({
  imports: [TypeOrmModule.forFeature([Progress]), TopicsModule, UsersModule],
  controllers: [ProgressController],
  providers: [ProgressService],
})
export class ProgressModule {}
