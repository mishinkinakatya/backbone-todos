import * as React from "react";
import Footer from "./footer";
import Filter from "./filter";
import TodoList from "./todolist";
import {FILTER_TYPE} from "../const";
import '../style/app.css';
import {Task, TaskStatus} from "./task";


interface AppState {
    activeFilter: string,
    newTask: Task | null,
}

export interface AppProps {
    todoTasks: Task[],
    onChangeTodoTasks: (newTasks: Task[]) => void,
}

class App extends React.PureComponent<AppProps, AppState> {
    state: AppState;

    constructor(props: AppProps) {
        super(props);

        this.state = {
            activeFilter: FILTER_TYPE.ALL,
            newTask: null,
        };
    }

    render(): JSX.Element {
        const {activeFilter, newTask} = this.state;
        const {todoTasks} = this.props

        const countOfActiveTasks = todoTasks.filter((todo) => todo.status === TaskStatus.Uncompleted).length;
        const tasksOfActiveFilter = activeFilter === FILTER_TYPE.ACTIVE ? todoTasks.filter((todo) => todo.status === TaskStatus.Uncompleted) : activeFilter === FILTER_TYPE.COMPLETED ? todoTasks.filter((todo) => todo.status === TaskStatus.Completed) : todoTasks;
        const isCompletedTasks = todoTasks.filter((todo) => todo.status === TaskStatus.Completed).length > 0;

        return (
            <div>
                <h1 className="header">todos</h1>
                <div className="workspace">
                    <section className="new-task">
                        <input className="check-all-button" type="checkbox"
                               checked={todoTasks.every((task) => task.status === TaskStatus.Completed)}
                               onChange={this._handleCheckedAllTasks}/>
                        <input className="new-task-field" type="text" placeholder="What needs to be done?"
                               onKeyDown={this._handleNewTaskEnterDown}
                               onChange={this._handleNewTaskChange} value={newTask ? newTask.description : ``}/>
                    </section>
                    <TodoList todoTasks={tasksOfActiveFilter} onTaskChange={this._handleTaskChange}
                              onTaskDelete={this._handleTaskDelete}/>
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

    // NewTask
    _handleCheckedAllTasks = (): void => {
        const {todoTasks, onChangeTodoTasks} = this.props;

        const isAllChecked = todoTasks.every((task) => task.status === TaskStatus.Completed);

        const changeTaskStatus = (todo: Task) => {
            return isAllChecked ? {
                    ...todo,
                    status: TaskStatus.Uncompleted,
                } :
                {
                    ...todo,
                    status: TaskStatus.Completed,
                }
        }
        onChangeTodoTasks(todoTasks.map((todo) => changeTaskStatus(todo)));
    }

    _handleNewTaskChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
        const {todoTasks} = this.props;

        this.setState({
            newTask: {
                id: todoTasks.length + 1,
                description: evt.target.value,
                status: TaskStatus.Uncompleted,
            },
        });
    }

    _handleNewTaskEnterDown = (evt: React.KeyboardEvent): void => {
        const {newTask} = this.state;
        const {todoTasks, onChangeTodoTasks} = this.props;

        if (evt.key === `Enter` && newTask !== null) {
            onChangeTodoTasks([...todoTasks, newTask]);
            this.setState({
                newTask: null,
            });
        }
    }

    // TaskList
    _handleTaskChange = (newTask: Task): void => {
        const {todoTasks, onChangeTodoTasks} = this.props;

        const todoIndex = todoTasks.findIndex((todoTask) => todoTask.id === newTask.id);

        onChangeTodoTasks([...todoTasks.slice(0, todoIndex), newTask, ...todoTasks.slice(todoIndex + 1)]);
    }

    _handleTaskDelete = (task: Task): void => {
        const {todoTasks, onChangeTodoTasks} = this.props;

        const todoIndex = todoTasks.findIndex((todoTask) => todoTask.id === task.id);

        onChangeTodoTasks([...todoTasks.slice(0, todoIndex), ...todoTasks.slice(todoIndex + 1)]);
    }

    // Footer
    _handleFilterClick = (filterName: string): void => {
        this.setState({activeFilter: filterName});
    }

    _handleClearCompletedClick = (): void => {
        const {todoTasks, onChangeTodoTasks} = this.props;

        onChangeTodoTasks([...todoTasks.filter((todo) => todo.status === TaskStatus.Uncompleted)]);
    }
}

export default App;
