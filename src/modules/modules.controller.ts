import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { CreateModuleDto } from './dto/create-module.dto';

import { ATGuard } from '../common/guards/accessToken.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { ROLES } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/enums/user.enum';

@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Post('/create/:id')
  @UseGuards(ATGuard, RolesGuard)
  @ROLES(UserRole.INSTRUCTOR)
  createModule(@Body() dto: CreateModuleDto, @Param('id') id: string) {
    return this.modulesService.createModule(dto, id);
  }

  @Get('/:id')
  getModules(@Param('id') id: string) {
    return this.modulesService.getCourseModules(id);
  }
}
