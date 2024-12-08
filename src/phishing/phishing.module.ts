import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PhishingController } from './phishing.controller';
import { PhishingService } from './phishing.service';
import { PhishingSchema } from './phishing.schema';
import { EmailService } from "../email/email.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Phishing', schema: PhishingSchema }])],
  controllers: [PhishingController],
  providers: [PhishingService, EmailService],
})
export class PhishingModule {}
