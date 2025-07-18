/* eslint-disable prettier/prettier */
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { IUserRepository } from 'src/domain/user/repository/user.repository.interface';
import { UserEntity } from '../entities/user.orm-entity';
import { User } from '../../../domain/user/entities/user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly repo: Repository<UserEntity>,
    ) { }

    async create(user: User): Promise<User> {
        const userEntity = this.fromDomain(user);
        const saved = await this.repo.save(userEntity);
        return this.toDomain(saved);
    }

    async findById(id: string): Promise<User | null> {
        const userEntity = await this.repo.findOne({ where: { id } });
        if (!userEntity) return null;
        return this.toDomain(userEntity);
    }


    async findAll(): Promise<User[]> {
        const usersEntity = await this.repo.find();
        return usersEntity.map((entity) => this.toDomain(entity));
    }

    async update(user: User): Promise<User> {
        const userEntity = this.fromDomain(user);
        await this.repo.update(user.id, userEntity);
        const updated = await this.repo.findOne({ where: { id: user.id } });
        if (!updated) throw new Error('User not found');
        return this.toDomain(updated);
    }

    async delete(id: string): Promise<void> {
        const result = await this.repo.delete(id);
        console.log('Resultado do delete:', result);

        if (result.affected === 0) {
            throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
        }
    }


    async findByEmail(email: string): Promise<User | null> {
        const userEntity = await this.repo.findOne({ where: { email } });
        if (!userEntity) return null;
        return this.toDomain(userEntity);
    }

    private toDomain(userEntity: UserEntity): User {
        return new User(
            userEntity.id,
            userEntity.email,
            userEntity.username,
            userEntity.password,
            userEntity.createdAt,
            userEntity.updatedAt,
        );
    }

    private fromDomain(user: User): UserEntity {
        const entity = new UserEntity();
        entity.id = user.id;
        entity.email = user.email;
        entity.username = user.username;
        entity.password = user.password;
        entity.createdAt = user.createdAt;
        entity.updatedAt = user.updatedAt;
        return entity;
    }
}
