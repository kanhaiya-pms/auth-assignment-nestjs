import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {

    @IsString()
    @IsNotEmpty({ message: 'Name is required' })
    @ApiProperty({ description: 'Full name of the user' })
    name: string;
  
    @IsString()
    @IsNotEmpty({ message: 'Username is required' })
    @Length(4, 20, { message: 'Username must be between 4 and 20 characters' })
    @ApiProperty({ description: 'Username for the user, must be unique' })
    userName: string;
  
    @IsString()
    @IsNotEmpty({ message: 'Password is required' })
    @Length(6, 20, { message: 'Password must be between 6 and 20 characters' })
    @ApiProperty({ description: 'Password for the user account' })
    password: string;
}
