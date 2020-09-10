import * as React from 'react';

import { Story, Meta } from '@storybook/react/types-6-0';
import Footer from "../components/footer";

export default {
    title: 'Example/Footer',
    component: Footer,
} as Meta;

const Template: Story = (args) => <Footer />;

export  const First = Template.bind({});

