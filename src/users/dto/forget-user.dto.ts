import { ApiProperty } from '@nestjs/swagger';

export class ForgetUserDto {
  @ApiProperty()
  email: string;
}
