import * as React from 'react';

import {Story, Meta} from '@storybook/react/types-6-0';
import App, {AppPropsTypes} from "../components/app";
import {TASK_STATUS} from "../const";

export default {
    title: 'Example/App',
    component: App,
} as Meta;

const Template: Story<AppPropsTypes> = (args) => <App {...args}/>;

export const AppPage = Template.bind({});
AppPage.args = {
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

