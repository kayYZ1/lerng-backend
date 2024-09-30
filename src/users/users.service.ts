import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { User } from './entity/user.entity';

import { CreateUserDto } from './dto/create.dto';
import { UpdateUserDataDto } from './dto/update-data.dto';
import { UpdateUserImageDto } from './dto/update-image.dto';
import { UpdateUserPasswordDto } from './dto/update-password.dto';
import { UpdateRtDto } from './dto/update-rt.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const user: User = new User();

    user.email = dto.email;
    user.username = dto.username;
    user.password = dto.password;

    user.imageUrl = 'https://placehold.co/600x400.png';

    return this.userRepository.save(user);
  }

  async updateUserImage(id: string, dto: UpdateUserImageDto) {
    const userExist = await this.findOne(id);
    if (!userExist) throw new BadRequestException('User does not exist.');

    return await this.userRepository.update(id, dto);
  }

  async updateUserData(id: string, dto: UpdateUserDataDto) {
    const userExist = await this.findOne(id);
    if (!userExist) throw new BadRequestException('User does not exist.');

    const emailExist = await this.findOneWithEmail(dto.email);
    if (emailExist && emailExist.id !== id)
      throw new BadRequestException('Email already in use');

    const usernameExist = await this.findOneWithUsername(dto.username);
    if (usernameExist && usernameExist.id !== id)
      throw new BadRequestException('Username is already taken.');

    return await this.userRepository.update(id, dto);
  }

  async updateUserPassword(id: string, dto: UpdateUserPasswordDto) {
    const userExist = await this.findOne(id);
    if (!userExist) throw new BadRequestException('User does not exist.');

    const isMatch = await bcrypt.compare(dto.password, userExist.password);
    if (!isMatch)
      throw new BadRequestException('Current password does not match.');

    if (dto.password === userExist.password) {
      throw new BadRequestException("You can't reuse the same password");
    }

    const newPasswordHash = await bcrypt.hash(dto.newPassword, 8);

    userExist.password = newPasswordHash;

    return await this.userRepository.update(id, userExist);
  }

  async resetUserPassword(id: string, newPassword: string) {
    const userExist = await this.findOne(id);
    if (!userExist) throw new BadRequestException('User does not exist.');

    const isMatch = await bcrypt.compare(newPassword, userExist.password);
    if (isMatch)
      throw new BadRequestException("You can't reuse the same password");

    const newPasswordHash = await bcrypt.hash(newPassword, 8);

    userExist.password = newPasswordHash;

    return await this.userRepository.update(id, userExist);
  }

  async updateRt(id: string, dto: UpdateRtDto) {
    return await this.userRepository.update(id, dto);
  }

  async findOne(id: string) {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async findOneWithEmail(email: string) {
    return await this.userRepository.findOne({ where: { email: email } });
  }

  async findOneWithUsername(username: string) {
    return await this.userRepository.findOne({ where: { username: username } });
  }

  async getUsers() {
    return await this.userRepository.find();
  }

  async getLatestUsers() {
    return await this.userRepository.find({
      select: {
        id: true,
        imageUrl: true,
      },
      order: {
        created: 'DESC',
      },
      skip: 0,
      take: 3,
    });
  }
}
