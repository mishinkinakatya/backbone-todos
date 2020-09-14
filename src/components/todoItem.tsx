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

    render() {
        const {todo} = this.props;
        const {currentState, currentTask} = this.state;

        return (
            <li className="todo-item">
                {currentState === TodoState.Edit
                    ? <div>
                        <input
                            className="edit-task"
                            type="text"
                            onChange={this._handleTaskDescriptionChange}
                            value={currentTask}
                            onKeyDown={this._handleTaskKeyDown}
                        />
                    </div>
                    :
                    <div>
                        <input className="check-button" type="checkbox" checked={todo.status === TaskStatus.Completed}
                               onChange={this._handleTaskStatusChange}/>
                        <label
                            className={`${todo.status === TaskStatus.Completed ? `label-field-completed` : `label-field`}`}
                            onDoubleClick={this._handleDoubleClickOnTask}>{todo.description}</label>
                        <button className="delete-button" onClick={this._handleDeleteButtonClick}>×</button>
                    </div>
                }
            </li>
        )
    }

    _handleTaskStatusChange = () => {
        const {todo, onTaskChange} = this.props;

        const newTask = {
            ...todo,
            status: todo.status === TaskStatus.Completed ? TaskStatus.Uncompleted : TaskStatus.Completed
        };

        onTaskChange(newTask);
    }

    _handleTaskDescriptionChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({currentTask: evt.target.value});
    }

    _handleTaskKeyDown = (evt: React.KeyboardEvent) => {
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

    _handleDeleteButtonClick = () => {
        const {todo, onTaskDelete} = this.props;

        onTaskDelete(todo);
    }

    _handleDoubleClickOnTask = () => {
        this.setState({
            currentState: TodoState.Edit,
        });
    }
}

export default TodoItem;
