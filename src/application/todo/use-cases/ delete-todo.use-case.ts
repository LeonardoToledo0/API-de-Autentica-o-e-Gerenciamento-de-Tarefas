/* eslint-disable prettier/prettier */
import { ITodoRepository } from "src/domain/todo/repository/todo.repository.interface";


export class DeleteTodoUseCase {
    constructor(private readonly todoRepository: ITodoRepository) { }

    async execute(id: string): Promise<void> {
        await this.todoRepository.delete(id);
    }
}
