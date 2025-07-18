/* eslint-disable prettier/prettier */
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ITodoRepository } from 'src/domain/todo/repository/todo.repository.interface';
import { Todo } from 'src/domain/todo/entities/todo.entity';

@Injectable()
export class TodoService {
    constructor(
        @Inject('ITodoRepository')
        private readonly todoRepository: ITodoRepository) { }

    async create(todo: Todo): Promise<Todo> {
        return await this.todoRepository.create(todo);
    }

    async findById(id: string): Promise<Todo> {
        const todo = await this.todoRepository.findById(id);
        if (!todo) {
            throw new NotFoundException(`Todo with id ${id} not found`);
        }
        return todo;
    }

    async findAllByUser(
        userId: string,
        filter?: { completed?: boolean },
        pagination?: { skip: number; take: number },
    ): Promise<Todo[]> {
        return await this.todoRepository.findAllByUser(userId, filter, pagination);
    }

    async update(todo: Todo): Promise<Todo> {
        const exists = await this.todoRepository.findById(todo.id);
        if (!exists) {
            throw new NotFoundException(`Todo with id ${todo.id} not found`);
        }
        return await this.todoRepository.update(todo);
    }

    async delete(id: string): Promise<void> {
        const exists = await this.todoRepository.findById(id);
        if (!exists) {
            throw new NotFoundException(`Todo with id ${id} not found`);
        }
        await this.todoRepository.delete(id);
    }
}
