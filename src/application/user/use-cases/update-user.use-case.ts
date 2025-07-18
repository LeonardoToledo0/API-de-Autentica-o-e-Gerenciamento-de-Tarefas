/* eslint-disable prettier/prettier */

import { IUserRepository } from 'src/domain/user/repository/user.repository.interface';
import { User } from '../../../domain/user/entities/user.entity';
import * as bcrypt from 'bcrypt';

export class UpdateUserUseCase {
    constructor(private userRepository: IUserRepository) { }

    async execute(id: string, data: { email?: string; password?: string }): Promise<User | null> {
        const user = await this.userRepository.findById(id);
        if (!user) return null;

        if (data.email) user.email = data.email;
        if (data.password) user.password = await bcrypt.hash(data.password, 10);
        user.updatedAt = new Date();

        return this.userRepository.update(user);
    }
}
