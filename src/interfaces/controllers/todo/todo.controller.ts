/* eslint-disable prettier/prettier */
import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Query,
    NotFoundException,
    UseGuards,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiQuery,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { TodoService } from 'src/domain/todo/service/todo.service';
import { Todo } from 'src/domain/todo/entities/todo.entity';
import { CreateTodoDTO } from 'src/application/todo/dtos/create-todo.dto';
import { UpdateTodoDTO } from 'src/application/todo/dtos/update-todo.dto';
import { JwtAuthGuard } from 'src/domain/auth/guards/jwt-auth.guard';


@ApiTags('Tasks')
@ApiBearerAuth('Authorization')
@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TodoController {
    constructor(private readonly todoService: TodoService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new tasks' })
    @ApiResponse({
        status: 201,
        description: 'Todo created successfully',
        type: Todo,
    })
    async create(@Body() createTodoDto: CreateTodoDTO): Promise<Todo> {
        const newTodo = new Todo(
            crypto.randomUUID(),
            createTodoDto.title,
            createTodoDto.description || null,
            false,
            new Date(),
            new Date(),
            createTodoDto.userId,
        );

        return this.todoService.create(newTodo);
    }


    @Get(':id')
    @ApiOperation({ summary: 'Get a tasks by ID' })
    @ApiResponse({ status: 200, description: 'Tasks found', type: Todo })
    @ApiResponse({ status: 404, description: 'Tasks not found' })
    async findOne(@Param('id') id: string): Promise<Todo> {
        const todo = await this.todoService.findById(id);
        if (!todo) throw new NotFoundException('Tasks not found');
        return todo;
    }

    @Get()
    @ApiOperation({ summary: 'Get all todos for a user' })
    @ApiQuery({ name: 'userId', required: true })
    @ApiQuery({ name: 'completed', required: false, type: Boolean })
    @ApiQuery({ name: 'skip', required: false, type: Number })
    @ApiQuery({ name: 'take', required: false, type: Number })
    async findAllByUser(
        @Query('userId') userId: string,
        @Query('completed') completed?: boolean,
        @Query('skip') skip = 0,
        @Query('take') take = 10,
    ): Promise<Todo[]> {
        return this.todoService.findAllByUser(userId, { completed }, { skip, take });
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a Tasks' })
    @ApiResponse({ status: 200, description: 'Tasks updated', type: Todo })
    @ApiResponse({ status: 404, description: 'Tasks not found' })
    async update(
        @Param('id') id: string,
        @Body() updateTodoDto: UpdateTodoDTO,
    ): Promise<Todo> {
        const existingTodo = await this.todoService.findById(id);
        if (!existingTodo) {
            throw new NotFoundException('Tasks not found');
        }

        if (updateTodoDto.title !== undefined) {
            existingTodo.title = updateTodoDto.title;
        }

        if (updateTodoDto.description !== undefined) {
            existingTodo.description = updateTodoDto.description;
        }

        if (updateTodoDto.completed !== undefined) {
            existingTodo.completed = updateTodoDto.completed;
        }

        existingTodo.updatedAt = new Date();

        return this.todoService.update(existingTodo);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a Tasks' })
    @ApiResponse({ status: 200, description: 'Tasksdeleted' })
    @ApiResponse({ status: 404, description: 'Tasks not found' })
    async remove(@Param('id') id: string): Promise<{ message: string }> {
        const existingTodo = await this.todoService.findById(id);
        if (!existingTodo) {
            throw new NotFoundException('Tasks not found');
        }

        await this.todoService.delete(id);
        return { message: 'Tasks deleted successfully' };
    }
}
