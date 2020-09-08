import React, {PureComponent} from "react";
import {TASK_STATUS, TASK_STATE} from "../const";


class TodoItem extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            currentState: TASK_STATE.READ,
            oldTodo: Object.assign({}, this.props.todo),
        };

        this._handleDoubleClickOnTask = this._handleDoubleClickOnTask.bind(this);
    }

    render() {
        const {onTaskChecked, onDeleteButtonClick, todo, onTaskChange, onTaskKeyDown, onTaskBlur} = this.props;
        const {currentState, oldTodo} = this.state;

        return (
            <li type="none"
            onBlur={() => {
                console.log(2)
                onTaskBlur(todo);
                this.setState({
                    currentState: TASK_STATE.READ,
                })
            }}>
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
