import { Button } from "@mui/material";
import { useState } from "react";
import { Todo, toDoStore } from "../Stores/toDoStore";

interface AddTodoButtonProps {
    handleAddTodo: () => void;
}

export const AddTodoButton: React.FC<AddTodoButtonProps> = ({ handleAddTodo }) => {
    return (
        <Button onClick={handleAddTodo}>Добавить задачу</Button>
    );
}