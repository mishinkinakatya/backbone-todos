import * as React from 'react';

import {Story, Meta} from '@storybook/react/types-6-0';
import TodoList, {TodoListPropsTypes} from "../components/todolist";
import {TASK_STATUS} from "../const";

export default {
    title: 'Example/TodoList',
    component: TodoList,
} as Meta;

const Template: Story<TodoListPropsTypes> = (args) => <TodoList {...args}/>;

export const FullTodoList = Template.bind({});
FullTodoList.args = {
    todoTasks: [
        {
            id: 0,
            task: `First`,
            status: TASK_STATUS.ACTIVE,
        },
        {
            id: 1,
            task: `Second`,
            status: TASK_STATUS.COMPLETED,
        }]
}

