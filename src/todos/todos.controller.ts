import { Body, Controller , Delete, Get , Param, Patch, Post } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from 'src/todos/interfaces/todo.interface';
import { CreateTodoDto } from './dto/create-todos.dto';

@Controller('todos')
export class TodosController {

    constructor(private readonly todosService: TodosService) {}
    @Get()
    findAll() : Todo[] {
        return this.todosService.findAll() ;
    }

    @Post()
    createTodo(@Body() newTodo: CreateTodoDto) {
        console.log("newTodo",newTodo)
        this.todosService.createTodo(newTodo);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.todosService.findOne(id);
    }

    @Patch(':id')
    updateTodo(@Param('id') id: string, @Body() newTodo: CreateTodoDto) {
        return this.todosService.updateTodo(id ,newTodo );
    }

    @Delete(':id')
    deleteTodo(@Param('id') id: string) {
        return this.todosService.deleteTodo(id);
    }

}