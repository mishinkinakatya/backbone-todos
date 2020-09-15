import * as React from 'react';

import {Meta} from '@storybook/react/types-6-0';
import {TaskStatus} from "../components/task";
import {action} from "@storybook/addon-actions";
import Workspace from "../components/workspace";

export default {title: 'Todo MVC/Workspace'} as Meta;

export const WorkspacePage = (): JSX.Element => <Workspace
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

export const WithCompletedTasks = (): JSX.Element => <Workspace
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

export const WithUnCompletedTasks = (): JSX.Element => <Workspace
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
