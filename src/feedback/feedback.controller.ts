import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { ATGuard } from 'src/common/guards/accessToken.guard';
import { FeedbackTicketDto } from './dto/feedback.dto';
import { FeedbackService } from './feedback.service';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post('/add-ticket')
  @UseGuards(ATGuard)
  addFeedbackTicket(@Body() dto: FeedbackTicketDto) {
    return this.feedbackService.addFeedbackTicket(dto);
  }
}
