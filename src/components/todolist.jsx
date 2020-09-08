import React from "react";
import TodoItem from "./todoItem.jsx";


const TodoList = (props) => {
    const {todoTasks, onTaskChange, onTaskChecked, onDeleteButtonClick, onTaskKeyDown, onTaskBlur} = props;

    return (
        <ul>
            {todoTasks.map((todo) => {
                return (
                    <TodoItem key={todo.id} todo={todo} onTaskChange={onTaskChange} onTaskChecked={onTaskChecked} onDeleteButtonClick={onDeleteButtonClick} onTaskKeyDown={onTaskKeyDown} onTaskBlur={onTaskBlur} />
                )
            })
            }
        </ul>
    )
}


export default TodoList;
