import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoursesService } from '../courses/courses.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { EditTopicDto } from './dto/edit-topic.dto';
import { Topic } from './entities/topics.entity';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(Topic)
    private topicsRepository: Repository<Topic>,
    private courseService: CoursesService,
  ) {}

  async createTopic(dto: CreateTopicDto, courseId: string) {
    const topic: Topic = new Topic();

    const courseExist = await this.courseService.findCourseById(courseId);

    if (!courseExist)
      throw new BadRequestException('Course does not exist.');

    topic.title = dto.title;
    topic.description = dto.description;
    topic.course = courseExist;

    return this.topicsRepository.save(topic);
  }

  async editTopic(dto: EditTopicDto, userId: string) {
    const topicExist = await this.findTopicById(dto.topicId);
    if (!topicExist)
      throw new BadRequestException('Topic does not exist.');

    if (topicExist.course.user.id !== userId)
      throw new BadRequestException('Your not this course instructor.');

    return await this.topicsRepository.update(topicExist.id, {
      description: dto.description,
      title: dto.title,
    });
  }

  async removeTopic(topicId: string, userId: string) {
    const topicExist = await this.findTopicById(topicId);
    if (!topicExist)
      throw new BadRequestException('Topic does not exist.');

    if (topicExist.course.user.id !== userId)
      throw new BadRequestException('Your not this course instructor.');

    return await this.topicsRepository.delete(topicId);
  }

  async getTopicsFromCourse(courseId: string) {
    return await this.topicsRepository.find({
      where: { course: { id: courseId } },
      order: {
        createdAt: 'ASC',
      },
    });
  }

  async getTopic(id: string) {
    return await this.topicsRepository.findOneBy({ id });
  }

  async findTopicById(topicId: string) {
    return await this.topicsRepository.findOne({
      where: { id: topicId },
      relations: ['course', 'course.user'],
    });
  }
}
