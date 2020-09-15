import * as React from "react";
import '../style/workspace.css';
import {Task} from "./task";
import Workspace from "./workspace";

export interface AppProps {
    todoTasks: Task[],
    api: object,
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

        return todoTasks
            ? <Workspace
                todoTasks={todoTasks}
                onChangeTodoTasks={this.onChangeTodoTasks}
            />
            : <p>Ooops</p>;
    }

    onChangeTodoTasks = (newTasks: Task[]): void => {
        this.setState({
            todoTasks: newTasks
        })

        this.props.api.updateTodoTasks(newTasks);
    }
}

export default App;
