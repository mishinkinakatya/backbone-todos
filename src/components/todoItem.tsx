import * as React from "react";
import {TASK_STATE} from "../const";
import "../style/todoItem.css";
import {Task, TaskStatus} from "./task";


export interface TodoItemProps {
    todo: Task,
    onTaskChange: (todo: Task) => void,
}

interface TodoItemState {
    currentState: string,
    currentTask: string,
}

class TodoItem extends React.PureComponent<TodoItemProps, TodoItemState> {
    state: TodoItemState;

    constructor(props: TodoItemProps) {
        super(props);

        this.state = {
            currentState: TASK_STATE.READ,
            currentTask: this.props.todo.task,
        };
    }

    render() {
        const {todo} = this.props;
        const {currentState, currentTask} = this.state;

        return (
            <li className="todo-item">
                {currentState === TASK_STATE.EDIT
                    ? <div>
                        <input
                            className="edit-task"
                            type="text"
                            onChange={this._handleTaskTextChange}
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
                            onDoubleClick={this._handleDoubleClickOnTask}>{todo.task}</label>
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

    _handleTaskTextChange = (evt: React.ChangeEvent<HTMLInputElement>) => {

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
                    task: this.state.currentTask,
                };
        }

        if (newCurrentTask != undefined) {
            onTaskChange(newCurrentTask);
            this.setState({
                currentState: TASK_STATE.READ,
                currentTask: todo.task
            });
        }
    }

    _handleDeleteButtonClick = () => {
        const {onTaskChange} = this.props;

        onTaskChange(null);
    }

    _handleDoubleClickOnTask = () => {
        this.setState({
            currentState: TASK_STATE.EDIT,
        });
    }
}

export default TodoItem;
