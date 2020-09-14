import * as React from 'react';

import {Meta} from '@storybook/react/types-6-0';
import TodoItem from "../components/todoItem";
import {TaskStatus} from "../components/task";
import {action} from "@storybook/addon-actions";

export default {
    title: 'Todo MVC/TodoItem',
} as Meta;

export const TodoItemPage = (): JSX.Element => <TodoItem
    todo={{
        id: 0,
        description: `First`,
        status: TaskStatus.Uncompleted
    }}
    onTaskChange={action("onTaskChange")}
    onTaskDelete={action("onTaskDelete")}
/>

export const CompletedTodoItems = (): JSX.Element =>  <TodoItem
    todo={{
        id: 0,
        description: `First`,
        status: TaskStatus.Completed
    }}
    onTaskChange={action("onTaskChange")}
    onTaskDelete={action("onTaskDelete")}
/>
