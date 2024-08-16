import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty()
  userName: string;

  @ApiProperty()
  password: string;
}
