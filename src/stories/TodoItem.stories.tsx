import * as React from 'react';

import {Story, Meta} from '@storybook/react/types-6-0';
import TodoItem, {TodoItemProps} from "../components/todoItem";
import {FILTER_TYPE} from "../const";
import {TaskStatus} from "../components/task";
import {action} from "@storybook/addon-actions";

export default {
    title: 'Todo MVC/TodoItem',
} as Meta;

export const TodoItemPage = () => <TodoItem
    todo={{
        id: 0,
        task: `First`,
        status: TaskStatus.Uncompleted
    }}
    onTaskChecked={action("onTaskChecked")}
    onDeleteButtonClick={action("onDeleteButtonClick")}
    onTaskChange={action("onTaskChange")}
    onTaskKeyDown={action("onTaskKeyDown")}
/>

export const CompletedTodoItems = () =>  <TodoItem
    todo={{
        id: 0,
        task: `First`,
        status: TaskStatus.Completed
    }}
    onTaskChecked={action("onTaskChecked")}
    onDeleteButtonClick={action("onDeleteButtonClick")}
    onTaskChange={action("onTaskChange")}
    onTaskKeyDown={action("onTaskKeyDown")}
/>
