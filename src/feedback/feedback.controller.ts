import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { GetCurrId } from 'src/common/decorators/getCurrId.decorator';
import { ROLES } from 'src/common/decorators/roles.decorator';
import { ATGuard } from 'src/common/guards/accessToken.guard';
import { UserRole } from 'src/users/enums/user.enum';
import { FeedbackTicketDto } from './dto/feedback.dto';
import { FeedbackService } from './feedback.service';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post('/add-ticket')
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
}
