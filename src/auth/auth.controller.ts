import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { CreateUserDto } from '../users/dto/create.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

import { GetCurrId } from '../common/decorators/getCurrId.decorator';
import { ATGuard } from '../common/guards/accessToken.guard';
import { RTGuard } from '../common/guards/refreshToken.guard';
import { MailDto } from './dto/mail.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/local/sign-up')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() dto: CreateUserDto) {
    return this.authService.signUp(dto);
  }

  @Post('/local/sign-in')
  async signIn(@Body() dto: SignInDto, @Res() res: Response) {
    const { accessToken, refreshToken } = await this.authService.signIn(dto);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: false,
      secure: true,
      sameSite: 'strict',
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    res.send({ accessToken });
  }

  @UseGuards(ATGuard)
  @Post('/sign-out')
  signOut(@GetCurrId() userId: string) {
    return this.authService.signOut(userId);
  }

  @UseGuards(RTGuard)
  @Get('/refresh')
  async refreshTokens(@GetCurrId() userId: string, @Res() res: Response) {
    const { accessToken, refreshToken } =
      await this.authService.refreshTokens(userId);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: false,
      secure: true,
      sameSite: 'strict',
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    res.send({ accessToken });
  }

  @UseGuards(ATGuard)
  @Get('/me')
  getMe(@GetCurrId() userId: string) {
    return this.authService.getMe(userId);
  }

  @Post('/forgot-password')
  forgotPassword(@Body() dto: MailDto) {
    return this.authService.forgotPassword(dto);
  }

  @Post('/reset-password')
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }
}
