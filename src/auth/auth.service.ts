import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create.dto';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

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

  async signIn(dto: SignInDto) {
    const userExist = await this.userService.findOneWithEmail(dto.email);

    if (!userExist) {
      throw new BadRequestException('User does not exist');
    }

    const isMatch = await bcrypt.compare(dto.password, userExist.password);

    if (!isMatch) {
      throw new BadRequestException('Wrong password');
    }

    //Add JWT

    return userExist;
  }
}
