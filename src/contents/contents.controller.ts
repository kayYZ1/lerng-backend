import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetCurrId } from 'src/common/decorators/getCurrId.decorator';
import { ROLES } from '../common/decorators/roles.decorator';
import { ATGuard } from '../common/guards/accessToken.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { UserRole } from '../user/enums/user.enum';
import { ContentsService } from './contents.service';
import { EditContentDto } from './dto/edit-content.dto';
import { NewContentDto } from './dto/new-content.dto';

@Controller('contents')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Post('/create/:id')
  @UseGuards(ATGuard, RolesGuard)
  @ROLES(UserRole.INSTRUCTOR)
  newContent(
    @Body() dto: NewContentDto,
    @Param('id') id: string,
    @GetCurrId() userId: string,
  ) {
    return this.contentsService.newContent(dto, id, userId);
  }

  @Patch('/edit')
  @UseGuards(ATGuard, RolesGuard)
  @ROLES(UserRole.INSTRUCTOR)
  editContent(@Body() dto: EditContentDto, @GetCurrId() userId: string) {
    return this.contentsService.editContent(dto, userId);
  }

  @Delete('/remove/:id')
  @UseGuards(ATGuard, RolesGuard)
  @ROLES(UserRole.INSTRUCTOR)
  removeContent(@Param('id') id: string, @GetCurrId() userId: string) {
    return this.contentsService.removeContent(id, userId);
  }

  @Get('/:id')
  @UseGuards(ATGuard)
  getContentsFromTopic(@Param('id') id: string) {
    return this.contentsService.getContentsFromTopic(id);
  }
}
