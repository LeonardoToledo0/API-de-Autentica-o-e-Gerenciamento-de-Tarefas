/* eslint-disable prettier/prettier */

import { ITodoRepository } from 'src/domain/todo/repository/todo.repository.interface';
import { Todo } from '../../../domain/todo/entities/todo.entity';

interface ListTodosInput {
    userId: string;
    completed?: boolean;
    skip: number;
    take: number;
}

export class ListTodosUseCase {
    constructor(private readonly todoRepository: ITodoRepository) { }

    async execute(input: ListTodosInput): Promise<Todo[]> {
        return this.todoRepository.findAllByUser(
            input.userId,
            { completed: input.completed },
            { skip: input.skip, take: input.take },
        );
    }
}
