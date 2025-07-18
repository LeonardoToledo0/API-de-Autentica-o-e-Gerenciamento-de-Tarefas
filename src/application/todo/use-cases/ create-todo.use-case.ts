/* eslint-disable prettier/prettier */

import { ITodoRepository } from 'src/domain/todo/repository/todo.repository.interface';
import { Todo } from '../../../domain/todo/entities/todo.entity';
import { randomUUID } from 'crypto';

interface CreateTodoInput {
    userId: string;
    title: string;
    description?: string;
}

export class CreateTodoUseCase {
    constructor(private readonly todoRepository: ITodoRepository) { }

    async execute(input: CreateTodoInput): Promise<Todo> {
        const now = new Date();
        const todo = new Todo(
            randomUUID(),
            input.title,
            input.description ?? null,
            false,
            now,
            now,
            input.userId,
        );

        return this.todoRepository.create(todo);
    }
}
