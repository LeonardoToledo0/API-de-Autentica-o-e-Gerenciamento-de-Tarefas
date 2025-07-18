/* eslint-disable prettier/prettier */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator';

export class CreateTodoDTO {
    @ApiProperty({ description: 'ID do usuário dono da tarefa' })
    @IsNotEmpty()
    @IsString()
    userId: string;

    @ApiProperty({ description: 'Título da tarefa' })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiPropertyOptional({ description: 'Descrição da tarefa' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ description: 'Status da tarefa', default: false })
    @IsBoolean()
    @IsOptional()
    completed?: boolean;
}
