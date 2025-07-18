/* eslint-disable prettier/prettier */
import { IUserRepository } from 'src/domain/user/repository/user.repository.interface';
import { User } from 'src/domain/user/entities/user.entity';

export class FindUserByEmailUseCase {
    constructor(private readonly userRepository: IUserRepository) { }

    async execute(email: string): Promise<User | null> {
        return this.userRepository.findByEmail(email);
    }
}
