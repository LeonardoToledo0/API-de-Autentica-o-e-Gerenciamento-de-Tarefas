/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
    @ApiProperty({ example: 'user@example.com' })
    @IsEmail({}, { message: 'Email inválido' })
    @IsNotEmpty({ message: 'Email é obrigatório' })
    email!: string;

    @ApiProperty({ example: 'senha123' })
    @IsString()
    @IsNotEmpty({ message: 'Senha é obrigatória' })
    password!: string;
}
