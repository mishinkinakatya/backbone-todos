import * as React from 'react';

import { Story, Meta } from '@storybook/react/types-6-0';
import Filter, {FilterPropsTypes} from "../components/filter";
import {TASK_STATUS} from "../const";

export default {
    title: 'Example/Filter',
    component: Filter,
} as Meta;

const Template: Story<FilterPropsTypes> = (args) => <Filter {...args}/>;

export const AllFilters = Template.bind({});
AllFilters.args = {
    activeFilter: TASK_STATUS.ALL
}

export const ActiveFilters = Template.bind({});
ActiveFilters.args = {
    activeFilter: TASK_STATUS.ACTIVE
}

export const CompletedFilters = Template.bind({});
CompletedFilters.args = {
    activeFilter: TASK_STATUS.COMPLETED
}

