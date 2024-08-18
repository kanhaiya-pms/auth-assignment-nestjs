import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import mongoose, { Model } from 'mongoose';
import { Users } from './schema/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { LoginUserDto } from './dto/login-user.dto';
import * as nodemailer from 'nodemailer';
import * as bcrypt from 'bcryptjs';
import { ForgetUserDto } from './dto/forget-user.dto';
import { OtpVerifyDto } from './dto/otpVerify.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private usersModel: Model<Users>) {}

  async signUp(createUserDto: CreateUserDto) {
    const user = await this.usersModel.findOne({
      userName: createUserDto.userName,
    });

    const userEmail = await this.usersModel.findOne({
      email: createUserDto.email,
    });

    if (user) {
      throw new BadRequestException('username already useIn');
    }

    if (userEmail) {
      throw new BadRequestException('useremail already useIn');
    }

    const { password, ...userDto } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = await this.usersModel.create({
      ...userDto,
      password: hashedPassword,
    });

    return userData;
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.usersModel.findOne({
      userName: loginUserDto.userName,
    });

    if (!user) {
      throw new UnauthorizedException('wrong credentials');
    }

    const matchedPassword = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );

    if (!matchedPassword) {
      throw new UnauthorizedException('wrong credentials');
    }

    return user;
  }

  async sendEmail(dto: ForgetUserDto) {
    const user = await this.usersModel.findOne({ email: dto.email });

    if (!user) {
      throw new UnauthorizedException('user not found!');
    }

    const genOtp = Math.floor(100000 + Math.random() * 900000);

    await this.usersModel.findByIdAndUpdate(user._id, { otp: genOtp });

    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 465,
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    try {
      const info = await transporter.sendMail({
        from: '"Administrator" <kanhaiya.psa@postmortemshala.co.in>',
        to: `${user.email}, kanhaiyanri43@gmail.com`,
        subject: 'Reset - passwordr',
        html: ` <div style="font-family: Arial, sans-serif; line-height: 1.6;">
              <h2>Welcome to auth-web-application!</h2>
              <p>Your OTP for forget-password is:</p>
              <p style="font-size: 24px; color:green; font-weight: bold;">${genOtp}</p>
              <p>Please enter this OTP to reset your password.</p>
              <p>If you did not request this OTP, please ignore this email.</p>
              <p>Best regards,</p>
              <p>auth-web-application(kanhaiya)</p>
            </div>"`,
      });
      console.log('Message Sent', info.response);
    } catch (error) {
      console.error('Error Occurred', error);
      throw new BadRequestException({
        message: 'Failed to send OTP email',
        error: 'MailError',
      });
    }

    return {
      status: true,
      message: 'OTP send successfuly',
    };
  }

  async otpVerify(dto: OtpVerifyDto) {
    const { otp, email, password } = dto;
    console.log(dto);

    const user = await this.usersModel.findOne({ email: email });

    if (user.otp != otp) {
      throw new BadRequestException({
        message: 'OTP mis-match',
        error: 'otp verification fail!',
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await this.usersModel.findByIdAndUpdate(user._id, {
      password: hashPassword,
      otp: ""
    });

    return {
      message: 'password has been changed',
    };
  }


  async findOne(id: string) {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      throw new UnauthorizedException('Invalid or missing user ID!');
    }
  
    const user = await this.usersModel.findById(new mongoose.Types.ObjectId(id));
  
    if (!user) {
      throw new UnauthorizedException('User not found!');
    }
  
    return user;
  }
}
