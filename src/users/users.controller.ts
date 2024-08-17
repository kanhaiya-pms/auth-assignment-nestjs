import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { ForgetUserDto } from './dto/forget-user.dto';
import { OtpVerifyDto } from './dto/otpVerify.dto';


@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("signup")
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.usersService.signUp(createUserDto);
  }


  @Post("login")
  login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }


  @Post("forgetpass")
  sendEmail(@Body() dto: ForgetUserDto) {
    return this.usersService.sendEmail(dto)
  }

  @Post("verifyotp")
  otpVerify(@Body() dto: OtpVerifyDto) {
    return this.usersService.otpVerify(dto)
  }

  @Get(":id")
  findOne(@Param("id") id: string ) {
    return this.usersService.findOne(id)
  }
 
  
}
