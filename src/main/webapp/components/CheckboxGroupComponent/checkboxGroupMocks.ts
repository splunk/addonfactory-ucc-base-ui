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
                    entity: [
                        {
                            type: 'checkboxGroup',
                            label: 'APIs/Interval (in seconds)',
                            field: 'api',
                            options: {
                                groups: [
                                    {
                                        label: 'Collect',
                                        options: {
                                            isExpandable: true,
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
                                            tooltip: 'Tooltip',
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
                                        field: 'collectFileMetadata',
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
                                        field: 'collectTasksAndComments',
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
                        {
                            type: 'checkboxGroup',
                            label: 'APIs/Interval (in seconds)',
                            options: {
                                rows: [
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
                                    {
                                        field: 'collectFolderCollaboration',
                                        checkbox: {
                                            label: 'Collect folder collaboration',
                                            tooltip: 'Tooltip',
                                            defaultValue: 1,
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
                                            defaultValue: 1,
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
                                            defaultValue: 1,
                                        },
                                        value: {
                                            defaultValue: 1,
                                            required: true,
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
