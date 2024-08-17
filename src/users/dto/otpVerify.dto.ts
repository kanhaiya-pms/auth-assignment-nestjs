import { ApiProperty } from '@nestjs/swagger';

export class OtpVerifyDto {
  @ApiProperty()
  otp: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
