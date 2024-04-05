import { makeAutoObservable, observable, runInAction } from 'mobx';

export interface Data {
    todos: Todo[];
    skip: number;
    total: number;
}

export interface Todo {
    id: number;
    todo: string;
    completed: boolean;
    userId: number;
}

class ToDoStore {
    todos: Todo[] = [];
    isLoading = false;
    async getTodos() {
        this.isLoading = true;
        try {
            const response = await fetch('https://dummyjson.com/todos');
            const data: Data = await response.json();
            this.todos = data.todos;
            this.isLoading = false;
        } catch (error) {
            runInAction(() => {
                console.error("Ошибка при получении данных: ", error);
                this.isLoading = false;
            });
        }
    }
    constructor() {
        makeAutoObservable(this);
    }

    getTodoById(id: number): Todo | undefined {
        return this.todos.find(todo => todo.id === id);
    }

    get completedTodosCount() {
        return this.todos.filter(
            todo => todo.completed === true).length;
    }
    updateTodoById(id: number, newTodoText: string) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo)
            todo.todo = newTodoText;
    }

    private report(): string {
        if (this.todos.length === 0)
            return "None";
        return `Следующая задача: ${this.todos[0].todo}.`.concat(`Прогресс: ${this.completedTodosCount} / ${this.todos.length}`);
    }
}
export const toDoStore = observable(new ToDoStore());