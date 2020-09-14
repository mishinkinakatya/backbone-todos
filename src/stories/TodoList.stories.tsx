import * as React from 'react';

import {Meta} from '@storybook/react/types-6-0';
import TodoList from "../components/todolist";
import {TaskStatus} from "../components/task";
import {action} from "@storybook/addon-actions";

export default {title: 'Todo MVC/TodoList'} as Meta;

export const FullTodoList = (): JSX.Element => <TodoList
    onTaskDelete={action("onTaskDelete")}
    onTaskChange={action("onTaskChange")}
    todoTasks={
        [
    {
        id: 0,
        description: `First`,
        status: TaskStatus.Uncompleted,
    },
    {
        id: 1,
        description: `Second`,
        status: TaskStatus.Completed,
    }]
    }
/>

