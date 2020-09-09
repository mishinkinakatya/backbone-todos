import * as React from "react";
import {TASK_STATUS, TASK_STATE} from "../const";


interface TaskType {
    id: number,
    task: string,
    status: string,
}

interface PropsTypes {
    todo: TaskType,
    onTaskChecked: (id: number) => void,
    onDeleteButtonClick: (id: number) => void,
    onTaskChange:  (id: number, taskText: string) => void,
    onTaskKeyDown: (todo: TaskType, oldTodo: TaskType, taskKey: string) => void
};

interface StateTypes {
    currentState: string,
    oldTodo: TaskType,
};

class TodoItem extends React.PureComponent<PropsTypes, StateTypes> {
    state: StateTypes;

    constructor(props: PropsTypes) {
        super(props);

        this.state = {
            currentState: TASK_STATE.READ,
            oldTodo: Object.assign({}, this.props.todo),
        };

        this._handleDoubleClickOnTask = this._handleDoubleClickOnTask.bind(this);
    }

    render() {
        const {onTaskChecked, onDeleteButtonClick, todo, onTaskChange, onTaskKeyDown} = this.props;
        const {currentState, oldTodo} = this.state;

        return (
            <li>
                {currentState === TASK_STATE.EDIT
                    ? <div>
                        <input
                            type="text"
                            onChange={(evt) => onTaskChange(todo.id, evt.target.value)}
                            value={todo.task}
                            onKeyDown={(evt) => {
                                const isEnterKey = evt.key === `Enter`;
                                const isEscKey = evt.key === `Esc` || evt.key === `Escape`;

                                onTaskKeyDown(todo, oldTodo, evt.key);

                                isEnterKey || isEscKey ?
                                    this.setState({
                                        currentState: TASK_STATE.READ,
                                    }) : ``;
                            }}
                        />
                    </div>
                    :
                    <div>
                        <input type="checkbox" checked={todo.status === TASK_STATUS.COMPLETED} onChange={() => onTaskChecked(todo.id)}></input>
                        <label onDoubleClick={this._handleDoubleClickOnTask}>{todo.task}</label>
                        <button onClick={() => onDeleteButtonClick(todo.id)}>Delete</button>
                    </div>
                }
            </li>
        )
    }

    _handleDoubleClickOnTask() {
        this.setState({
            currentState: TASK_STATE.EDIT,
        });
    }
}

export default TodoItem;
