import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.dto';
import { UpdateUserImageDto } from './dto/update-image.dto';
import { UpdateUserDataDto } from './dto/update-data.dto';
import { UpdateUserPasswordDto } from './dto/update-password.dto';

import { ATGuard } from '../common/guards/accessToken.guard';
import { GetCurrId } from '../common/decorators/getCurrId.decorator';
import { ROLES } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { UserRole } from './enums/user.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  @UseGuards(ATGuard)
  @Patch('/update/imageUrl')
  updateUserImage(@GetCurrId() id: number, @Body() dto: UpdateUserImageDto) {
    return this.usersService.updateUserImage(id, dto);
  }

  @UseGuards(ATGuard)
  @Patch('/update/data')
  updateUserData(@GetCurrId() id: number, @Body() dto: UpdateUserDataDto) {
    return this.usersService.updateUserData(id, dto);
  }

  @UseGuards(ATGuard)
  @Patch('/update/password')
  updateUserPassword(
    @GetCurrId() id: number,
    @Body() dto: UpdateUserPasswordDto,
  ) {
    return this.usersService.updateUserPassword(id, dto);
  }

  @ROLES(UserRole.ADMIN)
  @UseGuards(ATGuard, RolesGuard)
  @Get('/all')
  getUsers() {
    return this.usersService.getUsers();
  }
}
