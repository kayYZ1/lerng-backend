import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create.dto';
import { UpdateUserDto } from './dto/update.dto';

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

    user.imageUrl = 'default image link';

    return this.userRepository.save(user);
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    await this.userRepository.update(id, dto);

    return `User: ${id} updated.`;
  }
}
