/* eslint-disable prettier/prettier */

import { IUserRepository } from 'src/domain/user/repository/user.repository.interface';
import { User } from '../../../domain/user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

export class CreateUserUseCase {
    constructor(private userRepository: IUserRepository) { }

    async execute(data: { email: string; password: string; username: string }): Promise<User> {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = new User(
            randomUUID(),
            data.email,
            data.username,
            hashedPassword,
            new Date(),
            new Date(),
        );
        return this.userRepository.create(user);
    }
}
