import * as React from "react";
import TodoItem from "./todoItem";
import "../style/todolist.css";
import {Task} from "./task";


export interface TodoListProps {
    todoTasks: Task[],
    onTaskChange: (todo: Task) => void,
    onTaskDelete: (todo: Task) => void,
}

const TodoList: React.FC<TodoListProps> = (props) => {
    const {todoTasks, onTaskChange, onTaskDelete} = props;

    return (
        <ul className="todo-list">
            {todoTasks.map((todo ) => {
                return (
                    <TodoItem key={todo.id} todo={todo} onTaskChange={onTaskChange} onTaskDelete={onTaskDelete}/>
                )
            })
            }
        </ul>
    )
}


export default TodoList;
