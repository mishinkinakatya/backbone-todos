import * as React from "react";
import Footer from "./footer";
import Filter from "./filter";
import TodoList from "./todolist";
import {TASK_STATUS} from "../const";
import '../style/app.css';


interface TaskType {
    id: number,
    task: string,
    status: string,
}

interface AppStateTypes {
    todoTasks: TaskType[],
    isAllChecked: boolean,
    activeFilter: string,
    currentTask: TaskType | null,
    newTask: TaskType | null,
}

export interface AppPropsTypes {
    todoTasks: TaskType[],
}

class App extends React.PureComponent<AppPropsTypes, AppStateTypes> {
    state: AppStateTypes;

    constructor(props: AppPropsTypes) {
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
        this._handleNewTaskChange = this._handleNewTaskChange.bind(this);
    }

    render() {
        const {todoTasks, isAllChecked, activeFilter, newTask} = this.state;
        const countOfActiveTasks = todoTasks.filter((todo) => todo.status === TASK_STATUS.ACTIVE).length;
        const tasksOfActiveFilter = activeFilter === TASK_STATUS.ALL ? todoTasks : todoTasks.filter((todo) => todo.status === activeFilter);
        const isCompletedTasks = todoTasks.filter((todo) => todo.status === TASK_STATUS.COMPLETED).length > 0;

        return (
            <div>
                <h1 className="header">todos</h1>
                <div className="workspace">
                    <section className="new-task">
                        <input className="check-all-button" type="checkbox" checked={isAllChecked}
                               onChange={this._handleCheckedAllTasksClick}/>
                        <input className="new-task-field" type="text" placeholder="What needs to be done?"
                               onKeyDown={this._handleNewTaskEnterDown}
                               onChange={this._handleNewTaskChange} value={newTask ? newTask.task : ``}/>
                    </section>
                    <TodoList todoTasks={tasksOfActiveFilter} onTaskChecked={this._handleTaskChecked}
                              onTaskChange={this._handleTaskChange} onTaskKeyDown={this._handleTaskKeyDown}
                              onDeleteButtonClick={this._handleDeleteButtonClick}/>
                    <div className="info-block">
                    <span
                        className="items-count">{countOfActiveTasks} {countOfActiveTasks === 1 ? `item` : `items`} left</span>
                        <Filter activeFilter={activeFilter} onFilterClick={this._handleFilterClick}/>
                        {
                            isCompletedTasks ?
                                <span><a className="clear-button" href="#" onClick={this._handleClearCompletedClick}>Clear completed</a></span> :
                                ``
                        }
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }

    changeTaskStatus(task: TaskType) {
        const newStatus = task.status === TASK_STATUS.COMPLETED ? TASK_STATUS.ACTIVE : TASK_STATUS.COMPLETED;

        return {
            ...task,
            status: newStatus
        };
    }

    _handleTaskChecked(id: number) {
        const {todoTasks} = this.state;

        const todo = todoTasks.find((todoTask) => todoTask.id === id);
        if (todo == undefined) {
            throw new Error("InvalidProgramState")
        }
        const todoIndex = todoTasks.findIndex((todoTask) => todoTask.id === id);
        const newTodoTasks = [
            ...todoTasks.slice(0, todoIndex),
            this.changeTaskStatus(todo),
            ...todoTasks.slice(todoIndex + 1)
        ];
        this.setState({todoTasks: newTodoTasks})
    }

    _handleTaskChange(id: number, taskText: string) {
        const {todoTasks} = this.state;

        const todo = todoTasks.find((todoTask) => todoTask.id === id);
        const todoIndex = todoTasks.findIndex((todoTask) => todoTask.id === id);
        if (todo == undefined) {
            throw new Error("InvalidProgramState")
        }

        const newTask = {
            ...todo,
            task: taskText,
        };

        const newTodoTasks = [
            ...todoTasks.slice(0, todoIndex),
            newTask,
            ...todoTasks.slice(todoIndex + 1)
        ];

        this.setState({todoTasks: newTodoTasks})
    }

    _handleTaskKeyDown(todo: TaskType, oldTodo: TaskType, taskKey: string) {
        const isEnterKey: boolean = taskKey === `Enter`;
        const isEscKey: boolean = taskKey === `Esc` || taskKey === `Escape`;

        let newCurrentTask;
        if (isEscKey) {
            newCurrentTask = oldTodo;
        }
        if (isEnterKey) {
            newCurrentTask = todo;
        }

        if (newCurrentTask != undefined) {
            this._handleTaskChange(todo.id, newCurrentTask.task);
        }
    }

    _handleFilterClick(filterName: string) {
        this.setState({activeFilter: filterName});
    }

    _handleCheckedAllTasksClick() {
        const {todoTasks, isAllChecked} = this.state;

        const newStatus = isAllChecked ? TASK_STATUS.ACTIVE : TASK_STATUS.COMPLETED;
        const newTodoTasks = todoTasks.map((todo) => {
            return (
                {
                    ...todo,
                    status: newStatus,
                }
            )
        });

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

    _handleNewTaskEnterDown(evt: React.KeyboardEvent) {
        const {todoTasks, newTask} = this.state;
        const isEnterKey = evt.key === `Enter`;

        const newTodoTasks = isEnterKey && newTask !== null ? [...todoTasks, newTask] : todoTasks;

        if (isEnterKey) {
            this.setState({
                todoTasks: newTodoTasks,
                newTask: null
            });
        }
    }


    _handleNewTaskChange(evt: React.ChangeEvent<HTMLInputElement>) {
        const {todoTasks} = this.state;

        this.setState({
            newTask: {
                id: todoTasks.length + 1,
                task: evt.target.value,
                status: TASK_STATUS.ACTIVE,
            },
        });
    }

    _handleDeleteButtonClick(id: number) {
        const {todoTasks} = this.state;

        const newTodoTasks = todoTasks.filter((todo) => todo.id !== id);

        this.setState({todoTasks: newTodoTasks});
    }
}

export default App;
