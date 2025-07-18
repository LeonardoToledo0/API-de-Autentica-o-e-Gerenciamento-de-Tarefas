/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/infrastructure/user/entities/user.orm-entity';
import { UserRepository } from 'src/infrastructure/user/repositories/user.repository';

import { UserController } from 'src/interfaces/controllers/user/user.controller';
import { UserService } from '../service/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
  exports: [UserService, 'IUserRepository'],
})
export class UserModule { }

