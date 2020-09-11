import * as React from 'react';

import {Meta} from '@storybook/react/types-6-0';
import App from "../components/app";
import {TaskStatus} from "../components/task";

export default {title: 'Todo MVC/App'} as Meta;

export const AppPage = () => <App
    todoTasks={
        [
            {
                id: 0,
                task: `First`,
                status: TaskStatus.Completed,
            },
            {
                id: 1,
                task: `Second`,
                status: TaskStatus.Uncompleted,
            }
        ]
    }
/>

export const WithCompletedTasks = () => <App
    todoTasks={
        [
            {
                id: 0,
                task: `First`,
                status: TaskStatus.Completed,
            },
            {
                id: 1,
                task: `Second`,
                status: TaskStatus.Completed,
            }
        ]
    }
/>

export const WithUnCompletedTasks = () => <App
    todoTasks={
        [
            {
                id: 0,
                task: `First`,
                status: TaskStatus.Uncompleted,
            },
            {
                id: 1,
                task: `Second`,
                status: TaskStatus.Uncompleted,
            }
        ]
    }
/>
