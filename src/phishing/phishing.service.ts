import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginatedPhishingAttemptsDto } from "./dto/paginated-phishing-attempts.dto";
import { ConfigService } from "@nestjs/config";
import { EmailService } from "../email/email.service";

@Injectable()
export class PhishingService {
  constructor(@InjectModel('Phishing') private phishingModel: Model<any>, private configService: ConfigService, private readonly emailService: EmailService) {
  }

  async sendPhishingEmail(email: string): Promise<void> {
    const phishing = new this.phishingModel({ email });
    await phishing.save();

    const emailLink = `${process.env.BASE_URL}/awareness/${phishing._id}`;

    const emailBody = `<a href="${emailLink}">Click here to verify</a>`

    // Sending email with nodemailer
    // const transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: { user: this.configService.get<string>('EMAIL_USER'), pass: this.configService.get<string>('EMAIL_PASS') },
    // });
    //
    // await transporter.sendMail({
    //   from: process.env.EMAIL_USER,
    //   to: email,
    //   subject: 'Phishing Simulation',
    //   html: emailBody,
    // });

    await this.emailService.sendEmail(email, 'Phishing Simulation', emailBody);

  }

  async trackClick(id: string): Promise<void> {
    await this.phishingModel.findByIdAndUpdate(id, { linkClicked: true });
  }

  async getPhishingAttempts(page: number, limit: number): Promise<PaginatedPhishingAttemptsDto> {
    const skip = (page - 1) * limit;
    const total = await this.phishingModel.countDocuments();
    const attempts = await this.phishingModel
      .find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean(); // `lean` optimizes performance for read-only queries

    // Map the database results to the DTO
    const data = attempts.map((attempt) => ({
      id: attempt._id.toString(),
      email: attempt.email,
      linkClicked: attempt.linkClicked,
      createdAt: attempt.createdAt,
    }));

    return {
      page,
      limit,
      total,
      data,
    };
  }
}
