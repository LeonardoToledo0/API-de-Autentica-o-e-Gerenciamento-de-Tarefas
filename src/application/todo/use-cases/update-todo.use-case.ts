/* eslint-disable prettier/prettier */

import { ITodoRepository } from 'src/domain/todo/repository/todo.repository.interface';
import { Todo } from '../../../domain/todo/entities/todo.entity';

interface UpdateTodoInput {
    id: string;
    title?: string;
    description?: string;
    completed?: boolean;
}

export class UpdateTodoUseCase {
    constructor(private readonly todoRepository: ITodoRepository) { }

    async execute(input: UpdateTodoInput): Promise<Todo | null> {
        const existing = await this.todoRepository.findById(input.id);
        if (!existing) return null;

        const updated = {
            ...existing,
            ...input,
            updatedAt: new Date(),
        };

        return this.todoRepository.update(updated as Todo);
    }
}
