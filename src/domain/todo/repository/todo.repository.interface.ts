/* eslint-disable prettier/prettier */

import { Todo } from '../entities/todo.entity';

export interface ITodoRepository {
    create(todo: Todo): Promise<Todo>;
    findById(id: string): Promise<Todo | null>;
    findAllByUser(userId: string, filter?: { completed?: boolean }, pagination?: { skip: number; take: number }): Promise<Todo[]>;
    update(todo: Todo): Promise<Todo>;
    delete(id: string): Promise<void>;
}
