import * as React from "react";
import '../style/workspace.css';
import {Task} from "./task";
import Workspace from "./workspace";

export interface AppProps {
    todoTasks: Task[],
}

interface AppState {
    todoTasks: Task[],
}

class App extends React.PureComponent<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);

        this.state = {
            todoTasks: this.props.todoTasks,
        }
    }

    render(): JSX.Element {
        const {todoTasks} = this.state;

        return (
            <Workspace
                todoTasks={todoTasks}
                onChangeTodoTasks={this.onChangeTodoTasks}
            />
        );
    }

    onChangeTodoTasks = (newTasks: Task[]): void => {
        this.setState({
            todoTasks: newTasks,
        })
    }
}

export default App;
