import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create.dto';
import { UpdateUserDto } from './dto/update.dto';
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

  async updateUser(id: number, dto: UpdateUserDto) {
    return await this.userRepository.update(id, dto);
  }

  async updateRt(id: number, dto: UpdateRtDto) {
    return await this.userRepository.update(id, dto);
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async findOneWithEmail(email: string) {
    return await this.userRepository.findOne({ where: { email: email } });
  }
}
