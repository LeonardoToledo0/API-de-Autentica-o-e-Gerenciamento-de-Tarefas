/* eslint-disable prettier/prettier */
import {
    Controller,
    Post,
    Body,
    UnauthorizedException,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBody,
} from '@nestjs/swagger';

import { AuthService } from 'src/domain/auth/service/auth.service';
import { UserService } from 'src/domain/user/service/user.service';
import { User } from 'src/domain/user/entities/user.entity';
import { LoginDto } from 'src/domain/auth/dtos/auth.user.dto';
import { CreateUserDTO } from 'src/application/user/dtos/create-user.dto';



class LoginResponseDto {
    access_token!: string;
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) { }

    @Post('login')
    @ApiOperation({ summary: 'User login' })
    @ApiBody({ type: LoginDto })
    @ApiResponse({
        status: 200,
        description: 'User logged in successfully',
        type: LoginResponseDto,
    })
    @ApiResponse({ status: 401, description: 'Invalid credentials' })
    async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
        const user = await this.authService.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return this.authService.login(user);
    }

    @Post('user')
    @ApiOperation({ summary: 'Create a new user' })
    @ApiBody({ type: CreateUserDTO })
    @ApiResponse({ status: 201, description: 'User created successfully.', type: User })
    async create(@Body() createUserDto: CreateUserDTO): Promise<User> {
        return this.userService.createUser(createUserDto);
    }
}
