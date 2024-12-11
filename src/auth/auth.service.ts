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
import { UserAccess, UserRole } from '../users/enums/user.enum';
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

    const hash = await bcrypt.hash(dto.password, 12);
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

    if (userExist.access === UserAccess.BLOCKED) {
      throw new BadRequestException(
        'Your access to application has been revoked. Contact administrator for more info.',
      );
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
        expiresIn: '10m',
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
      imageUrl: user.imageUrl,
      role: user.role,
    };

    return userModified;
  }

  async forgotPassword(dto: MailDto) {
    const user = await this.userService.findOneWithEmail(dto.email);
    if (!user) throw new BadRequestException('Email not found');

    const payload: JwtPayload = {
      sub: user.id,
      email: dto.email,
      role: user.role,
    };

    const resetToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('jwt.password_reset'),
      expiresIn: '5m',
    });

    const resetLink =
      process.env.NODE_ENV === 'production'
        ? `https://lerng.netlify.app/auth/forgot-password/${resetToken}`
        : `http://localhost:8080/auth/forgot-password/${resetToken}`;

    await this.mailService.sendPasswordResetMail(dto.email, resetLink);
  }

  async resetPassword(dto: ResetPasswordDto) {
    let payload: JwtPayload;
    try {
      payload = await this.jwtService.verifyAsync(dto.token, {
        secret: this.configService.get<string>('jwt.password_reset'),
      });
    } catch (error) {
      throw new BadRequestException('Link has already expired');
    } finally {
      if (!payload)
        throw new BadRequestException('Link has already expired');
      await this.userService.resetUserPassword(payload.sub, dto.password);
    }
  }
}
