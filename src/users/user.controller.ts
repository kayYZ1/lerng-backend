import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { ChangeUserAccessDto } from './dto/change-access.dto';
import { CreateUserDto } from './dto/create.dto';
import { UpdateUserDataDto } from './dto/update-data.dto';
import { UpdateUserImageDto } from './dto/update-image.dto';
import { UpdateUserPasswordDto } from './dto/update-password.dto';
import { UsersService } from './user.service';

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

  @Patch('/update/imageUrl')
  @UseGuards(ATGuard)
  updateUserImage(
    @GetCurrId() id: string,
    @Body() dto: UpdateUserImageDto,
  ) {
    return this.usersService.updateUserImage(id, dto);
  }

  @Patch('/update/data')
  @UseGuards(ATGuard)
  updateUserData(@GetCurrId() id: string, @Body() dto: UpdateUserDataDto) {
    return this.usersService.updateUserData(id, dto);
  }

  @Patch('/update/password')
  @UseGuards(ATGuard)
  updateUserPassword(
    @GetCurrId() id: string,
    @Body() dto: UpdateUserPasswordDto,
  ) {
    return this.usersService.updateUserPassword(id, dto);
  }

  @Patch('/change-access')
  @ROLES(UserRole.ADMIN)
  @UseGuards(ATGuard, RolesGuard)
  changeUserAccess(@Body() dto: ChangeUserAccessDto) {
    return this.usersService.changeUserAccess(dto);
  }

  @Get('/all')
  @ROLES(UserRole.ADMIN)
  @UseGuards(ATGuard, RolesGuard)
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get('/latest-users')
  getLatestUsers() {
    return this.usersService.getLatestUsers();
  }
}
