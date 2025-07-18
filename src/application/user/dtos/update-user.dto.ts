/* eslint-disable prettier/prettier */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export class UpdateUserDTO {
    @ApiPropertyOptional({ description: 'User email address', example: 'user@example.com' })
    @IsOptional()
    @IsEmail({}, { message: 'Invalid email format' })
    email?: string;

    @ApiPropertyOptional({ description: 'User password', minLength: 6 })
    @IsOptional()
    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters' })
    password?: string;
}
