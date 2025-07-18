/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { CreateUserUseCase } from '../../../application/user/use-cases/create-user.use-case';
import { FindUserUseCase } from '../../../application/user/use-cases/find-user.use-case';
import { UpdateUserUseCase } from '../../../application/user/use-cases/update-user.use-case';
import { DeleteUserUseCase } from '../../../application/user/use-cases/delete-user.use-case';
import { IUserRepository } from 'src/domain/user/repository/user.repository.interface';
import { CreateUserDTO } from '../../../application/user/dtos/create-user.dto';
import { UpdateUserDTO } from '../../../application/user/dtos/update-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @Inject('IUserRepository')
        private readonly userRepository: IUserRepository,
    ) { }

    createUser(createUserDto: CreateUserDTO) {
        const useCase = new CreateUserUseCase(this.userRepository);
        return useCase.execute(createUserDto);
    }

    findUserById(id: string) {
        const useCase = new FindUserUseCase(this.userRepository);
        return useCase.execute(id);
    }

    findAllUsers() {
        return this.userRepository.findAll();
    }

    updateUser(id: string, updateUserDto: UpdateUserDTO) {
        const useCase = new UpdateUserUseCase(this.userRepository);
        return useCase.execute(id, updateUserDto);
    }

    deleteUser(id: string) {
        const useCase = new DeleteUserUseCase(this.userRepository);
        return useCase.execute(id);
    }
    async findUserByEmail(email: string): Promise<User | null> {
        return this.userRepository.findByEmail(email);
    }
}
