import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LearningModule } from './entities/module.entity';
import { Repository } from 'typeorm';
import { CreateModuleDto } from './dto/create-module.dto';
import { CoursesService } from 'src/courses/courses.service';

@Injectable()
export class ModulesService {
  constructor(
    @InjectRepository(LearningModule)
    private courseModuleRepository: Repository<LearningModule>,
    private courseService: CoursesService,
  ) {}

  async createModule(dto: CreateModuleDto, courseId: string) {
    const module: LearningModule = new LearningModule();

    const courseExist = await this.courseService.findCourseById(courseId);

    if (!courseExist) throw new BadRequestException('Course does not exist.');

    module.title = dto.title;
    module.description = dto.description;
    module.course = courseExist;

    return this.courseModuleRepository.save(module);
  }

  async getCourseModules(courseId: string) {
    return await this.courseModuleRepository.find({
      where: { course: { id: courseId } },
    });
  }

  async findModuleById(moduleId: string) {
    return await this.courseModuleRepository.findOne({
      where: { id: moduleId },
    });
  }
}
