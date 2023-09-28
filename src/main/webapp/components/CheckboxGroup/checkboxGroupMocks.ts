import { rest } from 'msw';

export const checkboxGroupConfig = {
    meta: {
        restRoot: 'restRoot',
    },
    pages: {
        inputs: {
            title: 'Inputs',
            table: {
                header: [
                    {
                        field: 'name',
                        label: 'Input Name',
                    },
                ],
                moreInfo: [
                    {
                        field: 'name',
                        label: 'Name',
                    },
                ],
                actions: ['edit', 'delete', 'clone'],
            },
            services: [
                {
                    name: 'example_input_four',
                    title: 'Title example',
                    entity: [
                        {
                            type: 'checkboxGroup',
                            label: 'Two groups',
                            field: 'api1',
                            options: {
                                groups: [
                                    {
                                        label: 'Collect',
                                        options: {
                                            isExpandable: true,
                                            defaultOpen: true,
                                        },
                                        fields: [
                                            'collectFolderCollaboration',
                                            'collectFileMetadata',
                                            'collectTasksAndComments',
                                        ],
                                    },
                                    {
                                        label: 'Collect2',
                                        options: {
                                            isExpandable: true,
                                        },
                                        fields: ['collectFolderMetadata'],
                                    },
                                ],
                                rows: [
                                    {
                                        field: 'collectFolderCollaboration',
                                        checkbox: {
                                            label: 'Collect folder collaboration',
                                            options: {
                                                enable: true,
                                            },
                                        },
                                        value: {
                                            defaultValue: 1200,
                                            required: false,
                                            validators: [
                                                {
                                                    type: 'number',
                                                    range: [1, 1200],
                                                },
                                            ],
                                        },
                                    },
                                    {
                                        field: 'collectFileMetadata',
                                        checkbox: {
                                            label: 'Collect file metadata',
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
                                        field: 'collectTasksAndComments',
                                        checkbox: {
                                            label: 'This is a very very very very very very very very very long line',
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
                        {
                            type: 'checkboxGroup',
                            label: 'No groups',
                            field: 'api2',
                            options: {
                                rows: [
                                    {
                                        field: 'collectFolderMetadata',
                                        checkbox: {
                                            label: 'Collect folder metadata',
                                            options: {
                                                enable: true,
                                            },
                                        },
                                        value: {
                                            defaultValue: 3600,
                                            required: true,
                                        },
                                    },
                                    {
                                        field: 'collectFolderCollaboration',
                                        checkbox: {
                                            label: 'Collect folder collaboration',
                                        },
                                        value: {
                                            defaultValue: 1200,
                                            required: false,
                                            validators: [
                                                {
                                                    type: 'number',
                                                    range: [1, 1200],
                                                },
                                            ],
                                        },
                                    },
                                    {
                                        field: 'collectFileMetadata',
                                        checkbox: {
                                            label: 'Collect file metadata',
                                        },
                                        value: {
                                            defaultValue: 1,
                                            required: true,
                                        },
                                    },
                                    {
                                        field: 'collectTasksAndComments',
                                        checkbox: {
                                            label: 'Collect tasks and comments',
                                        },
                                        value: {
                                            defaultValue: 1,
                                            required: true,
                                        },
                                    },
                                ],
                            },
                        },
                        {
                            type: 'checkboxGroup',
                            label: 'Mixed',
                            field: 'api3',
                            options: {
                                groups: [
                                    {
                                        label: 'Group 1',
                                        options: {
                                            isExpandable: true,
                                            defaultOpen: true,
                                        },
                                        fields: ['collectFolderCollaboration'],
                                    },
                                    {
                                        label: 'Group 3',
                                        options: {
                                            isExpandable: true,
                                            defaultOpen: true,
                                        },
                                        fields: ['collectFolderMetadata'],
                                    },
                                ],
                                rows: [
                                    {
                                        field: 'collectFolderCollaboration',
                                        checkbox: {
                                            label: 'Collect folder collaboration',
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
                                        field: 'collectFileMetadata',
                                        checkbox: {
                                            label: 'Collect file metadata',
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
                                        field: 'collectTasksAndComments',
                                        checkbox: {
                                            label: 'Collect tasks and comments',
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
                                            options: {
                                                enable: true,
                                            },
                                        },
                                        value: {
                                            defaultValue: 3600,
                                            required: true,
                                        },
                                    },
                                    {
                                        field: 'field223',
                                        checkbox: {
                                            label: 'Required field',
                                            options: {
                                                enable: true,
                                            },
                                        },
                                        value: {
                                            required: true,
                                        },
                                    },
                                    {
                                        field: 'field23',
                                        checkbox: {
                                            label: 'No more 2 characters',
                                            options: {
                                                enable: true,
                                            },
                                        },
                                        value: {
                                            validators: [
                                                {
                                                    type: 'string',
                                                    maxLength: 2,
                                                },
                                            ],
                                            defaultValue: 'aa',
                                        },
                                    },
                                    {
                                        field: '160validation',
                                        checkbox: {
                                            label: 'from 1 to 60 validation',
                                        },
                                        value: {
                                            validators: [
                                                {
                                                    type: 'number',
                                                    range: [1, 60],
                                                },
                                            ],
                                        },
                                    },
                                ],
                            },
                        },
                    ],
                },
            ],
        },
    },
};

export const serverHandlers = [
    rest.get(`/servicesNS/nobody/-/restRoot_example_input_four`, (req, res, ctx) =>
        res(
            ctx.json({
                entry: [
                    {
                        name: 'name',
                        content: 'content',
                        id: 0,
                    },
                ],
            })
        )
    ),
];
