import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';

import { CreateUserDto } from './dto/create.dto';
import { UpdateUserDataDto } from './dto/update-data.dto';
import { UpdateUserImageDto } from './dto/update-image.dto';
import { UpdateUserPasswordDto } from './dto/update-password.dto';
import { UsersService } from './users.service';

import { GetCurrId } from '../common/decorators/getCurrId.decorator';
import { ROLES } from '../common/decorators/roles.decorator';
import { ATGuard } from '../common/guards/accessToken.guard';
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
  updateUserImage(@GetCurrId() id: string, @Body() dto: UpdateUserImageDto) {
    return this.usersService.updateUserImage(id, dto);
  }

  @UseGuards(ATGuard)
  @Patch('/update/data')
  updateUserData(@GetCurrId() id: string, @Body() dto: UpdateUserDataDto) {
    return this.usersService.updateUserData(id, dto);
  }

  @UseGuards(ATGuard)
  @Patch('/update/password')
  updateUserPassword(
    @GetCurrId() id: string,
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
