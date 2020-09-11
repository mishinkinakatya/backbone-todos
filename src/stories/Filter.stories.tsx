import * as React from 'react';

import { Story, Meta } from '@storybook/react/types-6-0';
import Filter, {FilterProps} from "../components/filter";
import {FILTER_TYPE} from "../const";

export default {
    title: 'Example/Filter',
    component: Filter,
} as Meta;

const Template: Story<FilterProps> = (args) => <Filter {...args}/>;

export const AllFilters = Template.bind({});
AllFilters.args = {
    activeFilter: FILTER_TYPE.ALL
}

export const ActiveFilters = Template.bind({});
ActiveFilters.args = {
    activeFilter: FILTER_TYPE.ACTIVE
}

export const CompletedFilters = Template.bind({});
CompletedFilters.args = {
    activeFilter: FILTER_TYPE.COMPLETED
}

