import { Module } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Progress } from './entities/progress.entity';
import { TopicsModule } from '../topics/topics.module.';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Progress]), TopicsModule, UsersModule],
  controllers: [ProgressController],
  providers: [ProgressService],
})
export class ProgressModule {}
