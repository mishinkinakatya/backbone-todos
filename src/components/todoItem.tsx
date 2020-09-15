import * as React from "react";
import "../style/todoItem.css";
import {Task, TaskStatus} from "./task";

export interface TodoItemProps {
    todo: Task,
    onTaskChange: (todo: Task) => void,
    onTaskDelete: (todo: Task) => void,
}

export enum TodoState {
    Edit,
    Read
}

interface TodoItemState {
    currentState: TodoState,
    currentTask: string,
}

class TodoItem extends React.PureComponent<TodoItemProps, TodoItemState> {
    state: TodoItemState;

    constructor(props: TodoItemProps) {
        super(props);

        this.state = {
            currentState: TodoState.Read,
            currentTask: this.props.todo.description,
        };
    }

    render(): JSX.Element {
        const {todo} = this.props;
        const {currentState, currentTask} = this.state;

        return (
            <li className="todo-item">
                {currentState === TodoState.Edit
                    ? <input
                            className="todo-item-edit"
                            type="text"
                            onChange={this._handleTaskDescriptionChange}
                            value={currentTask}
                            onKeyDown={this._handleTaskKeyDown}
                        />
                    :
                    <div className="todo-item-read">
                        <input className="todo-item-check" type="checkbox" checked={todo.status === TaskStatus.Completed}
                               onChange={this._handleTaskStatusChange}/>
                        <label
                            className={`${todo.status === TaskStatus.Completed ? `todo-item-label-completed` : `todo-item-label`}`}
                            onDoubleClick={this._handleDoubleClickOnTask}>{todo.description}</label>
                        <button className="todo-item-delete" onClick={this._handleDeleteButtonClick}>×</button>
                    </div>
                }
            </li>
        )
    }

    _handleTaskStatusChange = (): void => {
        const {todo, onTaskChange} = this.props;

        const newTask = {
            ...todo,
            status: todo.status === TaskStatus.Completed ? TaskStatus.Uncompleted : TaskStatus.Completed
        };

        onTaskChange(newTask);
    }

    _handleTaskDescriptionChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({currentTask: evt.target.value});
    }

    _handleTaskKeyDown = (evt: React.KeyboardEvent): void => {
        const {todo, onTaskChange} = this.props;

        const isEnterKey: boolean = evt.key === `Enter`;
        const isEscKey: boolean = evt.key === `Esc` || evt.key === `Escape`;

        let newCurrentTask;
        if (isEscKey) {
            newCurrentTask = todo;
        }
        if (isEnterKey) {
            newCurrentTask = {
                ...todo,
                description: this.state.currentTask,
            };
        }

        if (newCurrentTask != undefined) {
            onTaskChange(newCurrentTask);
            this.setState({
                currentState: TodoState.Read,
                currentTask: newCurrentTask.description
            });
        }
    }

    _handleDeleteButtonClick = (): void => {
        const {todo, onTaskDelete} = this.props;

        onTaskDelete(todo);
    }

    _handleDoubleClickOnTask = (): void => {
        this.setState({
            currentState: TodoState.Edit,
        });
    }
}

export default TodoItem;
