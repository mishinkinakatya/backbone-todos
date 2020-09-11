import * as React from "react";
import Footer from "./footer";
import Filter from "./filter";
import TodoList from "./todolist";
import {FILTER_TYPE} from "../const";
import '../style/app.css';
import {Task, TaskStatus} from "./task";
import {todoTasks} from "../mock";


interface AppState {
    activeFilter: string,
    newTask: Task | null,
}

export interface AppProps {
    todoTasks: Task[],
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

    render() {
        const {todoTasks} = this.props;
        const {activeFilter, newTask} = this.state;

        const countOfActiveTasks = todoTasks.filter((todo) => todo.status === TaskStatus.Uncompleted).length;
        const tasksOfActiveFilter = activeFilter === FILTER_TYPE.ACTIVE ? todoTasks.filter((todo) => todo.status === TaskStatus.Uncompleted) : activeFilter === FILTER_TYPE.COMPLETED ? todoTasks.filter((todo) => todo.status === TaskStatus.Completed) : todoTasks;
        const isCompletedTasks = todoTasks.filter((todo) => todo.status === TaskStatus.Completed).length > 0;

        return (
            <div>
                <h1 className="header">todos</h1>
                <div className="workspace">
                    <section className="new-task">
                        <input className="check-all-button" type="checkbox"
                               checked={this.props.todoTasks.every((task) => task.status === TaskStatus.Completed)}
                               onChange={this._handleCheckedAllTasks}/>
                        <input className="new-task-field" type="text" placeholder="What needs to be done?"
                               onKeyDown={this._handleNewTaskEnterDown}
                               onChange={this._handleNewTaskChange} value={newTask ? newTask.task : ``}/>
                    </section>
                    <TodoList todoTasks={tasksOfActiveFilter} onTaskChange={this._handleTaskChange}/>
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
    _handleCheckedAllTasks = () => {
        if (this.props.todoTasks.every((task) => task.status === TaskStatus.Completed)) {

            todoTasks.map((todo) => {
                return (
                    {
                        ...todo,
                        status: TaskStatus.Uncompleted,
                    }
                )
            })
        } else {
            todoTasks.map((todo) => {
                return (
                    {
                        ...todo,
                        status: TaskStatus.Completed,
                    }
                )
            })
        }
    }

    _handleNewTaskChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const {todoTasks} = this.props;

        this.setState({
            newTask: {
                id: todoTasks.length + 1,
                task: evt.target.value,
                status: TaskStatus.Uncompleted,
            },
        });
    }

    _handleNewTaskEnterDown = (evt: React.KeyboardEvent) => {
        const {todoTasks} = this.props;
        const {newTask} = this.state;

        const isEnterKey = evt.key === `Enter`;

        const newTodoTasks = isEnterKey && newTask !== null ? [...todoTasks, newTask] : todoTasks;

        if (isEnterKey) {
            this.setState({
                newTask: null
            });
        }
    }

    // TaskList
    _handleTaskChange = (newTask: Task) => {
        const {todoTasks} = this.props;
        const todoIndex = todoTasks.findIndex((todoTask) => todoTask.id === newTask.id);

        return [
            ...todoTasks.slice(0, todoIndex),
            newTask,
            ...todoTasks.slice(todoIndex + 1)
        ];
    }

    // Footer
    _handleFilterClick = (filterName: string) => {
        this.setState({activeFilter: filterName});
    }

    _handleClearCompletedClick = () => {
        const {todoTasks} = this.props;

        return [...todoTasks.filter((todo) => todo.status === TaskStatus.Uncompleted)];
    }
}

export default App;
