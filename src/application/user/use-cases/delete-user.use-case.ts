/* eslint-disable prettier/prettier */

import { IUserRepository } from "src/domain/user/repository/user.repository.interface";


export class DeleteUserUseCase {
    constructor(private userRepository: IUserRepository) { }

    async execute(id: string): Promise<void> {
        return this.userRepository.delete(id);
    }
}
