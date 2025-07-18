/* eslint-disable prettier/prettier */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateTodoDTO {
    @ApiPropertyOptional({ description: 'Título da tarefa' })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiPropertyOptional({ description: 'Descrição da tarefa' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({ description: 'Status da tarefa' })
    @IsOptional()
    @IsBoolean()
    completed?: boolean;
}
