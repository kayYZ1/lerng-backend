import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { ConfigService } from '@nestjs/config';
import { MailDto } from 'src/mail/dto/mail.dto';
import { MailService } from 'src/mail/mail.service';
import { CreateUserDto } from '../users/dto/create.dto';
import { UserRole } from '../users/enums/user.enum';
import { UsersService } from '../users/users.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { SignInDto } from './dto/sign-in.dto';
import { JwtPayload } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly mailService: MailService,
    private jwtService: JwtService,
    private configService: ConfigService,
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
        secret: this.configService.get<string>('jwt.access_token'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('jwt.refresh_token'),
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

  async forgotPassword(dto: MailDto) {
    const user = await this.userService.findOneWithEmail(dto.email);
    if (!user) throw new BadRequestException('User does not exist');

    const payload: JwtPayload = {
      sub: user.id,
      email: dto.email,
      role: user.role,
    };

    const resetToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('jwt.password_reset'),
      expiresIn: '5m',
    });

    const resetLink = `http://localhost:5173/auth/forgot-password/${resetToken}`;

    await this.mailService.passwordReset(dto.email, resetLink);
  }

  async resetPassword(dto: ResetPasswordDto) {
    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(dto.token, {
        secret: this.configService.get<string>('jwt.password_reset'),
      });
      this.userService.resetUserPassword(payload.sub, dto.password);
    } catch (error) {
      throw new BadRequestException('Token already expired');
    }
  }
}
