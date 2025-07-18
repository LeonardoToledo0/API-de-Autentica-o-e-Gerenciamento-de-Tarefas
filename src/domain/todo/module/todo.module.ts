/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TodoRepository } from "src/infrastructure/todo/repository/todo.repository";
import { TodoEntity } from 'src/infrastructure/todo/entities/todo.orm-entity';
import { TodoController } from 'src/interfaces/controllers/todo/todo.controller';
import { TodoService } from '../service/todo.service';

@Module({
    imports: [TypeOrmModule.forFeature([TodoEntity])],
    controllers: [TodoController],
    providers: [
        TodoService,
        {
            provide: "ITodoRepository",
            useClass: TodoRepository,
        }
    ],
    exports: [TodoService, 'ITodoRepository'],
})
export class TodoModule { }
