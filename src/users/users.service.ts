import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { Users } from './schema/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private usersModel: Model<Users>) {}


  async signUp(createUserDto: CreateUserDto) {

    const user = await this.usersModel.findOne({userName: createUserDto.userName})

    if (user) {
      throw new BadRequestException("username already useIn")
    }

    const {password, ...userDto} = createUserDto
    
    const hashedPassword = await bcrypt.hash(password, 10);


    const userData = await this.usersModel.create({
      ...userDto,
      password: hashedPassword,
    });

    return userData
  }

  async login(loginUserDto: LoginUserDto) {
    
    const user = await this.usersModel.findOne({userName: loginUserDto.userName})

    if (!user) {
      throw new UnauthorizedException("wrong credentials")
    }

    const matchedPassword = await bcrypt.compare(loginUserDto.password, user.password)

    if (!matchedPassword) {
      throw new UnauthorizedException("wrong credentials")
    }


    return user






  }

  
}
