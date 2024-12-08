import { Injectable } from '@nestjs/common';
import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private sesClient: SESClient;

  constructor(private readonly configService: ConfigService) {
    this.sesClient = new SESClient({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>(
          'AWS_SECRET_ACCESS_KEY',
        ),
      },
    });
  }

  async sendEmail(
    to: string,
    subject: string,
    htmlBody: string,
  ): Promise<void> {
    const params = {
      Destination: { ToAddresses: [to] },
      Message: {
        Body: {
          Html: { Data: htmlBody },
        },
        Subject: { Data: subject },
      },
      Source: this.configService.get<string>('AWS_SES_EMAIL'),
    };

    const command = new SendEmailCommand(params);
    await this.sesClient.send(command);
  }
}
