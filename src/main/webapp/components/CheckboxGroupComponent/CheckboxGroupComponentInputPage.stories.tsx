import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import BaseFormView from '../BaseFormView';
import { setUnifiedConfig } from '../../util/util';
import { checkboxGroupConfig, serverHandlers } from './checkboxGroupMocks';
import InputPage from '../../pages/Input/InputPage';

const meta = {
    component: InputPage,
    title: 'InputPage/CheckboxGroupComponent',
    render: (args) => {
        setUnifiedConfig(args.globalConfig);
        return <InputPage />;
    },
    args: {
        globalConfig: checkboxGroupConfig,
    },
    parameters: {
        msw: {
            handlers: serverHandlers,
        },
    },
} satisfies Meta<typeof BaseFormView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InputPageView: Story = {};
