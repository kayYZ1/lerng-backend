import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseModule } from './entities/module.entity';
import { Repository } from 'typeorm';
import { CreateModuleDto } from './dto/create-module.dto';
import { CoursesService } from 'src/courses/courses.service';

@Injectable()
export class ModulesService {
  constructor(
    @InjectRepository(CourseModule)
    private courseModuleRepository: Repository<CourseModule>,
    private courseService: CoursesService,
  ) {}

  async createModule(dto: CreateModuleDto, courseId: number) {
    const module: CourseModule = new CourseModule();

    const courseExist = await this.courseService.findCourseById(courseId);

    if (!courseExist) throw new BadRequestException('Course does not exist.');

    module.title = dto.title;
    module.course = courseExist;

    return this.courseModuleRepository.save(module);
  }

  async getCourseModules(courseId: number) {
    return await this.courseModuleRepository.find({
      where: { course: { id: courseId } },
    });
  }
}
