import React, { useEffect, useState } from 'react';
import { Todo } from '../Stores/toDoStore'
import { InputBar } from './InputBar';
import { AddTodoButton } from './AddTodoButton';
import { useStore } from '../Stores/mainStore';
import { Button, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { runInAction } from 'mobx';

const TodoList: React.FC = (() => {
    const [todos, setTodos] = useState<string[]>([]);
    const { toDoStore } = useStore();
    const [inputValue, setInputValue] = useState<string>('');
    useEffect(() => {
        // Попытка загрузить задачи из localStorage при монтировании компонента
        const todoFromLocalStorage = localStorage.getItem('todos');
        if (todoFromLocalStorage) {
            // console.log("todoFromLocalStorage");
            const loadedTodos = JSON.parse(todoFromLocalStorage) as Todo[];
            runInAction(() => {
                toDoStore.todos = loadedTodos;
            });
            setTodos(loadedTodos.map(todo => todo.todo)); // Синхронизация состояния компонента
        } else {
            // console.log("todo from API");
            toDoStore.getTodos().then(() => {
                setTodos(toDoStore.todos.map(todo => todo.todo)); // Синхронизация после загрузки
                localStorage.setItem('todos', JSON.stringify(toDoStore.todos));
            });
        }
        return () => {
            // console.log("toDoStore.todos will unmount: ", toDoStore.todos);
            localStorage.setItem('todos', JSON.stringify(toDoStore.todos));
            if (localStorage.getItem('todos')?.length === 0) {
                localStorage.clear();
                // console.log("cleared");
            }
        }
    }, [toDoStore]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };
    const handleAddTodo = () => {
        if (inputValue.trim() !== '') {
            setInputValue('');
            const newId = Date.now();
            const todo: Todo = {
                id: newId,
                todo: inputValue,
                completed: false,
                userId: newId
            };
            toDoStore.todos.unshift(todo);
        }
    };
    const handleDeleteTodo = (index: number) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
        const deletindTodo = toDoStore.getTodoById(index)?.id;
        toDoStore.todos = toDoStore.todos.filter(todo => todo.id !== deletindTodo);
        console.log("toDoStore.todos after delete: ", toDoStore.todos);
    };
    if (toDoStore.isLoading) {
        return <div>Загрузка...</div>;
    };
    console.log("todos: ", toDoStore.todos);
    return (
        <div>
            <h1>ToDo List</h1>
            <InputBar
                onChangeInput={handleInputChange}
                inputValue={inputValue} />
            <AddTodoButton handleAddTodo={() => handleAddTodo()} />
            <ol>
                <Stack spacing={2} justifyContent="center">
                    {toDoStore.todos.map((todo: Todo) => (
                        <li key={todo.id}>
                            <Stack direction="row" spacing={2}>
                                <div>{todo.todo ?? ""}</div>
                                <Button variant="outlined" style={{ justifyContent: "center" }} startIcon={<DeleteIcon />} onClick={() => handleDeleteTodo(todo.id)}>Удалить</Button>
                            </Stack>
                        </li>
                    ))}
                </Stack>
            </ol>
        </div>
    );
});

export default TodoList;
