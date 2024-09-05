import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TopicsService } from '../topics/topics.service';
import { NewContentDto } from './dto/new-content.dto';
import { EditContentDto } from './dto/edit-content.dto';
import { Content } from './entities/content.entity';

@Injectable()
export class ContentsService {
  constructor(
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
    private topicsService: TopicsService,
  ) {}

  async addNewContent(dto: NewContentDto, topicId: string) {
    const content = new Content();

    const topicExist = await this.topicsService.findTopicById(topicId);

    if (!topicExist) throw new BadRequestException('Topic does not exist');

    content.title = dto.title;
    content.description = dto.description;
    content.paragraph150 = dto.paragraph150;
    content.paragraph300 = dto.paragraph300;
    content.videoUrl = dto.videoUrl;
    content.topic = topicExist;

    return this.contentRepository.save(content);
  }

  async editContent(dto: EditContentDto) {
    const contentExist = await this.getContent(dto.contentId);
    if (!contentExist) throw new BadRequestException('Content does not exist');

    return await this.contentRepository.update(contentExist.id, {
      title: dto.title,
      description: dto.description,
      paragraph150: dto.paragraph150,
      paragraph300: dto.paragraph300,
      videoUrl: dto.videoUrl,
    }); 
  }

  async getContentsFromTopic(topicId: string) {
    return await this.contentRepository.find({
      where: { topic: { id: topicId } },
    });
  }

  async getContent(contentId: string) {
    return await this.contentRepository.findOne({ where: { id: contentId } });
  }
}
