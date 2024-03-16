import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ModuleContent } from './entities/content.entity';
import { Repository } from 'typeorm';
import { NewContentDto } from './dto/new-content.dto';
import { ModulesService } from '../modules/modules.service';

@Injectable()
export class ContentsService {
  constructor(
    @InjectRepository(ModuleContent)
    private contentRepository: Repository<ModuleContent>,
    private moduleService: ModulesService,
  ) {}

  async addNewContent(dto: NewContentDto, moduleId: number) {
    const content = new ModuleContent();

    const moduleExist = await this.moduleService.findModuleById(moduleId);

    if (!moduleExist) throw new BadRequestException('Module does not exist');

    content.title = dto.title;
    content.description = dto.description;
    content.textFirst = dto.textFirst;
    content.textSecond = dto.textSecond;
    content.imageUrl = dto.imageUrl;
    content.videoUrl = dto.videoUrl;
    content.module = moduleExist;

    return this.contentRepository.save(content);
  }

  async getModuleContents(moduleId: number) {
    return await this.contentRepository.find({
      where: { module: { id: moduleId } },
    });
  }
}
