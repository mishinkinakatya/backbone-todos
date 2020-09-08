import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app.jsx";
import {todoTasks} from "./mock.js";


ReactDOM.render(<App  todoTasks={todoTasks}/>, document.querySelector(`#root`));
