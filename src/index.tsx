import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/app";
import {todoTasks} from "./mock";


ReactDOM.render(
    <App todoTasks={todoTasks}/>,
    document.querySelector(`#root`));
