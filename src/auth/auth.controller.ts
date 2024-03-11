import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create.dto';
import { SignInDto } from './dto/sign-in.dto';

import { GetCurrId } from '../common/decorators/getCurrId.decorator';
import { ATGuard } from '../common/guards/accessToken.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/local/sign-up')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() dto: CreateUserDto) {
    return this.authService.signUp(dto);
  }

  @Post('/local/sign-in')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() dto: SignInDto) {
    return this.authService.signIn(dto);
  }

  @UseGuards(ATGuard)
  @Post('/sign-out')
  @HttpCode(HttpStatus.OK)
  signOut(@GetCurrId() userId: number) {
    return this.authService.signOut(userId);
  }
}
