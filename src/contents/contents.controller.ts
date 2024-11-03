import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ROLES } from '../common/decorators/roles.decorator';
import { ATGuard } from '../common/guards/accessToken.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { UserRole } from '../users/enums/user.enum';
import { ContentsService } from './contents.service';
import { EditContentDto } from './dto/edit-content.dto';
import { NewContentDto } from './dto/new-content.dto';

@Controller('contents')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Post('/create/:id')
  @UseGuards(ATGuard, RolesGuard)
  @ROLES(UserRole.INSTRUCTOR)
  newContent(@Body() dto: NewContentDto, @Param('id') id: string) {
    return this.contentsService.addNewContent(dto, id);
  }

  @Patch('/edit')
  @UseGuards(ATGuard, RolesGuard)
  @ROLES(UserRole.INSTRUCTOR)
  editContent(@Body() dto: EditContentDto) {
    return this.contentsService.editContent(dto);
  }

  @Get('/:id')
  @UseGuards(ATGuard)
  getContentsFromTopic(@Param('id') id: string) {
    return this.contentsService.getContentsFromTopic(id);
  }
}
