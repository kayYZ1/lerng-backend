import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.dto';
import { UpdateUserDto } from './dto/update.dto';

import { ATGuard } from '../common/guards/accessToken.guard';
import { GetCurrId } from '../common/decorators/getCurrId.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  @UseGuards(ATGuard)
  @HttpCode(HttpStatus.OK)
  @Patch('/update')
  update(@GetCurrId() id: number, @Body() dto: UpdateUserDto) {
    return this.usersService.updateUser(id, dto);
  }
}
