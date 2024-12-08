import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from "./user.schema";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  // TODO: Email verification, Password recovery

  async register(email: string, password: string): Promise<void> {

    const user = await this.userModel.findOne({ email })

    if (user) {
      throw new BadRequestException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await this.userModel.create({ email, password: hashedPassword });
  }

  async login(email: string, password: string): Promise<{ token: string }> {
    const user = await this.userModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }

    const token = this.jwtService.sign({ id: user._id, email: user.email });
    return { token };
  }
}
