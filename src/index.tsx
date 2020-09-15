import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/app";
import {getApi} from "./api";

const api = getApi();

api.getTodoTasks()
    .then((response) => ReactDOM.render(
            <App api={api} todoTasks={response}/>,
            document.querySelector(`#root`))
    )
