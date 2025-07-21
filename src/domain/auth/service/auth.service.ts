/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../../../../src/domain/user/service/user.service';
import { User } from '../../../../src/domain/user/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string): Promise<Omit<User, 'password'> | null> {
        const user = await this.userService.findUserByEmail(email);
        if (user?.password && (await bcrypt.compare(pass, user.password))) {
            const { password: _password, ...result } = user;
            return result;
        }
        return null;
    }
    async login(user: Pick<User, 'id' | 'email' | 'username'>): Promise<{ access_token: string }> {
        const payload = {
            sub: user.id,
            email: user.email,
            username: user.username,
        };

        const access_token = await this.jwtService.signAsync(payload);

        return { access_token };
    }




}
