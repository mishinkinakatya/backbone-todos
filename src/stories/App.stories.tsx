import * as React from 'react';

import {Meta} from '@storybook/react/types-6-0';
import App from "../components/app";
import {TaskStatus} from "../components/task";
import {action} from "@storybook/addon-actions";

export default {title: 'Todo MVC/App'} as Meta;

export const AppPage = (): JSX.Element => <App
    onChangeTodoTasks={action("onChangeTodoTasks")}
    todoTasks={
        [
            {
                id: 0,
                description: `First`,
                status: TaskStatus.Completed,
            },
            {
                id: 1,
                description: `Second`,
                status: TaskStatus.Uncompleted,
            }
        ]
    }
/>

export const WithCompletedTasks = (): JSX.Element => <App
    onChangeTodoTasks={action("onChangeTodoTasks")}
    todoTasks={
        [
            {
                id: 0,
                description: `First`,
                status: TaskStatus.Completed,
            },
            {
                id: 1,
                description: `Second`,
                status: TaskStatus.Completed,
            }
        ]
    }
/>

export const WithUnCompletedTasks = (): JSX.Element => <App
    onChangeTodoTasks={action("onChangeTodoTasks")}
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
                status: TaskStatus.Uncompleted,
            }
        ]
    }
/>
