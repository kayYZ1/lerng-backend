import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { ATGuard } from '../common/guards/accessToken.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { ROLES } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/enums/user.enum';
import { NewContentDto } from './dto/new-content.dto';

@Controller('contents')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Post('/create/:id')
  @UseGuards(ATGuard, RolesGuard)
  @ROLES(UserRole.ADMIN)
  newContent(@Body() dto: NewContentDto, @Param('id') id: string) {
    return this.contentsService.addNewContent(dto, +id);
  }

  @Get('/:id')
  @UseGuards(ATGuard)
  getContents(@Param('id') id: string) {
    return this.contentsService.getModuleContents(+id);
  }
}
