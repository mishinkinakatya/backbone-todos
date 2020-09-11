import * as React from 'react';

import { Meta } from '@storybook/react/types-6-0';
import Filter from "../components/filter";
import {FILTER_TYPE} from "../const";
import {action} from "@storybook/addon-actions";

export default {title: 'Todo MVC/Filter'} as Meta;


export const AllFilters = () => <Filter
    activeFilter={FILTER_TYPE.ALL}
    onFilterClick={action("onFilterClick")}
/>

export const ActiveFilters = () => <Filter
    activeFilter={FILTER_TYPE.ACTIVE}
    onFilterClick={action("onFilterClick")}
/>

export const CompletedFilters = () => <Filter
    activeFilter={FILTER_TYPE.COMPLETED}
    onFilterClick={action("onFilterClick")}
/>