/* eslint-disable prettier/prettier */
import { ITodoRepository } from 'src/domain/todo/repository/todo.repository.interface';
import { Todo } from '../../../domain/todo/entities/todo.entity';

export class FindTodoUseCase {
    constructor(private readonly todoRepository: ITodoRepository) { }

    async execute(id: string): Promise<Todo | null> {
        return this.todoRepository.findById(id);
    }
}
