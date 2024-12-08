import { ApiProperty } from '@nestjs/swagger';
import { PhishingAttemptDto } from './phishing-attempt.dto';

export class PaginatedPhishingAttemptsDto {
  @ApiProperty({ example: 1, description: 'Current page number' })
  page: number;

  @ApiProperty({ example: 10, description: 'Number of items per page' })
  limit: number;

  @ApiProperty({ example: 100, description: 'Total number of items available' })
  total: number;

  @ApiProperty({ type: [PhishingAttemptDto], description: 'List of phishing attempts' })
  data: PhishingAttemptDto[];
}
