import * as React from 'react';

import {Story, Meta} from '@storybook/react/types-6-0';
import TodoList, {TodoListProps} from "../components/todolist";
import {FILTER_TYPE} from "../const";

export default {
    title: 'Example/TodoList',
    component: TodoList,
} as Meta;

const Template: Story<TodoListProps> = (args) => <TodoList {...args}/>;

export const FullTodoList = Template.bind({});
FullTodoList.args = {
    todoTasks: [
        {
            id: 0,
            task: `First`,
            status: FILTER_TYPE.ACTIVE,
        },
        {
            id: 1,
            task: `Second`,
            status: FILTER_TYPE.COMPLETED,
        }]
}

