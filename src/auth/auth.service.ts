import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from '../users/dto/create.dto';
import { UserRole } from '../users/enums/user.enum';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import { JwtPayload } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
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

  async signIn(dto: SignInDto) {
    const userExist = await this.userService.findOneWithEmail(dto.email);

    if (!userExist) {
      throw new BadRequestException('User does not exist');
    }

    const isMatch = await bcrypt.compare(dto.password, userExist.password);

    if (!isMatch) {
      throw new BadRequestException('Wrong password');
    }

    const tokens = await this.getTokens(
      userExist.id,
      userExist.email,
      userExist.role,
    );
    await this.updateRefreshToken(userExist.id, tokens.refreshToken);

    return tokens;
  }

  async signOut(userId: string) {
    return await this.userService.updateRt(userId, {
      refreshToken: null,
    });
  }

  async refreshTokens(userId: string) {
    const user = await this.userService.findOne(userId);

    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access prohibited');

    const tokens = await this.getTokens(user.id, user.email, user.role);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    await this.userService.updateRt(userId, {
      refreshToken,
    });
  }

  async getTokens(userId: string, email: string, role: UserRole) {
    const payload: JwtPayload = {
      sub: userId,
      email,
      role,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.access_token,
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.refresh_token,
        expiresIn: '1d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async getMe(userId: string) {
    const user = await this.userService.findOne(userId);
    const userModified = {
      id: userId,
      email: user.email,
      username: user.username,
      avatar: user.imageUrl,
      role: user.role,
    };

    return userModified;
  }
}
