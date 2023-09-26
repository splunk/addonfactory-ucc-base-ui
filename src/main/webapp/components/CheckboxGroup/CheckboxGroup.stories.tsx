import type { Meta, StoryObj } from '@storybook/react';
import BaseFormView from '../BaseFormView';
import CheckboxGroup from './CheckboxGroup';

const meta = {
    component: CheckboxGroup,
    title: 'Components/CheckboxGroup',
} satisfies Meta<typeof BaseFormView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
    args: {
        field: 'api',
        value: 'collect_collaboration/1200,collect_file/1,collect_task/1',
        controlOptions: {
            rows: [
                {
                    field: 'collect_collaboration',
                    checkbox: {
                        label: 'Collect folder collaboration',
                        defaultValue: 0,
                        options: {
                            enable: true,
                        },
                    },
                    value: {
                        defaultValue: 1200,
                        required: false,
                    },
                },
                {
                    field: 'collect_file',
                    checkbox: {
                        label: 'Collect file metadata',
                        defaultValue: 0,
                        options: {
                            enable: true,
                        },
                    },
                    value: {
                        defaultValue: 1,
                        required: true,
                    },
                },
                {
                    field: 'collect_task',
                    checkbox: {
                        label: 'Collect tasks and comments',
                        defaultValue: 0,
                        options: {
                            enable: true,
                        },
                    },
                    value: {
                        defaultValue: 1,
                        required: true,
                    },
                },
                {
                    field: 'collectFolderMetadata',
                    checkbox: {
                        label: 'Collect folder metadata',
                        defaultValue: 0,
                        options: {
                            enable: true,
                        },
                    },
                    value: {
                        defaultValue: 3600,
                        required: true,
                    },
                },
            ],
        },
    },
};
export const WithSingleGroup: Story = {
    args: {
        ...Base.args,
        value: undefined,
        controlOptions: {
            groups: [
                {
                    label: 'Group 1',
                    fields: ['collect_collaboration', 'collect_file'],
                    options: { isExpandable: false },
                },
            ],
            rows: [
                {
                    field: 'collect_collaboration',
                    checkbox: {
                        label: 'Collect folder collaboration',
                        defaultValue: 0,
                        options: {
                            enable: true,
                        },
                    },
                    value: {
                        defaultValue: 1200,
                        required: false,
                    },
                },
                {
                    field: 'collect_file',
                    checkbox: {
                        label: 'Collect file metadata',
                        defaultValue: 0,
                        options: {
                            enable: true,
                        },
                    },
                    value: {
                        defaultValue: 1,
                        required: true,
                    },
                },
            ],
        },
    },
};
export const MixedWithGroups: Story = {
    args: {
        ...Base.args,
        value: undefined,
        controlOptions: {
            groups: [
                {
                    label: 'Expandable group',
                    fields: ['collect_collaboration', 'collect_file'],
                    options: { isExpandable: true, defaultOpen: true },
                },

                {
                    label: 'Non expandable group',
                    fields: ['collect_folder_metadata'],
                    options: { isExpandable: false },
                },
            ],
            rows: [
                {
                    field: 'collect_collaboration',
                    checkbox: {
                        label: 'Collect folder collaboration',
                        defaultValue: 0,
                        options: {
                            enable: true,
                        },
                    },
                    value: {
                        defaultValue: 1200,
                        required: false,
                    },
                },
                {
                    field: 'collect_file',
                    checkbox: {
                        label: 'Collect file metadata',
                        defaultValue: 0,
                        options: {
                            enable: true,
                        },
                    },
                    value: {
                        defaultValue: 1,
                        required: true,
                    },
                },
                {
                    field: 'collect_task',
                    checkbox: {
                        label: 'Collect tasks and comments',
                        defaultValue: 0,
                        options: {
                            enable: true,
                        },
                    },
                    value: {
                        defaultValue: 1,
                        required: true,
                    },
                },
                {
                    field: 'collect_folder_metadata',
                    checkbox: {
                        label: 'Collect folder metadata',
                        defaultValue: 0,
                        options: {
                            enable: true,
                        },
                    },
                    value: {
                        defaultValue: 3600,
                        required: true,
                    },
                },
            ],
        },
    },
};
