/* eslint-disable prettier/prettier */
import { Controller, Get, Put, Delete, Body, Param, NotFoundException, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

import { UpdateUserDTO } from '../../../../src/application/user/dtos/update-user.dto';
import { UserService } from '../../../../src/domain/user/service/user.service';
import { User } from '../../../../src/domain/user/entities/user.entity';
import { JwtAuthGuard } from '../../../../src/domain/auth/guards/jwt-auth.guard';


@ApiBearerAuth('Authorization')
@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
    constructor(private readonly userService: UserService) { }


    @Get(':id')
    @ApiOperation({ summary: 'Find a user by ID' })
    @ApiParam({ name: 'id', description: 'User ID' })
    @ApiResponse({ status: 200, description: 'User found', type: User })
    @ApiResponse({ status: 404, description: 'User not found' })
    async findOne(@Param('id') id: string) {
        const user = await this.userService.findUserById(id);
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'List of users', type: [User] })
    async findAll() {
        return this.userService.findAllUsers();
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a user' })
    @ApiParam({ name: 'id', description: 'User ID' })
    @ApiBody({ type: UpdateUserDTO })
    @ApiResponse({ status: 200, description: 'User updated', type: User })
    @ApiResponse({ status: 404, description: 'User not found' })
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDTO) {
        const user = await this.userService.updateUser(id, updateUserDto);
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a user' })
    @ApiParam({ name: 'id', description: 'User ID' })
    @ApiResponse({ status: 200, description: 'User deleted successfully' })
    async remove(@Param('id') id: string) {
        await this.userService.deleteUser(id);
        return { message: 'User deleted successfully' };
    }

}
