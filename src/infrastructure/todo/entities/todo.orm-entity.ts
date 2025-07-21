/* eslint-disable prettier/prettier */
import { UserEntity } from '../../../../src/infrastructure/user/entities/user.orm-entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity("todos")
export class TodoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({ type: 'text', nullable: true })
    description?: string | null;

    @Column({ default: false })
    completed: boolean;

    @ManyToOne(() => UserEntity, (user: UserEntity) => user.todos, { onDelete: 'CASCADE' })
    user: UserEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
