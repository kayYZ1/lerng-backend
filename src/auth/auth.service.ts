import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create.dto';
import { UserRole } from '../users/enums/user.enum';
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

  async signOut(userId: number) {
    await this.userService.updateRt(userId, {
      refreshToken: null,
    });

    return true;
  }

  async refreshTokens(userId: number) {
    const user = await this.userService.findOne(userId);

    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access prohibited');

    const tokens = await this.getTokens(user.id, user.email, user.role);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    await this.userService.updateRt(userId, {
      refreshToken,
    });
  }

  async getTokens(userId: number, email: string, role: UserRole) {
    const payload: JwtPayload = {
      sub: userId,
      email,
      role,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.access_token,
        expiresIn: '1h',
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.refresh_token,
        expiresIn: '7d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
