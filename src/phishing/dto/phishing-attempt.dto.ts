import { ApiProperty } from '@nestjs/swagger';

export class PhishingAttemptDto {
  @ApiProperty({ example: '63f7c9d9f4f4f4f4f4f4f4f4', description: 'Unique ID of the attempt' })
  id: string;

  @ApiProperty({ example: 'user@example.com', description: 'Email of the phishing attempt recipient' })
  email: string;

  @ApiProperty({ example: false, description: 'Whether the phishing link was clicked' })
  linkClicked: boolean;

  @ApiProperty({ example: '2023-10-20T10:20:30Z', description: 'Creation date of the attempt' })
  createdAt: string;
}
