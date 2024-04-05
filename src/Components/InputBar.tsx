import { TextField } from "@mui/material";

interface InputBarProps {
    onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inputValue: string;
}

export const InputBar: React.FC<InputBarProps> = ({ onChangeInput, inputValue }) => {
    return (
        <TextField
            label="Введите задачу"
            size="small"
            variant="outlined"
            type="text"
            value={inputValue}
            onChange={onChangeInput}
        />
    )
}