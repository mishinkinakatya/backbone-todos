import * as React from "react";
import TodoItem from "./todoItem";

interface TaskType {
    id: number,
    task: string,
    status: string,
}

interface PropsTypes {
    todoTasks: TaskType[],
    onTaskChange: (id: number, taskText: string) => void,
    onTaskChecked: (id: number) => void,
    onDeleteButtonClick: (id: number) => void,
    onTaskKeyDown: (todo: TaskType, oldTodo: TaskType, taskKey: string) => void
};

const TodoList: React.FC<PropsTypes> = (props) => {
    const {todoTasks, onTaskChange, onTaskChecked, onDeleteButtonClick, onTaskKeyDown} = props;

    return (
        <ul>
            {todoTasks.map((todo ) => {
                return (
                    <TodoItem key={todo.id} todo={todo} onTaskChange={onTaskChange} onTaskChecked={onTaskChecked} onDeleteButtonClick={onDeleteButtonClick} onTaskKeyDown={onTaskKeyDown} />
                )
            })
            }
        </ul>
    )
}


export default TodoList;
