import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TodoList from './Components/todoList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<TodoList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;