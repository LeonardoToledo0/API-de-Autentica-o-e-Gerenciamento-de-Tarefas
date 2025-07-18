/* eslint-disable prettier/prettier */

import { TodoEntity } from 'src/infrastructure/todo/entities/todo.orm-entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Column()
    username: string;

    @Column()

    password: string;
    @OneToMany(() => TodoEntity, todo => todo.user)
    todos: TodoEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

