/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../user/entities/user.orm-entity";
import { TodoEntity } from "../todo/entities/todo.orm-entity";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => ({
                type: 'mysql',
                host: config.get<string>('DB_HOST'),
                port: +config.get('DB_PORT'),
                username: config.get<string>('DB_USERNAME'),
                password: config.get<string>('DB_PASSWORD'),
                database: config.get<string>('DB_DATABASE'),
                entities: [UserEntity, TodoEntity],
                synchronize: true,
            }),
            inject: [ConfigService],
        }),
    ],
    exports: [TypeOrmModule],
})
export class DatabaseModule { }
