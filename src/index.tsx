import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/app";
import {todoTasks} from "./mock";
import {Task} from "./components/task";

export interface IndexProps {
    todoTasks: Task[],
}

interface IndexState {
    todoTasks: Task[],
}

class Index extends React.PureComponent<IndexProps, IndexState> {
    constructor(props: IndexProps) {
        super(props);

        this.state = {
            todoTasks: this.props.todoTasks,
        }
    }

    render() {
        const {todoTasks} = this.state;

        return (
            <App
                todoTasks={todoTasks}
                onChangeTodoTasks={this.onChangeTodoTasks}
            />
        );
    }

    onChangeTodoTasks = (newTasks: Task[]) => {
        this.setState({
            todoTasks: newTasks,
        })
    }

}

ReactDOM.render(
    <Index todoTasks={todoTasks}/>,
    document.querySelector(`#root`));
