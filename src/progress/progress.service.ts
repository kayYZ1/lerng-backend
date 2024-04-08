import { BadRequestException, Injectable } from '@nestjs/common';
import { Progress } from './entities/progress.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SaveProgressDto } from './dto/save-progress.dto';
import { TopicsService } from '../topics/topics.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class ProgressService {
  constructor(
    @InjectRepository(Progress)
    private readonly progressRepository: Repository<Progress>,
    private topicsService: TopicsService,
    private usersService: UsersService,
  ) {}

  async saveProgress(dto: SaveProgressDto, topicId: string) {
    const topicExist = await this.topicsService.findTopicById(topicId);
    const userExist = await this.usersService.findOne(dto.userId);

    if (!topicExist) throw new BadRequestException('Topic does not exist');
    if (!userExist) throw new BadRequestException('User does not exist');

    const progressExist = await this.progressRepository.findOne({
      where: { user: { id: userExist.id }, topic: { id: topicExist.id } },
    });

    if (progressExist) {
      progressExist.quizScore = dto.quizScore;
      progressExist.progressScore = dto.progressScore;

      this.progressRepository.update(progressExist.id, progressExist);
    } else {
      const progress = new Progress();

      progress.topic = topicExist;
      progress.user = userExist;
      progress.progressScore = dto.progressScore;
      progress.quizScore = dto.quizScore;

      this.progressRepository.save(progress);
    }
  }

  async getUserProgress(topicId: string) {
    
  }

}
