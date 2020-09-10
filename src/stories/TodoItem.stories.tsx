import * as React from 'react';

import {Story, Meta} from '@storybook/react/types-6-0';
import TodoItem, {TodoItemPropsTypes} from "../components/todoItem";
import {TASK_STATUS} from "../const";

export default {
    title: 'Example/TodoItem',
    component: TodoItem,
} as Meta;

const Template: Story<TodoItemPropsTypes> = (args) => <TodoItem {...args}/>;

export const ActiveTodoItem = Template.bind({});
ActiveTodoItem.args = {
    todo:
        {
            id: 0,
            task: `First`,
            status: TASK_STATUS.ACTIVE,
        }
};

export const CompletedTodoItem = Template.bind({});
CompletedTodoItem.args = {
    todo:
        {
            id: 0,
            task: `First`,
            status: TASK_STATUS.COMPLETED,
        }
};