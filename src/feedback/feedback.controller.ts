import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { GetCurrId } from 'src/common/decorators/getCurrId.decorator';
import { ROLES } from 'src/common/decorators/roles.decorator';
import { ATGuard } from 'src/common/guards/accessToken.guard';
import { UserRole } from 'src/user/enums/user.enum';
import { FeedbackTicketDto } from './dto/feedback.dto';
import { TicketStatusDto } from './dto/ticket-status.dto';
import { FeedbackService } from './feedback.service';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post('/tickets/add')
  @UseGuards(ATGuard)
  addFeedbackTicket(
    @Body() dto: FeedbackTicketDto,
    @GetCurrId() userId: string,
  ) {
    return this.feedbackService.addFeedbackTicket(dto, userId);
  }

  @Get('/tickets')
  @UseGuards(ATGuard)
  getFeedbackTickets(@GetCurrId() userId: string) {
    return this.feedbackService.getFeedbackTickets(userId);
  }

  @Get('/tickets/instructor')
  @UseGuards(ATGuard)
  @ROLES(UserRole.INSTRUCTOR)
  getInstructorsTickets(@GetCurrId() userId: string) {
    return this.feedbackService.getInstructorsTickets(userId);
  }

  @Patch('/tickets/status')
  @UseGuards(ATGuard)
  @ROLES(UserRole.INSTRUCTOR)
  changeTicketStatus(@Body() dto: TicketStatusDto) {
    return this.feedbackService.changeTicketStatus(dto);
  }
}
