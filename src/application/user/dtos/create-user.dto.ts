/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDTO {
    @ApiProperty({ description: 'User email address', example: 'user@example.com' })
    @IsEmail({}, { message: 'Invalid email format' })
    @IsNotEmpty({ message: 'Email is required' })
    email!: string;

    @ApiProperty({ description: 'User password', minLength: 6 })
    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters' })
    @IsNotEmpty({ message: 'Password is required' })
    password!: string;

    @ApiProperty({ description: 'Username', example: 'johndoe' })
    @IsString()
    @IsNotEmpty({ message: 'Username is required' })
    username!: string;
}
