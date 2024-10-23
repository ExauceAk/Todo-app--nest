import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from 'src/todos/interfaces/todo.interface';
import { CreateTodoDto } from './dto/create-todos.dto';

@Injectable()
export class TodosService {
     todos : Todo[] = [
        {
            id: 1,
            title: 'todo1',
            description: 'todo1 description',
            done: false,
        },
        {
            id: 2,
            title: 'todo2',
            description: 'todo2 description',  
            done: true,
        },
        {
            id: 3,
            title: 'todo3',
            description: 'todo3 description',
            done: false,
        },
    ];

    findAll(): Todo[] {
        return this.todos;
    }

    createTodo(newTodo: CreateTodoDto) {
        this.todos = [...this.todos, newTodo];
    }

    findOne(id: string): Todo {
        return this.todos.find(todo => todo.id === Number(id));
    }

    updateTodo(id: string, newTodo: CreateTodoDto) { 
        const todoToUpdate = this.todos.find(todo => todo.id === +id);

        if (!todoToUpdate) {
            return new NotFoundException('Todo not found');
        }

        if (newTodo.hasOwnProperty('done')) {
            todoToUpdate.done = newTodo.done;
        }

        if (newTodo.title) {
            todoToUpdate.title = newTodo.title;
        }

        if (newTodo.description) {
            todoToUpdate.description = newTodo.description;
        }

        const updatedTodos = this.todos.map(todo => todo.id !== +id ? todo : todoToUpdate);

        this.todos = updatedTodos;

        return {updatedTodos: 1, todo: todoToUpdate}; 
        

    }

    deleteTodo(id: string) {
        const nbTodoBeforeDelete = this.todos.length;
        this.todos = [...this.todos.filter(todo => todo.id !== +id)];
        if (this.todos.length < nbTodoBeforeDelete) {
            return {deletedTodos: 1, nbTodos : this.todos.length};
        } else {
            return {deletedTodos: 0, nbTodos : this.todos.length};
        }    }
}
