/* eslint-disable prettier/prettier */
import { IUserRepository } from 'src/domain/user/repository/user.repository.interface';
import { User } from '../../../domain/user/entities/user.entity';

export class FindUserUseCase {
    constructor(private userRepository: IUserRepository) { }

    async execute(id: string): Promise<User | null> {
        return this.userRepository.findById(id);
    }
}
