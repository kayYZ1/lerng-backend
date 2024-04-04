import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic } from './entities/topics.entity';
import { Repository } from 'typeorm';
import { CreateTopicDto } from './dto/create-topic.dto';
import { CoursesService } from 'src/courses/courses.service';

@Injectable()
export class TopicsService{
  constructor(
    @InjectRepository(Topic)
    private topicsRepository: Repository<Topic>,
    private courseService: CoursesService,
  ) {}

  async createTopic(dto: CreateTopicDto, courseId: string) {
    const topic: Topic = new Topic();

    const courseExist = await this.courseService.findCourseById(courseId);

    if (!courseExist) throw new BadRequestException('Course does not exist.');

    topic.title = dto.title;
    topic.description = dto.description;
    topic.course = courseExist;

    return this.topicsRepository.save(topic);
  }

  async getTopicsFromCourse(courseId: string) {
    return await this.topicsRepository.find({
      where: { course: { id: courseId } },
    });
  }

  async getTopic(id: string) {
    return await this.topicsRepository.findOneBy({ id });
  }

  async findTopicById(topicId: string) {
    return await this.topicsRepository.findOne({
      where: { id: topicId },
    });
  }
}
