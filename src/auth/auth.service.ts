import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
  ) {}

  async signUp(dto: CreateUserDto) {
    const userExist = await this.userService.findOneWithEmail(dto.email);
    if (userExist) {
      throw new BadRequestException('User already exist.');
    }

    const hash = await bcrypt.hash(dto.password, 8);
    const user = await this.userService.createUser({
      ...dto,
      password: hash,
    });

    return user;
  }
}
