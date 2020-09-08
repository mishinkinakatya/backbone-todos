import * as React from "react";
import Footer from "./footer";
import Filter from "./filter";
import TodoList from "./todolist";
import {TASK_STATUS} from "../const";


interface StateTypes {
    todoTasks: {}[],
    isAllChecked: boolean,
    activeFilter: string,
    currentTask: object,
    newTask: object,
};


class App extends React.PureComponent<StateTypes> {
    constructor(props) {
        super(props);

        this.state = {
            todoTasks: this.props.todoTasks,
            isAllChecked: false,
            activeFilter: TASK_STATUS.ALL,
            currentTask: null,
            newTask: null,
        };

        this._handleTaskChecked = this._handleTaskChecked.bind(this);
        this._handleTaskChange = this._handleTaskChange.bind(this);
        this._handleFilterClick = this._handleFilterClick.bind(this);
        this._handleCheckedAllTasksClick = this._handleCheckedAllTasksClick.bind(this);
        this._handleClearCompletedClick = this._handleClearCompletedClick.bind(this);
        this._handleNewTaskEnterDown = this._handleNewTaskEnterDown.bind(this);
        this._handleDeleteButtonClick = this._handleDeleteButtonClick.bind(this);
        this._handleTaskKeyDown = this._handleTaskKeyDown.bind(this);
        this._handleTaskBlur = this._handleTaskBlur.bind(this);
        this._handleNewTaskChange = this._handleNewTaskChange.bind(this);
    }

    render() {
        const {todoTasks, isAllChecked, activeFilter, newTask} = this.state;
        const countOfActiveTasks = todoTasks.filter((todo) => todo.status === TASK_STATUS.ACTIVE).length;
        const tasksOfActiveFilter = activeFilter === TASK_STATUS.ALL ? todoTasks : todoTasks.filter((todo) => todo.status === activeFilter);
        const isCompletedTasks = todoTasks.filter((todo) => todo.status === TASK_STATUS.COMPLETED).length > 0;

        return (
            <div>
                <h1>todos</h1>
                <input type="checkbox" checked={isAllChecked} onChange={this._handleCheckedAllTasksClick} />
                <input placeholder="What needs to be done?" onKeyDown={this._handleNewTaskEnterDown} onChange={this._handleNewTaskChange} value={newTask ? newTask.task : ``}></input>
                <TodoList todoTasks={tasksOfActiveFilter} onTaskChecked={this._handleTaskChecked} onTaskChange={this._handleTaskChange} onTaskKeyDown={this._handleTaskKeyDown} onDeleteButtonClick={this._handleDeleteButtonClick} onTaskBlur={this._handleTaskBlur} />
                <div>
                    <span>{countOfActiveTasks}</span> {countOfActiveTasks === 1 ? `item` : `items`} left
                    <Filter activeFilter={activeFilter} onFilterClick={this._handleFilterClick} />
                    {
                        isCompletedTasks ?
                            <span><a href="#" onClick={this._handleClearCompletedClick}>Clear completed</a></span> :
                            ``
                    }
                </div>
                <Footer />
            </div>
        );
    }

    changeTaskStatus(task) {
        const newStatus = task.status === TASK_STATUS.COMPLETED ? TASK_STATUS.ACTIVE : TASK_STATUS.COMPLETED;
        const newTask = Object.assign({}, task, {
            status: newStatus,
        });

        return newTask;
    }

    _handleTaskChecked(id) {
        const {todoTasks} = this.state;

        const todo = todoTasks.find((todoTask) => todoTask.id === id);
        const todoIndex = todoTasks.findIndex((todoTask) => todoTask.id === id);
        const newTodoTasks = [].concat(todoTasks.slice(0, todoIndex), this.changeTaskStatus(todo), todoTasks.slice(todoIndex + 1));

        this.setState({todoTasks: newTodoTasks})
    }

    _handleTaskChange(id, taskText) {
        const {todoTasks} = this.state;

        const todo = todoTasks.find((todoTask) => todoTask.id === id);
        const todoIndex = todoTasks.findIndex((todoTask) => todoTask.id === id);

        const newTask = Object.assign({}, todo, {
            task: taskText,
        });

        const newTodoTasks = [].concat(todoTasks.slice(0, todoIndex), newTask, todoTasks.slice(todoIndex + 1));

        this.setState({todoTasks: newTodoTasks})
    }

    _handleTaskKeyDown(todo, oldTodo, taskKey) {
        const isEnterKey = taskKey === `Enter`;
        const isEscKey = taskKey === `Esc` || taskKey === `Escape`;

        const newCurrentTask = (isEscKey && oldTodo) || (isEnterKey && todo);

        if (isEnterKey || isEscKey) {
            this._handleTaskChange(todo.id, newCurrentTask.task);
        }
    }

    _handleTaskBlur(todo) {
        this._handleTaskChange(todo.id, todo.task);
    }

    _handleFilterClick(filterName) {
        this.setState({activeFilter: filterName});
    }

    _handleCheckedAllTasksClick() {
        const {todoTasks, isAllChecked} = this.state;

        const newStatus = isAllChecked ? TASK_STATUS.ACTIVE : TASK_STATUS.COMPLETED;
        const newTodoTasks = todoTasks.map((todo) => Object.assign({}, todo, {
            status: newStatus,
        }));

        this.setState({
            isAllChecked: !this.state.isAllChecked,
            todoTasks: newTodoTasks
        });
    }

    _handleClearCompletedClick() {
        const {todoTasks} = this.state;

        const newTodoTasks = todoTasks.filter((todo) => todo.status === TASK_STATUS.ACTIVE);

        this.setState({
            todoTasks: newTodoTasks,
            isAllChecked: false
        });
    }

    _handleNewTaskEnterDown(evt) {
        const {todoTasks, newTask} = this.state;
        const isEnterKey = evt.key === `Enter`;

        const newTodoTasks = isEnterKey && newTask !== null ? [].concat(todoTasks, newTask) : todoTasks;

        if (isEnterKey) {
            this.setState({
                todoTasks: newTodoTasks,
                newTask: null
            });
        }
    }


    _handleNewTaskChange(evt) {
        const {todoTasks} = this.state;

        this.setState({
            newTask: {
                id: todoTasks.length + 1,
                task: evt.target.value,
                status: TASK_STATUS.ACTIVE,
            },
        });
    }

    _handleDeleteButtonClick(id) {
        const {todoTasks} = this.state;

        const newTodoTasks = todoTasks.filter((todo) => todo.id !== id);

        this.setState({todoTasks: newTodoTasks});
    }
}

export default App;
