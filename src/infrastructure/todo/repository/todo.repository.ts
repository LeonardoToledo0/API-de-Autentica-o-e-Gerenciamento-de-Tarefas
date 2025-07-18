/* eslint-disable prettier/prettier */
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ITodoRepository } from 'src/domain/todo/repository/todo.repository.interface';
import { Todo } from 'src/domain/todo/entities/todo.entity';

import { UserEntity } from '../../user/entities/user.orm-entity';
import { TodoEntity } from '../entities/todo.orm-entity';

@Injectable()
export class TodoRepository implements ITodoRepository {
    constructor(
        @InjectRepository(TodoEntity)
        private readonly repo: Repository<TodoEntity>,
    ) { }

    async create(todo: Todo): Promise<Todo> {
        const todoEntity = this.fromDomain(todo);
        const saved = await this.repo.save(todoEntity);
        return this.toDomain(saved);
    }

    async findById(id: string): Promise<Todo | null> {
        const entity = await this.repo.findOne({ where: { id }, relations: ['user'] });
        if (!entity) return null;
        return this.toDomain(entity);
    }

    async findAllByUser(
        userId: string,
        filter?: { completed?: boolean },
        pagination?: { skip: number; take: number },
    ): Promise<Todo[]> {
        const query = this.repo.createQueryBuilder('todo').where('todo.userId = :userId', { userId });

        if (filter?.completed !== undefined) {
            query.andWhere('todo.completed = :completed', { completed: filter.completed });
        }
        if (pagination) {
            query.skip(pagination.skip).take(pagination.take);
        }

        const entities = await query.getMany();
        return entities.map(entity => this.toDomain(entity));
    }

    async update(todo: Todo): Promise<Todo> {
        const todoEntity = this.fromDomain(todo);
        await this.repo.update(todo.id, todoEntity);
        const updated = await this.repo.findOne({ where: { id: todo.id }, relations: ['user'] });
        if (!updated) throw new Error('Todo not found');
        return this.toDomain(updated);
    }

    async delete(id: string): Promise<void> {
        await this.repo.delete(id);
    }

    private toDomain(entity: TodoEntity): Todo {
        return new Todo(
            entity.id,
            entity.title,
            entity.description ?? null,
            entity.completed,
            entity.createdAt,
            entity.updatedAt,
            entity.user.id,
        );
    }


    private fromDomain(todo: Todo): TodoEntity {
        const entity = new TodoEntity();
        entity.id = todo.id;
        entity.title = todo.title;
        entity.description = todo.description ?? null;
        entity.completed = todo.completed;
        entity.user = new UserEntity();
        entity.user.id = todo.userId;
        entity.createdAt = todo.createdAt;
        entity.updatedAt = todo.updatedAt;

        return entity;
    }
}
