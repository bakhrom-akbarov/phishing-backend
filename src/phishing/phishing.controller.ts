import { Controller, Post, Body, Param, UseGuards, Query, Get } from '@nestjs/common';
import { PhishingService } from './phishing.service';
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { PaginatedPhishingAttemptsDto } from "./dto/paginated-phishing-attempts.dto";
import { ApiBody, ApiQuery } from "@nestjs/swagger";

@Controller('phishing')
export class PhishingController {
  constructor(private phishingService: PhishingService) {}

  @UseGuards(JwtAuthGuard)
  @Post('send')
  @ApiBody({
    description: 'Send a phishing simulation email to the specified address.',
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'bakhrom.akbarov@gmail.com',
          description: 'Recipient email address',
        },
      },
    },
  })
  async sendPhishingEmail(@Body('email') email: string): Promise<void> {
    await this.phishingService.sendPhishingEmail(email);
  }

  @Post('click/:id')
  async trackClick(@Param('id') id: string): Promise<void> {
    await this.phishingService.trackClick(id);
  }

  @Get()
  @ApiQuery({ name: 'page', required: true, example: 1, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: true, example: 10, description: 'Number of items per page' })
  async getPhishingAttempts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<PaginatedPhishingAttemptsDto> {
    return this.phishingService.getPhishingAttempts(page, limit);
  }
}
