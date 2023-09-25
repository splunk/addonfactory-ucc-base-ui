import { MOCKED_TA_INPUT } from '../../mocks/server-response';

export const mockUnifiedConfig = {
    meta: {
        restRoot: 'restRoot',
    },
    pages: {
        inputs: {
            title: 'Inputs',
            description: 'Create data inputs to collect data from AWS',
            table: {
                header: [
                    {
                        field: 'name',
                        label: 'Input Name',
                        customCell: {
                            src: 'CustomInputCell',
                            type: 'external',
                        },
                    },
                ],
                moreInfo: [
                    {
                        field: 'name',
                        label: 'Name',
                    },
                ],
                customRow: {
                    src: 'CustomInputRow',
                    type: 'external',
                },
                actions: ['edit', 'delete', 'clone'],
            },
            groupsMenu: [
                {
                    groupName: 'aws_billing_menu',
                    groupTitle: 'Billing',
                    groupServices: ['aws_billing_cur', 'aws_billing'],
                },
                {
                    groupName: 'aws_cloudwatch',
                    groupTitle: 'CloudWatch',
                },
            ],
            menu: {
                src: 'CustomMenu',
                type: 'external',
            },
            services: [
                {
                    name: 'aws_billing_cur',
                    title: 'Billing (Cost and Usage Report)',
                    subTitle: '(Recommended)',
                    style: 'page',
                    hook: {
                        src: 'Hook',
                        type: 'external',
                    },
                    restHandlerName: 'aws_billing_cur_inputs_rh',
                    groups: [
                        {
                            label: 'AWS Input Configuration',
                            options: {
                                isExpandable: false,
                            },
                            fields: [
                                'name',
                                'aws_account',
                                'aws_iam_role',
                                'aws_s3_region',
                                'private_endpoint_enabled',
                                's3_private_endpoint_url',
                                'sts_private_endpoint_url',
                                'bucket_name',
                                'report_prefix',
                                'report_names',
                            ],
                        },
                        {
                            label: 'Splunk-related Configuration',
                            options: {
                                isExpandable: false,
                            },
                            fields: ['start_date', 'sourcetype', 'index'],
                        },
                        {
                            label: 'Advanced Settings',
                            options: {
                                expand: false,
                                isExpandable: true,
                            },
                            fields: ['interval', 'temp_folder'],
                        },
                    ],
                    entity: [
                        {
                            field: 'name',
                            label: 'Name',
                            type: 'text',
                            required: true,
                            validators: [
                                {
                                    type: 'regex',
                                    pattern: '^[^%<>/\\^$]+$',
                                    errorMsg:
                                        'Please enter name without special characters ^%<>/\\^$',
                                },
                            ],
                        },
                        {
                            field: 'aws_account',
                            label: 'AWS Account',
                            type: 'singleSelect',
                            required: true,
                            options: {
                                placeholder: 'Select an account',
                                endpointUrl: MOCKED_TA_INPUT,
                            },
                        },
                    ],
                },
                {
                    name: 'aws_billing',
                    title: 'Billing (Legacy)',
                    style: 'page',
                    hook: {
                        src: 'Hook',
                        type: 'external',
                    },
                    restHandlerName: 'aws_billing_inputs_rh',
                    groups: [
                        {
                            label: 'AWS Input Configuration',
                            options: {
                                isExpandable: false,
                            },
                            fields: [
                                'name',
                                'aws_account',
                                'aws_iam_role',
                                'aws_s3_region',
                                'bucket_name',
                                'monthly_report_type',
                                'detail_report_type',
                            ],
                        },
                        {
                            label: 'Splunk-related Configuration',
                            options: {
                                isExpandable: false,
                            },
                            fields: ['initial_scan_datetime', 'sourcetype', 'index'],
                        },
                        {
                            label: 'Advanced Settings',
                            options: {
                                expand: false,
                                isExpandable: true,
                            },
                            fields: ['interval', 'report_file_match_reg', 'temp_folder'],
                        },
                    ],
                    entity: [
                        {
                            field: 'name',
                            label: 'Name',
                            type: 'text',
                            required: true,
                            validators: [
                                {
                                    type: 'regex',
                                    pattern: '^[^%<>/\\^$]+$',
                                    errorMsg:
                                        'Please enter name without special characters ^%<>/\\^$',
                                },
                            ],
                        },
                    ],
                },
                {
                    name: 'aws_cloudwatch',
                    title: 'CloudWatch',
                    style: 'page',
                    hook: {
                        src: 'Hook',
                        type: 'external',
                    },
                    restHandlerName: 'aws_cloudwatch_inputs_rh',
                    groups: [
                        {
                            label: 'AWS Input Configuration',
                            options: {
                                isExpandable: false,
                            },
                            fields: [
                                'name',
                                'aws_account',
                                'aws_iam_role',
                                'aws_region',
                                'private_endpoint_enabled',
                                'sts_private_endpoint_url',
                                'monitoring_private_endpoint_url',
                                'elb_private_endpoint_url',
                                'ec2_private_endpoint_url',
                                'autoscaling_private_endpoint_url',
                                'lambda_private_endpoint_url',
                                's3_private_endpoint_url',
                                'metric_namespace',
                            ],
                        },
                        {
                            label: 'Splunk-related Configuration',
                            options: {
                                isExpandable: false,
                            },
                            fields: ['sourcetype', 'index'],
                        },
                        {
                            label: 'Advanced Settings',
                            options: {
                                expand: false,
                                isExpandable: true,
                            },
                            fields: ['period'],
                        },
                    ],
                    entity: [],
                },
            ],
        },
    },
};

export const awsConfig = {
    pages: {
        inputs: {
            title: 'Inputs',
            description: 'Create data inputs to collect data from AWS',
            table: {
                header: [
                    {
                        field: 'name',
                        label: 'Input Name',
                        customCell: {
                            src: 'CustomInputCell',
                            type: 'external',
                        },
                    },
                    {
                        field: 'source',
                        label: 'Data Type',
                        customCell: {
                            src: 'CustomInputCell',
                            type: 'external',
                        },
                    },
                    {
                        field: 'serviceName',
                        label: 'Input Type',
                        mapping: {
                            aws_billing_cur: 'Billing (Cost and Usage Report)',
                            aws_billing: 'Billing (Legacy)',
                            aws_cloudtrail: 'CloudTrail',
                            aws_cloudwatch: 'CloudWatch',
                            aws_cloudwatch_logs: 'CloudWatch Logs',
                            aws_config: 'Config',
                            aws_config_rule: 'Config Rules',
                            aws_metadata: 'Metadata',
                            aws_s3: 'Generic S3',
                            splunk_ta_aws_logs: 'Incremental S3',
                            aws_inspector: 'Inspector',
                            aws_inspector_v2: 'Inspector (v2)',
                            aws_kinesis: 'Kinesis',
                            splunk_ta_aws_sqs: 'SQS',
                            aws_sqs_based_s3: 'SQS-Based S3',
                        },
                    },
                    {
                        field: 'aws_account',
                        label: 'Account',
                        customCell: {
                            src: 'CustomInputCell',
                            type: 'external',
                        },
                    },
                    {
                        field: 'aws_iam_role',
                        label: 'Assume Role',
                    },
                    {
                        field: 'index',
                        label: 'Index',
                    },
                    {
                        field: 'disabled',
                        label: 'Status',
                    },
                    {
                        field: 'sourcetype',
                        label: 'Source Type',
                    },
                ],
                moreInfo: [
                    {
                        field: 'name',
                        label: 'Name',
                    },
                    {
                        field: 'account',
                        label: 'Account',
                    },
                    {
                        field: 'start_offset',
                        label: 'Start Offset',
                    },
                    {
                        field: 'interval',
                        label: 'Interval',
                    },
                    {
                        field: 'index',
                        label: 'Index',
                    },
                    {
                        field: 'disabled',
                        label: 'Status',
                    },
                ],
                customRow: {
                    src: 'CustomInputRow',
                    type: 'external',
                },
                actions: ['edit', 'delete', 'clone'],
            },
            groupsMenu: [
                {
                    groupName: 'aws_billing_menu',
                    groupTitle: 'Billing',
                    groupServices: ['aws_billing_cur', 'aws_billing'],
                },
                {
                    groupName: 'aws_cloudtrail_menu',
                    groupTitle: 'CloudTrail',
                    groupServices: [
                        'aws_sqs_based_s3',
                        'aws_cloudtrail',
                        'aws_s3',
                        'splunk_ta_aws_logs',
                    ],
                },
                {
                    groupName: 'aws_cloudwatch',
                    groupTitle: 'CloudWatch',
                },
                {
                    groupName: 'aws_cloudfront_access_logs_menu',
                    groupTitle: 'Cloudfront Access Logs',
                    groupServices: ['aws_sqs_based_s3', 'aws_s3', 'splunk_ta_aws_logs'],
                },
                {
                    groupName: 'aws_config_menu',
                    groupTitle: 'Config',
                    groupServices: ['aws_sqs_based_s3', 'aws_config'],
                },
                {
                    groupName: 'aws_config_rule',
                    groupTitle: 'Config Rules',
                },
                {
                    groupName: 'aws_elb_access_logs_menu',
                    groupTitle: 'ELB Access Logs',
                    groupServices: ['aws_sqs_based_s3', 'aws_s3', 'splunk_ta_aws_logs'],
                },
                {
                    groupName: 'aws_inspector_menu',
                    groupTitle: 'Inspector',
                    groupServices: ['aws_inspector_v2', 'aws_inspector'],
                },
                {
                    groupName: 'aws_metadata',
                    groupTitle: 'Metadata',
                },
                {
                    groupName: 'aws_s3_access_logs_menu',
                    groupTitle: 'S3 Access Logs',
                    groupServices: ['aws_sqs_based_s3', 'aws_s3', 'splunk_ta_aws_logs'],
                },
                {
                    groupName: 'aws_security_lake_menu',
                    groupTitle: 'Security Lake',
                    groupServices: ['aws_sqs_based_s3'],
                },
                {
                    groupName: 'aws_vpc_flow_logs_menu',
                    groupTitle: 'VPC Flow Logs',
                    groupServices: ['aws_sqs_based_s3', 'aws_kinesis', 'aws_cloudwatch_logs'],
                },
                {
                    groupName: 'aws_custome_data_type_menu',
                    groupTitle: 'Custom Data Type',
                    groupServices: [
                        'aws_cloudwatch_logs',
                        'aws_s3',
                        'aws_kinesis',
                        'splunk_ta_aws_sqs',
                        'aws_sqs_based_s3',
                    ],
                },
            ],
            menu: {
                src: 'CustomMenu',
                type: 'external',
            },
            services: [
                {
                    name: 'aws_billing_cur',
                    title: 'Billing (Cost and Usage Report)',
                    subTitle: '(Recommended)',
                    style: 'page',
                    hook: {
                        src: 'Hook',
                        type: 'external',
                    },
                    restHandlerName: 'aws_billing_cur_inputs_rh',
                    groups: [
                        {
                            label: 'AWS Input Configuration',
                            options: {
                                isExpandable: false,
                            },
                            fields: [
                                'name',
                                'aws_account',
                                'aws_iam_role',
                                'aws_s3_region',
                                'private_endpoint_enabled',
                                's3_private_endpoint_url',
                                'sts_private_endpoint_url',
                                'bucket_name',
                                'report_prefix',
                                'report_names',
                            ],
                        },
                        {
                            label: 'Splunk-related Configuration',
                            options: {
                                isExpandable: false,
                            },
                            fields: ['start_date', 'sourcetype', 'index'],
                        },
                        {
                            label: 'Advanced Settings',
                            options: {
                                expand: false,
                                isExpandable: true,
                            },
                            fields: ['interval', 'temp_folder'],
                        },
                    ],
                    entity: [
                        {
                            field: 'name',
                            label: 'Name',
                            type: 'text',
                            required: true,
                            validators: [
                                {
                                    type: 'regex',
                                    pattern: '^[^%<>/\\^$]+$',
                                    errorMsg:
                                        'Please enter name without special characters ^%<>/\\^$',
                                },
                            ],
                        },
                        {
                            field: 'aws_account',
                            label: 'AWS Account',
                            type: 'singleSelect',
                            required: true,
                            options: {
                                endpointUrl: 'splunk_ta_aws_aws_all_accounts',
                            },
                        },
                        {
                            field: 'aws_iam_role',
                            label: 'Assume Role',
                            type: 'singleSelect',
                            defaultValue: '',
                            options: {
                                referenceName: 'iam_roles',
                            },
                        },
                        {
                            field: 'bucket_region',
                            label: 'bucket_region',
                            type: 'text',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'aws_s3_region',
                            label: 'AWS Region',
                            type: 'singleSelect',
                            help: 'Select region only if you want to use regional/private endpoints for making every API calls.',
                            options: {
                                endpointUrl:
                                    'splunk_ta_aws/splunk_ta_aws_regions?aws_service=aws_s3',
                                labelField: 'label',
                                dependencies: ['aws_account'],
                            },
                        },
                        {
                            field: 'private_endpoint_enabled',
                            label: 'Use Private Endpoints',
                            type: 'custom',
                            defaultValue: 0,
                            options: {
                                src: 'PrivateEndpointInput',
                                type: 'external',
                            },
                        },
                        {
                            field: 's3_private_endpoint_url',
                            label: 'Private Endpoint (S3)',
                            type: 'text',
                            help: 'Ex: https://bucket.vpce-<endpoint_id>-<unique_id>.s3.<region>.vpce.amazonaws.com',
                            defaultValue: '',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'sts_private_endpoint_url',
                            label: 'Private Endpoint (STS)',
                            type: 'text',
                            help: 'Ex: https://vpce-<endpoint_id>-<unique_id>.sts.<region>.vpce.amazonaws.com',
                            defaultValue: '',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'bucket_name',
                            label: 'S3 Bucket',
                            type: 'singleSelect',
                            required: true,
                            options: {
                                disableonEdit: true,
                                dependencies: [
                                    'aws_account',
                                    'aws_iam_role',
                                    'aws_s3_region',
                                    'private_endpoint_enabled',
                                    'sts_private_endpoint_url',
                                    's3_private_endpoint_url',
                                ],
                                endpointUrl: 'splunk_ta_aws/splunk_ta_aws_s3buckets',
                            },
                        },
                        {
                            field: 'report_prefix',
                            label: 'Report Prefix',
                            type: 'text',
                            options: {
                                disableonEdit: true,
                            },
                        },
                        {
                            field: 'report_names',
                            label: 'Report Name Pattern',
                            type: 'text',
                            tooltip:
                                'A regular expression used to filter reports by name, leave blank to select all reports in this bucket.',
                        },
                        {
                            field: 'temp_folder',
                            label: 'Temp Folder',
                            type: 'text',
                            tooltip:
                                'Full path to a non-default folder with sufficient space for temporarily storing downloaded detailed billing report .zip files. ',
                        },
                        {
                            field: 'interval',
                            label: 'Interval (in seconds)',
                            type: 'text',
                            defaultValue: 3600,
                            validators: [
                                {
                                    type: 'number',
                                    range: [0, 31536000],
                                },
                            ],
                        },
                        {
                            field: 'start_date',
                            label: 'Start Date',
                            type: 'text',
                            help: 'e.g., 2000-01',
                            options: {
                                disableonEdit: true,
                            },
                            validators: [
                                {
                                    type: 'regex',
                                    pattern: '^\\d{4}-\\d{2}$',
                                    errorMsg: 'Please enter a correct date format. e.g., 2000-01',
                                },
                            ],
                        },
                        {
                            field: 'sourcetype',
                            label: 'Source Type',
                            type: 'text',
                            defaultValue: 'aws:billing:cur',
                        },
                        {
                            field: 'index',
                            label: 'Index',
                            type: 'singleSelect',
                            required: true,
                            defaultValue: 'default',
                            options: {
                                createSearchChoice: true,
                                endpointUrl: 'data/indexes',
                                denyList: '^_.*$',
                            },
                        },
                    ],
                },
                {
                    name: 'aws_billing',
                    title: 'Billing (Legacy)',
                    style: 'page',
                    hook: {
                        src: 'Hook',
                        type: 'external',
                    },
                    restHandlerName: 'aws_billing_inputs_rh',
                    groups: [
                        {
                            label: 'AWS Input Configuration',
                            options: {
                                isExpandable: false,
                            },
                            fields: [
                                'name',
                                'aws_account',
                                'aws_iam_role',
                                'aws_s3_region',
                                'bucket_name',
                                'monthly_report_type',
                                'detail_report_type',
                            ],
                        },
                        {
                            label: 'Splunk-related Configuration',
                            options: {
                                isExpandable: false,
                            },
                            fields: ['initial_scan_datetime', 'sourcetype', 'index'],
                        },
                        {
                            label: 'Advanced Settings',
                            options: {
                                expand: false,
                                isExpandable: true,
                            },
                            fields: ['interval', 'report_file_match_reg', 'temp_folder'],
                        },
                    ],
                    entity: [
                        {
                            field: 'name',
                            label: 'Name',
                            type: 'text',
                            required: true,
                            validators: [
                                {
                                    type: 'regex',
                                    pattern: '^[^%<>/\\^$]+$',
                                    errorMsg:
                                        'Please enter name without special characters ^%<>/\\^$',
                                },
                            ],
                        },
                        {
                            field: 'aws_account',
                            label: 'AWS Account',
                            type: 'singleSelect',
                            required: true,
                            options: {
                                endpointUrl: 'splunk_ta_aws_aws_all_accounts',
                            },
                        },
                        {
                            field: 'aws_iam_role',
                            label: 'Assume Role',
                            type: 'singleSelect',
                            defaultValue: '',
                            options: {
                                referenceName: 'iam_roles',
                            },
                        },
                        {
                            field: 'aws_s3_region',
                            label: 'AWS Region',
                            type: 'singleSelect',
                            help: 'Select region only if you want to use regional endpoints for making every API calls.',
                            options: {
                                endpointUrl:
                                    'splunk_ta_aws/splunk_ta_aws_regions?aws_service=aws_s3',
                                labelField: 'label',
                                dependencies: ['aws_account'],
                            },
                        },
                        {
                            field: 'host_name',
                            label: 'S3 Host Name',
                            type: 'text',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'bucket_name',
                            label: 'S3 Bucket',
                            type: 'singleSelect',
                            required: true,
                            options: {
                                disableonEdit: true,
                                dependencies: ['aws_account', 'aws_iam_role', 'aws_s3_region'],
                                endpointUrl: 'splunk_ta_aws/splunk_ta_aws_s3buckets',
                            },
                        },
                        {
                            field: 'monthly_report_type',
                            label: 'Monthly Report',
                            type: 'singleSelect',
                            defaultValue: 'Monthly cost allocation report',
                            options: {
                                disableonEdit: true,
                                autoCompleteFields: [
                                    {
                                        label: 'None',
                                        value: 'None',
                                    },
                                    {
                                        label: 'Monthly report',
                                        value: 'Monthly report',
                                    },
                                    {
                                        label: 'Monthly cost allocation report',
                                        value: 'Monthly cost allocation report',
                                    },
                                ],
                            },
                        },
                        {
                            field: 'detail_report_type',
                            label: 'Detail Report',
                            type: 'singleSelect',
                            defaultValue: 'Detailed billing report with resources and tags',
                            options: {
                                disableonEdit: true,
                                autoCompleteFields: [
                                    {
                                        label: 'None',
                                        value: 'None',
                                    },
                                    {
                                        label: 'Detailed billing report',
                                        value: 'Detailed billing report',
                                    },
                                    {
                                        label: 'Detailed billing report with resources and tags',
                                        value: 'Detailed billing report with resources and tags',
                                    },
                                ],
                            },
                        },
                        {
                            field: 'report_file_match_reg',
                            label: 'Regex for Report Selection',
                            type: 'text',
                            tooltip:
                                'A regular expression that the Splunk platform uses to match reports in AWS. This expression overrides values in the monthly_report_type and detail_report_type arguments.',
                        },
                        {
                            field: 'temp_folder',
                            label: 'Temp Folder',
                            type: 'text',
                            tooltip:
                                'Full path to a non-default folder with sufficient space for temporarily storing downloaded detailed billing report .zip files. ',
                        },
                        {
                            field: 'recursion_depth',
                            label: 'recursion_depth',
                            type: 'text',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'monthly_timestamp_select_column_list',
                            label: 'monthly_timestamp_select',
                            type: 'text',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'detail_timestamp_select_column_list',
                            label: 'detail_timestamp_select',
                            type: 'text',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'time_format_list',
                            label: 'time_format_list',
                            type: 'text',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'max_file_size_csv_in_bytes',
                            label: 'max_file_size_csv_in_bytes',
                            type: 'text',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'max_file_size_csv_zip_in_bytes',
                            label: 'max_file_size_csv_zip_in_bytes',
                            type: 'text',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'header_look_up_max_lines',
                            label: 'header_look_up_max_lines',
                            type: 'text',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'header_magic_regex',
                            label: 'header_magic_regex',
                            type: 'text',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'monthly_real_timestamp_extraction',
                            label: 'monthly_real_timestamp',
                            type: 'text',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'monthly_real_timestamp_format_reg_list',
                            label: 'monthly_real_timestamp_format',
                            type: 'text',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'interval',
                            label: 'Interval (in seconds)',
                            type: 'text',
                            defaultValue: 86400,
                            validators: [
                                {
                                    type: 'number',
                                    range: [0, 31536000],
                                },
                            ],
                        },
                        {
                            field: 'initial_scan_datetime',
                            label: 'Start Date/Time (UTC)',
                            type: 'text',
                            help: 'e.g., 2000-01-01T00:00:00Z',
                            options: {
                                disableonEdit: true,
                            },
                            validators: [
                                {
                                    type: 'regex',
                                    pattern: '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$',
                                    errorMsg:
                                        'Please enter a correct date format. e.g., 2000-01-01T00:00:00Z',
                                },
                            ],
                        },
                        {
                            field: 'sourcetype',
                            label: 'Source Type',
                            type: 'text',
                            defaultValue: 'aws:billing',
                        },
                        {
                            field: 'index',
                            label: 'Index',
                            type: 'singleSelect',
                            required: true,
                            defaultValue: 'default',
                            options: {
                                createSearchChoice: true,
                                endpointUrl: 'data/indexes',
                                denyList: '^_.*$',
                            },
                        },
                    ],
                },
                {
                    name: 'aws_cloudtrail',
                    title: 'CloudTrail',
                    style: 'page',
                    hook: {
                        src: 'Hook',
                        type: 'external',
                    },
                    restHandlerName: 'aws_cloudtrail_inputs_rh',
                    groups: [
                        {
                            label: 'AWS Input Configuration',
                            options: {
                                isExpandable: false,
                            },
                            fields: [
                                'name',
                                'aws_account',
                                'aws_region',
                                'private_endpoint_enabled',
                                'sqs_private_endpoint_url',
                                's3_private_endpoint_url',
                                'sts_private_endpoint_url',
                                'sqs_queue',
                            ],
                        },
                        {
                            label: 'Splunk-related Configuration',
                            options: {
                                isExpandable: false,
                            },
                            fields: ['sourcetype', 'index'],
                        },
                        {
                            label: 'Advanced Settings',
                            options: {
                                expand: false,
                                isExpandable: true,
                            },
                            fields: [
                                'exclude_describe_events',
                                'blacklist',
                                'excluded_events_index',
                                'interval',
                            ],
                        },
                    ],
                    entity: [
                        {
                            field: 'name',
                            label: 'Name',
                            type: 'text',
                            required: true,
                            validators: [
                                {
                                    type: 'regex',
                                    pattern: '^[^%<>/\\^$]+$',
                                    errorMsg:
                                        'Please enter name without special characters ^%<>/\\^$',
                                },
                            ],
                        },
                        {
                            field: 'aws_account',
                            label: 'AWS Account',
                            type: 'singleSelect',
                            required: true,
                            options: {
                                endpointUrl: 'splunk_ta_aws_aws_all_accounts',
                            },
                        },
                        {
                            field: 'aws_region',
                            label: 'AWS Region',
                            type: 'singleSelect',
                            required: true,
                            options: {
                                endpointUrl:
                                    'splunk_ta_aws/splunk_ta_aws_regions?aws_service=aws_cloudtrail',
                                labelField: 'label',
                                dependencies: ['aws_account'],
                            },
                        },
                        {
                            field: 'private_endpoint_enabled',
                            label: 'Use Private Endpoints',
                            type: 'custom',
                            defaultValue: 0,
                            options: {
                                src: 'PrivateEndpointInput',
                                type: 'external',
                            },
                        },
                        {
                            field: 'sqs_private_endpoint_url',
                            label: 'Private Endpoint (SQS)',
                            type: 'text',
                            help: 'Ex: https://vpce-<endpoint_id>-<unique_id>.sqs.<region>.vpce.amazonaws.com',
                            defaultValue: '',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 's3_private_endpoint_url',
                            label: 'Private Endpoint (S3)',
                            type: 'text',
                            help: 'Ex: https://bucket.vpce-<endpoint_id>-<unique_id>.s3.<region>.vpce.amazonaws.com',
                            defaultValue: '',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'sts_private_endpoint_url',
                            label: 'Private Endpoint (STS)',
                            type: 'text',
                            help: 'Ex: https://vpce-<endpoint_id>-<unique_id>.sts.<region>.vpce.amazonaws.com',
                            defaultValue: '',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'sqs_queue',
                            label: 'SQS Queue',
                            type: 'singleSelect',
                            required: true,
                            options: {
                                endpointUrl: 'splunk_ta_aws/splunk_ta_aws_sqs_queue_names',
                                labelField: 'sqs_queue',
                                dependencies: [
                                    'aws_account',
                                    'aws_region',
                                    'private_endpoint_enabled',
                                    'sqs_private_endpoint_url',
                                    'sts_private_endpoint_url',
                                ],
                            },
                        },
                        {
                            field: 'remove_files_when_done',
                            label: 'Remove Logs When Done',
                            type: 'checkbox',
                            defaultValue: 0,
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'exclude_describe_events',
                            label: 'Exclude Read-only Events',
                            type: 'checkbox',
                            tooltip:
                                'A boolean value indicating whether or not to exclude certain events, such as read-only events that can produce a high volume of data.',
                            defaultValue: 1,
                        },
                        {
                            field: 'blacklist',
                            label: 'Blacklist for Exclusion',
                            type: 'text',
                            tooltip:
                                'A PCRE regular expression that specifies event names to if exclude_describe_events is set to true. Leave blank to use the default regex, ^(?:Describe|List|Get).',
                        },
                        {
                            field: 'excluded_events_index',
                            label: 'Excluded Events Index',
                            type: 'singleSelect',
                            tooltip:
                                'The name of the index in which the Splunk platform should put excluded events. Default is empty, which discards the events.',
                            options: {
                                createSearchChoice: true,
                                endpointUrl: 'data/indexes',
                                denyList: '^_.*$',
                            },
                        },
                        {
                            field: 'interval',
                            label: 'Interval (in seconds)',
                            type: 'text',
                            defaultValue: 30,
                            validators: [
                                {
                                    type: 'number',
                                    range: [0, 31536000],
                                },
                            ],
                        },
                        {
                            field: 'sourcetype',
                            label: 'Source Type',
                            type: 'text',
                            defaultValue: 'aws:cloudtrail',
                        },
                        {
                            field: 'index',
                            label: 'Index',
                            type: 'singleSelect',
                            required: true,
                            defaultValue: 'default',
                            options: {
                                createSearchChoice: true,
                                endpointUrl: 'data/indexes',
                                denyList: '^_.*$',
                            },
                        },
                    ],
                },
                {
                    name: 'aws_cloudwatch',
                    title: 'CloudWatch',
                    style: 'page',
                    hook: {
                        src: 'Hook',
                        type: 'external',
                    },
                    restHandlerName: 'aws_cloudwatch_inputs_rh',
                    groups: [
                        {
                            label: 'AWS Input Configuration',
                            options: {
                                isExpandable: false,
                            },
                            fields: [
                                'name',
                                'aws_account',
                                'aws_iam_role',
                                'aws_region',
                                'private_endpoint_enabled',
                                'sts_private_endpoint_url',
                                'monitoring_private_endpoint_url',
                                'elb_private_endpoint_url',
                                'ec2_private_endpoint_url',
                                'autoscaling_private_endpoint_url',
                                'lambda_private_endpoint_url',
                                's3_private_endpoint_url',
                                'metric_namespace',
                            ],
                        },
                        {
                            label: 'Splunk-related Configuration',
                            options: {
                                isExpandable: false,
                            },
                            fields: ['sourcetype', 'index'],
                        },
                        {
                            label: 'Advanced Settings',
                            options: {
                                expand: false,
                                isExpandable: true,
                            },
                            fields: ['period'],
                        },
                    ],
                    entity: [
                        {
                            field: 'name',
                            label: 'Name',
                            type: 'text',
                            required: true,
                            validators: [
                                {
                                    type: 'regex',
                                    pattern: '^[^%<>/\\^$]+$',
                                    errorMsg:
                                        'Please enter name without special characters ^%<>/\\^$',
                                },
                            ],
                        },
                        {
                            field: 'aws_account',
                            label: 'AWS Account',
                            type: 'singleSelect',
                            required: true,
                            options: {
                                endpointUrl: 'splunk_ta_aws_aws_all_accounts',
                            },
                        },
                        {
                            field: 'aws_iam_role',
                            label: 'Assume Role',
                            type: 'singleSelect',
                            options: {
                                referenceName: 'iam_roles',
                            },
                        },
                        {
                            field: 'aws_region',
                            label: 'AWS Regions',
                            type: 'multipleSelect',
                            required: true,
                            options: {
                                delimiter: ',',
                                endpointUrl:
                                    'splunk_ta_aws/splunk_ta_aws_regions?aws_service=aws_cloudwatch',
                                labelField: 'label',
                                dependencies: ['aws_account'],
                            },
                        },
                        {
                            field: 'private_endpoint_enabled',
                            label: 'Use Private Endpoints',
                            type: 'custom',
                            tooltip:
                                'Private endpoints are optional. Please provide endpoints based on selected metric configurations.',
                            defaultValue: 0,
                            options: {
                                src: 'PrivateEndpointInput',
                                type: 'external',
                            },
                        },
                        {
                            field: 'sts_private_endpoint_url',
                            label: 'Private Endpoint (STS)',
                            type: 'text',
                            help: 'Ex: https://vpce-<endpoint_id>-<unique_id>.sts.<region>.vpce.amazonaws.com',
                            defaultValue: '',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'monitoring_private_endpoint_url',
                            label: 'Private Endpoint (Monitoring)',
                            type: 'text',
                            help: 'Ex: https://vpce-<endpoint_id>-<unique_id>.monitoring.<region>.vpce.amazonaws.com',
                            defaultValue: '',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'elb_private_endpoint_url',
                            label: 'Private Endpoint (ELB)',
                            type: 'text',
                            help: 'Ex: https://vpce-<endpoint_id>-<unique_id>.elasticloadbalancing.<region>.vpce.amazonaws.com',
                            defaultValue: '',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'ec2_private_endpoint_url',
                            label: 'Private Endpoint (EC2)',
                            type: 'text',
                            help: 'Ex: https://vpce-<endpoint_id>-<unique_id>.ec2.<region>.vpce.amazonaws.com',
                            defaultValue: '',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'autoscaling_private_endpoint_url',
                            label: 'Private Endpoint (Autoscaling)',
                            type: 'text',
                            help: 'Ex: https://vpce-<endpoint_id>-<unique_id>.autoscaling.<region>.vpce.amazonaws.com',
                            defaultValue: '',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'lambda_private_endpoint_url',
                            label: 'Private Endpoint (Lambda)',
                            type: 'text',
                            help: 'Ex: https://vpce-<endpoint_id>-<unique_id>.lambda.<region>.vpce.amazonaws.com',
                            defaultValue: '',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 's3_private_endpoint_url',
                            label: 'Private Endpoint (S3)',
                            type: 'text',
                            help: 'Ex: https://bucket.vpce-<endpoint_id>-<unique_id>.s3.<region>.vpce.amazonaws.com',
                            defaultValue: '',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'metric_namespace',
                            label: 'Metrics Configuration',
                            type: 'custom',
                            options: {
                                src: 'MetricsConfigurationView',
                                type: 'external',
                            },
                        },
                        {
                            field: 'metric_names',
                            label: 'metric_names',
                            type: 'text',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'metric_dimensions',
                            label: 'metric_dimensions',
                            type: 'text',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'statistics',
                            label: 'statistics',
                            type: 'text',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'polling_interval',
                            label: 'Polling Interval (in seconds)',
                            type: 'text',
                            defaultValue: '3600',
                            help: 'Input a number multiple of "Granularity" field.',
                            validators: [
                                {
                                    type: 'number',
                                    range: [60, 86400],
                                },
                            ],
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'period',
                            label: 'Period',
                            type: 'text',
                            tooltip:
                                'The granularity, in seconds, of the returned data points. The period can be as short as one minute (60 seconds) and must be a multiple of 60',
                            defaultValue: '300',
                            validators: [
                                {
                                    type: 'number',
                                    range: [60, 86400],
                                },
                            ],
                        },
                        {
                            field: 'sourcetype',
                            label: 'Source Type',
                            type: 'text',
                            defaultValue: 'aws:cloudwatch',
                        },
                        {
                            field: 'index',
                            label: 'Index',
                            type: 'singleSelect',
                            required: true,
                            defaultValue: 'default',
                            options: {
                                createSearchChoice: true,
                                endpointUrl: 'data/indexes',
                                denyList: '^_.*$',
                            },
                        },
                        {
                            field: 'use_metric_format',
                            label: 'Use Metric Format',
                            type: 'text',
                            defaultValue: 'false',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'metric_expiration',
                            label: 'metric_expiration',
                            type: 'text',
                            defaultValue: '3600',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'query_window_size',
                            label: 'query_window_size',
                            type: 'text',
                            defaultValue: '7200',
                            options: {
                                display: false,
                            },
                        },
                    ],
                },
                {
                    name: 'aws_cloudwatch_logs',
                    title: 'CloudWatch Logs',
                    conf: 'aws_cloudwatch_logs_tasks',
                    style: 'page',
                    hook: {
                        src: 'Hook',
                        type: 'external',
                    },
                    restHandlerName: 'aws_cloudwatch_logs_inputs_rh',
                    groups: [
                        {
                            label: 'AWS Input Configuration',
                            options: {
                                isExpandable: false,
                            },
                            fields: [
                                'name',
                                'account',
                                'region',
                                'private_endpoint_enabled',
                                'logs_private_endpoint_url',
                                'sts_private_endpoint_url',
                                'groups',
                            ],
                        },
                        {
                            label: 'Splunk-related Configuration',
                            options: {
                                isExpandable: false,
                            },
                            fields: ['stream_matcher', 'only_after', 'sourcetype', 'index'],
                        },
                        {
                            label: 'Advanced Settings',
                            options: {
                                expand: false,
                                isExpandable: true,
                            },
                            fields: ['delay', 'interval'],
                        },
                    ],
                    entity: [
                        {
                            field: 'name',
                            label: 'Name',
                            type: 'text',
                            required: true,
                            validators: [
                                {
                                    type: 'regex',
                                    pattern: '^[^%<>/\\^$]+$',
                                    errorMsg:
                                        'Please enter name without special characters ^%<>/\\^$',
                                },
                            ],
                        },
                        {
                            field: 'account',
                            label: 'AWS Account',
                            type: 'singleSelect',
                            required: true,
                            options: {
                                endpointUrl: 'splunk_ta_aws_aws_all_accounts',
                            },
                        },
                        {
                            field: 'region',
                            label: 'AWS Region',
                            type: 'singleSelect',
                            required: true,
                            options: {
                                endpointUrl:
                                    'splunk_ta_aws/splunk_ta_aws_regions?aws_service=aws_cloudwatch_logs',
                                labelField: 'label',
                                dependencies: ['account'],
                            },
                        },
                        {
                            field: 'private_endpoint_enabled',
                            label: 'Use Private Endpoints',
                            type: 'custom',
                            defaultValue: 0,
                            options: {
                                src: 'PrivateEndpointInput',
                                type: 'external',
                            },
                        },
                        {
                            field: 'logs_private_endpoint_url',
                            label: 'Private Endpoint (Logs)',
                            type: 'text',
                            help: 'Ex: https://vpce-<endpoint_id>-<unique_id>.logs.<region>.vpce.amazonaws.com',
                            defaultValue: '',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'sts_private_endpoint_url',
                            label: 'Private Endpoint (STS)',
                            type: 'text',
                            help: 'Ex: https://vpce-<endpoint_id>-<unique_id>.sts.<region>.vpce.amazonaws.com',
                            defaultValue: '',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'groups',
                            label: 'Log Group',
                            type: 'text',
                            tooltip: 'A comma-separated list of log group names.',
                            required: true,
                            options: {
                                disableonEdit: true,
                            },
                        },
                        {
                            field: 'delay',
                            label: 'Delay',
                            type: 'text',
                            defaultValue: 1800,
                            options: {
                                display: false,
                            },
                            validators: [
                                {
                                    type: 'number',
                                    range: [0, 31536000],
                                },
                            ],
                        },
                        {
                            field: 'only_after',
                            label: 'Only After',
                            type: 'text',
                            defaultValue: '1970-01-01T00:00:00',
                            validators: [
                                {
                                    type: 'regex',
                                    pattern: '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}$',
                                    errorMsg:
                                        'Please enter a correct date format. e.g., 1970-01-01T00:00:00',
                                },
                            ],
                        },
                        {
                            field: 'stream_matcher',
                            label: 'Stream Matching Regex',
                            type: 'text',
                            tooltip: 'REGEX to strictly match stream names. Defaults to .*',
                            defaultValue: '.*',
                        },
                        {
                            field: 'interval',
                            label: 'Interval (in seconds)',
                            type: 'text',
                            defaultValue: 600,
                            validators: [
                                {
                                    type: 'number',
                                    range: [0, 31536000],
                                },
                            ],
                        },
                        {
                            field: 'sourcetype',
                            label: 'Source Type',
                            type: 'text',
                            defaultValue: 'aws:cloudwatchlogs',
                        },
                        {
                            field: 'index',
                            label: 'Index',
                            type: 'singleSelect',
                            required: true,
                            defaultValue: 'default',
                            options: {
                                createSearchChoice: true,
                                endpointUrl: 'data/indexes',
                                denyList: '^_.*$',
                            },
                        },
                    ],
                },
                {
                    name: 'aws_config',
                    title: 'Config',
                    style: 'page',
                    hook: {
                        src: 'Hook',
                        type: 'external',
                    },
                    restHandlerName: 'aws_config_inputs_rh',
                    groups: [
                        {
                            label: 'AWS Input Configuration',
                            options: {
                                isExpandable: false,
                            },
                            fields: ['name', 'aws_account', 'aws_region', 'sqs_queue'],
                        },
                        {
                            label: 'Splunk-related Configuration',
                            options: {
                                isExpandable: false,
                            },
                            fields: ['sourcetype', 'index'],
                        },
                        {
                            label: 'Advanced Settings',
                            options: {
                                expand: false,
                                isExpandable: true,
                            },
                            fields: ['polling_interval'],
                        },
                    ],
                    entity: [
                        {
                            field: 'name',
                            label: 'Name',
                            type: 'text',
                            required: true,
                            validators: [
                                {
                                    type: 'regex',
                                    pattern: '^[^%<>/\\^$]+$',
                                    errorMsg:
                                        'Please enter name without special characters ^%<>/\\^$',
                                },
                            ],
                        },
                        {
                            field: 'aws_account',
                            label: 'AWS Account',
                            type: 'singleSelect',
                            required: true,
                            options: {
                                endpointUrl: 'splunk_ta_aws_aws_all_accounts',
                            },
                        },
                        {
                            field: 'aws_region',
                            label: 'SQS Configuration',
                            type: 'custom',
                            options: {
                                src: 'GroupSelection',
                                type: 'external',
                            },
                        },
                        {
                            field: 'sqs_queue',
                            label: 'SQS Queues',
                            type: 'text',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'enable_additional_notifications',
                            label: 'additional_notifications',
                            type: 'text',
                            defaultValue: 0,
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'polling_interval',
                            label: 'Polling Interval (in seconds)',
                            type: 'text',
                            defaultValue: 30,
                            validators: [
                                {
                                    type: 'number',
                                    range: [0, 31536000],
                                },
                            ],
                        },
                        {
                            field: 'interval',
                            label: 'Interval (in seconds)',
                            type: 'text',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'sourcetype',
                            label: 'Source Type',
                            type: 'text',
                            defaultValue: 'aws:config',
                        },
                        {
                            field: 'index',
                            label: 'Index',
                            type: 'singleSelect',
                            required: true,
                            defaultValue: 'default',
                            options: {
                                createSearchChoice: true,
                                endpointUrl: 'data/indexes',
                                denyList: '^_.*$',
                            },
                        },
                    ],
                },
                {
                    name: 'aws_config_rule',
                    title: 'Config Rules',
                    conf: 'aws_config_rule_tasks',
                    style: 'page',
                    hook: {
                        src: 'Hook',
                        type: 'external',
                    },
                    restHandlerName: 'aws_config_rule_inputs_rh',
                    groups: [
                        {
                            label: 'AWS Input Configuration',
                            options: {
                                isExpandable: false,
                            },
                            fields: ['name', 'account', 'aws_iam_role', 'region'],
                        },
                        {
                            label: 'Splunk-related Configuration',
                            options: {
                                isExpandable: false,
                            },
                            fields: ['sourcetype', 'index'],
                        },
                        {
                            label: 'Advanced Settings',
                            options: {
                                expand: false,
                                isExpandable: true,
                            },
                            fields: ['polling_interval'],
                        },
                    ],
                    entity: [
                        {
                            field: 'name',
                            label: 'Name',
                            type: 'text',
                            required: true,
                            validators: [
                                {
                                    type: 'regex',
                                    pattern: '^[^%<>/\\^$]+$',
                                    errorMsg:
                                        'Please enter name without special characters ^%<>/\\^$',
                                },
                            ],
                        },
                        {
                            field: 'account',
                            label: 'AWS Account',
                            type: 'singleSelect',
                            required: true,
                            options: {
                                endpointUrl: 'splunk_ta_aws_aws_all_accounts',
                            },
                        },
                        {
                            field: 'aws_iam_role',
                            label: 'Assume Role',
                            type: 'singleSelect',
                            defaultValue: '',
                            options: {
                                referenceName: 'iam_roles',
                            },
                        },
                        {
                            field: 'region',
                            label: 'Rules Configuration',
                            type: 'custom',
                            required: true,
                            options: {
                                src: 'GroupSelection',
                                type: 'external',
                            },
                        },
                        {
                            field: 'rule_names',
                            label: 'Rule Names',
                            type: 'text',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'polling_interval',
                            label: 'Polling Interval (in seconds)',
                            type: 'text',
                            required: true,
                            defaultValue: 300,
                            validators: [
                                {
                                    type: 'number',
                                    range: [0, 31536000],
                                },
                            ],
                        },
                        {
                            field: 'sourcetype',
                            label: 'Source Type',
                            type: 'text',
                            defaultValue: 'aws:config:rule',
                        },
                        {
                            field: 'index',
                            label: 'Index',
                            type: 'singleSelect',
                            required: true,
                            defaultValue: 'default',
                            options: {
                                createSearchChoice: true,
                                endpointUrl: 'data/indexes',
                                denyList: '^_.*$',
                            },
                        },
                    ],
                },
                {
                    name: 'aws_metadata',
                    title: 'Metadata',
                    conf: 'aws_metadata_tasks',
                    style: 'page',
                    hook: {
                        src: 'Hook',
                        type: 'external',
                    },
                    restHandlerName: 'aws_metadata_inputs_rh',
                    groups: [
                        {
                            label: 'AWS Input Configuration',
                            options: {
                                isExpandable: false,
                            },
                            fields: ['name', 'account', 'aws_iam_role', 'regions', 'apis'],
                        },
                        {
                            label: 'Splunk-related Configuration',
                            options: {
                                isExpandable: false,
                            },
                            fields: ['sourcetype', 'index'],
                        },
                    ],
                    entity: [
                        {
                            field: 'name',
                            label: 'Name',
                            type: 'text',
                            required: true,
                        },
                        {
                            field: 'account',
                            label: 'AWS Account',
                            type: 'singleSelect',
                            required: true,
                            options: {
                                endpointUrl: 'splunk_ta_aws_aws_all_accounts',
                            },
                        },
                        {
                            field: 'aws_iam_role',
                            label: 'Assume Role',
                            type: 'singleSelect',
                            options: {
                                referenceName: 'iam_roles',
                            },
                        },
                        {
                            field: 'regions',
                            label: 'AWS Regions',
                            type: 'multipleSelect',
                            required: true,
                            options: {
                                delimiter: ',',
                                endpointUrl:
                                    'splunk_ta_aws/splunk_ta_aws_regions?aws_service=aws_metadata',
                                labelField: 'label',
                                dependencies: ['account'],
                            },
                        },
                        {
                            field: 'apis',
                            label: 'APIs/Interval (in seconds)',
                            type: 'custom',
                            options: {
                                src: 'MetadataAPI',
                                type: 'external',
                            },
                        },
                        {
                            field: 'sourcetype',
                            label: 'Source Type',
                            type: 'text',
                            defaultValue: 'aws:metadata',
                            required: true,
                        },
                        {
                            field: 'index',
                            label: 'Index',
                            type: 'singleSelect',
                            required: true,
                            defaultValue: 'default',
                            options: {
                                createSearchChoice: true,
                                endpointUrl: 'data/indexes',
                                denyList: '^_.*$',
                            },
                        },
                    ],
                },
                {
                    name: 'aws_s3',
                    title: 'Generic S3',
                    style: 'page',
                    hook: {
                        src: 'Hook',
                        type: 'external',
                    },
                    restHandlerName: 'aws_s3_inputs_rh',
                    groups: [
                        {
                            label: 'AWS Input Configuration',
                            options: {
                                isExpandable: false,
                            },
                            fields: [
                                'name',
                                'aws_account',
                                'aws_iam_role',
                                'aws_s3_region',
                                'private_endpoint_enabled',
                                's3_private_endpoint_url',
                                'sts_private_endpoint_url',
                                'bucket_name',
                                'key_name',
                                'detail_report_type',
                            ],
                        },
                        {
                            label: 'Splunk-related Configuration',
                            options: {
                                isExpandable: false,
                            },
                            fields: [
                                'initial_scan_datetime',
                                'terminal_scan_datetime',
                                'sourcetype',
                                'index',
                            ],
                        },
                        {
                            label: 'Advanced Settings',
                            options: {
                                expand: false,
                                isExpandable: true,
                            },
                            fields: [
                                'ct_blacklist',
                                'blacklist',
                                'whitelist',
                                'parse_csv_with_header',
                                'parse_csv_with_delimiter',
                                'polling_interval',
                            ],
                        },
                    ],
                    entity: [
                        {
                            field: 'name',
                            label: 'Name',
                            type: 'text',
                            required: true,
                            validators: [
                                {
                                    type: 'regex',
                                    pattern: '^[^%<>/\\^$]+$',
                                    errorMsg:
                                        'Please enter name without special characters ^%<>/\\^$',
                                },
                            ],
                        },
                        {
                            field: 'aws_account',
                            label: 'AWS Account',
                            type: 'singleSelect',
                            required: true,
                            options: {
                                endpointUrl: 'splunk_ta_aws_aws_all_accounts',
                            },
                        },
                        {
                            field: 'aws_iam_role',
                            label: 'Assume Role',
                            type: 'singleSelect',
                            defaultValue: '',
                            options: {
                                referenceName: 'iam_roles',
                            },
                        },
                        {
                            field: 'aws_s3_region',
                            label: 'AWS Region',
                            type: 'singleSelect',
                            help: 'Select region only if you want to use regional endpoints for making every API calls.',
                            options: {
                                endpointUrl:
                                    'splunk_ta_aws/splunk_ta_aws_regions?aws_service=aws_s3',
                                labelField: 'label',
                                dependencies: ['aws_account'],
                            },
                        },
                        {
                            field: 'private_endpoint_enabled',
                            label: 'Use Private Endpoints',
                            type: 'custom',
                            defaultValue: 0,
                            options: {
                                src: 'PrivateEndpointInput',
                                type: 'external',
                            },
                        },
                        {
                            field: 's3_private_endpoint_url',
                            label: 'Private Endpoint (S3)',
                            type: 'text',
                            help: 'Ex: https://bucket.vpce-<endpoint_id>-<unique_id>.s3.<region>.vpce.amazonaws.com',
                            defaultValue: '',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'sts_private_endpoint_url',
                            label: 'Private Endpoint (STS)',
                            type: 'text',
                            help: 'Ex: https://vpce-<endpoint_id>-<unique_id>.sts.<region>.vpce.amazonaws.com',
                            defaultValue: '',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'host_name',
                            label: 'S3 Host Name',
                            type: 'text',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'bucket_name',
                            label: 'S3 Bucket',
                            type: 'singleSelect',
                            required: true,
                            options: {
                                disableonEdit: true,
                                dependencies: [
                                    'aws_account',
                                    'aws_iam_role',
                                    'aws_s3_region',
                                    'private_endpoint_enabled',
                                    'sts_private_endpoint_url',
                                    's3_private_endpoint_url',
                                ],
                                endpointUrl: 'splunk_ta_aws/splunk_ta_aws_s3buckets',
                            },
                        },
                        {
                            field: 'polling_interval',
                            label: 'Polling Interval (in seconds)',
                            type: 'text',
                            defaultValue: 1800,
                            validators: [
                                {
                                    type: 'number',
                                    range: [0, 31536000],
                                },
                            ],
                        },
                        {
                            field: 'key_name',
                            label: 'S3 Key Prefix',
                            type: 'text',
                            options: {
                                disableonEdit: true,
                            },
                        },
                        {
                            field: 'parse_csv_with_header',
                            label: 'Parse all files as CSV',
                            type: 'custom',
                            tooltip:
                                'All files will be parsed as CSV with the first line considered the header.',
                            defaultValue: 0,
                            options: {
                                src: 'ParseAsDelimitedFileInput',
                                type: 'external',
                            },
                        },
                        {
                            field: 'parse_csv_with_delimiter',
                            label: 'CSV field delimiter',
                            type: 'text',
                            defaultValue: ',',
                            required: true,
                            tooltip:
                                'Delimiter must be one character. The character cannot be alphanumeric, single quote, or double quote. Tab-delimited files will be \\t',
                            validators: [
                                {
                                    type: 'string',
                                    minLength: 1,
                                    maxLength: 2,
                                    errorMsg:
                                        'Length of the delimiter is restricted to 1 character.',
                                },
                                {
                                    type: 'regex',
                                    pattern: '^[^\\d\\w\\\'\\"]{1,2}',
                                    errorMsg:
                                        'Delimiter must be one character. The character cannot be empty, alphanumeric, single quote, or double quote.',
                                },
                            ],
                        },
                        {
                            field: 'initial_scan_datetime',
                            label: 'Start Date/Time',
                            type: 'text',
                            help: 'e.g., 2000-01-01T00:00:00Z',
                            validators: [
                                {
                                    type: 'regex',
                                    pattern: '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$',
                                    errorMsg:
                                        'Please enter a correct date format. e.g., 2000-01-01T00:00:00Z',
                                },
                            ],
                        },
                        {
                            field: 'terminal_scan_datetime',
                            label: 'End Date/Time',
                            type: 'text',
                            defaultValue: '',
                            help: 'e.g., 2000-01-01T00:00:00Z (optional)',
                            validators: [
                                {
                                    type: 'regex',
                                    pattern: '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$',
                                    errorMsg:
                                        'Please enter a correct date format. e.g., 2000-01-01T00:00:00Z',
                                },
                            ],
                        },
                        {
                            field: 'ct_blacklist',
                            label: 'CloudTrail Event Blacklist',
                            type: 'text',
                            tooltip:
                                'A PCRE regular expression that specifies event names to exclude. The default regex is ^$ to exclude events that can produce a high volume of data. Leave it blank if you want all data to be indexed.',
                            defaultValue: '^$',
                        },
                        {
                            field: 'blacklist',
                            label: 'Blacklist',
                            type: 'text',
                            tooltip:
                                'A regular expression to indicate the S3 paths that the Splunk platform should exclude from scanning. Regex should match the path starting from folder name.',
                            help: 'For example, for excluding contents of folder Test, provide regex as Test/.*',
                        },
                        {
                            field: 'whitelist',
                            label: 'Whitelist',
                            type: 'text',
                            tooltip:
                                'A regular expression to indicate the S3 paths the Splunk platform should scan. Regex should match the path starting from folder name. Whitelist overrides blacklist.',
                            help: 'For example, for including contents of folder Test, provide regex as Test/.*',
                        },
                        {
                            field: 'sourcetype',
                            label: 'Source Type',
                            type: 'singleSelect',
                            required: true,
                            defaultValue: 'aws:s3',
                            options: {
                                createSearchChoice: true,
                                autoCompleteFields: [
                                    {
                                        label: 'aws:s3',
                                        value: 'aws:s3',
                                    },
                                    {
                                        label: 'aws:s3:csv',
                                        value: 'aws:s3:csv',
                                    },
                                    {
                                        label: 'aws:cloudtrail',
                                        value: 'aws:cloudtrail',
                                    },
                                    {
                                        label: 'aws:s3:accesslogs',
                                        value: 'aws:s3:accesslogs',
                                    },
                                    {
                                        label: 'aws:cloudfront:accesslogs',
                                        value: 'aws:cloudfront:accesslogs',
                                    },
                                    {
                                        label: 'aws:elb:accesslogs',
                                        value: 'aws:elb:accesslogs',
                                    },
                                ],
                            },
                        },
                        {
                            field: 'index',
                            label: 'Index',
                            type: 'singleSelect',
                            required: true,
                            defaultValue: 'default',
                            options: {
                                createSearchChoice: true,
                                endpointUrl: 'data/indexes',
                                denyList: '^_.*$',
                            },
                        },
                        {
                            field: 'ct_excluded_events_index',
                            label: 'ct_excluded_events_index',
                            type: 'text',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'max_retries',
                            label: 'max_retries',
                            type: 'text',
                            defaultValue: 3,
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'recursion_depth',
                            label: 'recursion_depth',
                            type: 'text',
                            defaultValue: -1,
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'max_items',
                            label: 'max_items',
                            type: 'text',
                            defaultValue: 100000,
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'character_set',
                            label: 'character_set',
                            type: 'text',
                            defaultValue: 'auto',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'is_secure',
                            label: 'is_secure',
                            type: 'text',
                            options: {
                                display: false,
                            },
                        },
                    ],
                },
                {
                    name: 'splunk_ta_aws_logs',
                    title: 'Incremental S3',
                    style: 'page',
                    hook: {
                        src: 'Hook',
                        type: 'external',
                    },
                    restHandlerName: 'aws_logs_inputs_rh',
                    groups: [
                        {
                            label: 'AWS Input Configuration',
                            options: {
                                isExpandable: false,
                            },
                            fields: [
                                'name',
                                'aws_account',
                                'aws_iam_role',
                                'aws_s3_region',
                                'private_endpoint_enabled',
                                's3_private_endpoint_url',
                                'sts_private_endpoint_url',
                                'bucket_name',
                                'log_file_prefix',
                                'log_file_prefix_help_link',
                            ],
                        },
                        {
                            label: 'Splunk-related Configuration',
                            options: {
                                isExpandable: false,
                            },
                            fields: [
                                'log_type',
                                'log_start_date',
                                'distribution_id',
                                'sourcetype',
                                'index',
                            ],
                        },
                        {
                            label: 'Advanced Settings',
                            options: {
                                expand: false,
                                isExpandable: true,
                            },
                            fields: ['interval'],
                        },
                    ],
                    entity: [
                        {
                            field: 'name',
                            label: 'Name',
                            type: 'text',
                            required: true,
                            validators: [
                                {
                                    type: 'regex',
                                    pattern: '^[^%<>/\\^$]+$',
                                    errorMsg:
                                        'Please enter name without special characters ^%<>/\\^$',
                                },
                            ],
                        },
                        {
                            field: 'aws_account',
                            label: 'AWS Account',
                            type: 'singleSelect',
                            required: true,
                            options: {
                                endpointUrl: 'splunk_ta_aws_aws_all_accounts',
                            },
                        },
                        {
                            field: 'aws_iam_role',
                            label: 'Assume Role',
                            type: 'singleSelect',
                            defaultValue: '',
                            options: {
                                referenceName: 'iam_roles',
                            },
                        },
                        {
                            field: 'host_name',
                            label: 'S3 Host Name',
                            type: 'text',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'aws_s3_region',
                            label: 'AWS Region',
                            type: 'singleSelect',
                            help: 'Select region only if you want to use regional endpoints for making every API calls.',
                            options: {
                                endpointUrl:
                                    'splunk_ta_aws/splunk_ta_aws_regions?aws_service=aws_s3',
                                labelField: 'label',
                                dependencies: ['aws_account'],
                            },
                        },
                        {
                            field: 'private_endpoint_enabled',
                            label: 'Use Private Endpoints',
                            type: 'custom',
                            defaultValue: 0,
                            options: {
                                src: 'PrivateEndpointInput',
                                type: 'external',
                            },
                        },
                        {
                            field: 's3_private_endpoint_url',
                            label: 'Private Endpoint (S3)',
                            type: 'text',
                            help: 'Ex: https://bucket.vpce-<endpoint_id>-<unique_id>.s3.<region>.vpce.amazonaws.com',
                            defaultValue: '',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'sts_private_endpoint_url',
                            label: 'Private Endpoint (STS)',
                            type: 'text',
                            help: 'Ex: https://vpce-<endpoint_id>-<unique_id>.sts.<region>.vpce.amazonaws.com',
                            defaultValue: '',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'bucket_name',
                            label: 'S3 Bucket',
                            type: 'singleSelect',
                            required: true,
                            options: {
                                disableonEdit: true,
                                dependencies: [
                                    'aws_account',
                                    'aws_iam_role',
                                    'aws_s3_region',
                                    'private_endpoint_enabled',
                                    'sts_private_endpoint_url',
                                    's3_private_endpoint_url',
                                ],
                                endpointUrl: 'splunk_ta_aws/splunk_ta_aws_s3buckets',
                            },
                        },
                        {
                            field: 'interval',
                            label: 'Interval (in seconds)',
                            type: 'text',
                            defaultValue: 1800,
                            validators: [
                                {
                                    type: 'number',
                                    range: [0, 31536000],
                                },
                            ],
                        },
                        {
                            field: 'log_type',
                            label: 'Log Type',
                            type: 'singleSelect',
                            required: true,
                            options: {
                                disableonEdit: true,
                                autoCompleteFields: [
                                    {
                                        label: 'CloudTrail Logs',
                                        value: 'cloudtrail',
                                    },
                                    {
                                        label: 'S3 Access Logs',
                                        value: 's3:accesslogs',
                                    },
                                    {
                                        label: 'CloudFront Access Logs',
                                        value: 'cloudfront:accesslogs',
                                    },
                                    {
                                        label: 'ELB Access Logs',
                                        value: 'elb:accesslogs',
                                    },
                                ],
                            },
                        },
                        {
                            field: 'log_file_prefix',
                            label: 'Log File Prefix',
                            type: 'text',
                            tooltip:
                                'Configure the prefix of the log file. This add-on will search the log files under this prefix. The locations of the log files are different for each S3 incremental log type.',
                            options: {
                                disableonEdit: true,
                            },
                        },
                        {
                            field: 'log_file_prefix_help_link',
                            label: '',
                            type: 'helpLink',
                            options: {
                                text: 'Learn more',
                                link: '/help?location=[AddOns:released]aws.configure_aws.configure_sqs',
                            },
                        },
                        {
                            field: 'log_start_date',
                            label: 'Log Start Date',
                            type: 'text',
                            required: true,
                            options: {
                                disableonEdit: true,
                            },
                            validators: [
                                {
                                    type: 'regex',
                                    pattern: '^\\d{4}-\\d{2}-\\d{2}$',
                                    errorMsg:
                                        'Please enter a correct date format. e.g., 2000-01-01',
                                },
                            ],
                        },
                        {
                            field: 'distribution_id',
                            label: 'Distribution ID',
                            type: 'text',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'sourcetype',
                            label: 'Source Type',
                            type: 'text',
                            defaultValue: 'aws:s3',
                        },
                        {
                            field: 'index',
                            label: 'Index',
                            type: 'singleSelect',
                            required: true,
                            defaultValue: 'default',
                            options: {
                                createSearchChoice: true,
                                endpointUrl: 'data/indexes',
                                denyList: '^_.*$',
                            },
                        },
                        {
                            field: 'bucket_region',
                            label: 'bucket_region',
                            type: 'text',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'log_name_format',
                            label: 'log_name_format',
                            type: 'text',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'max_fails',
                            label: 'max_fails',
                            type: 'text',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'max_number_of_process',
                            label: 'max_number_of_process',
                            type: 'text',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'max_number_of_thread',
                            label: 'max_number_of_thread',
                            type: 'text',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'max_retries',
                            label: 'max_retries',
                            type: 'text',
                            options: {
                                display: false,
                            },
                        },
                    ],
                },
                {
                    name: 'aws_inspector',
                    title: 'Inspector',
                    conf: 'aws_inspector_tasks',
                    style: 'page',
                    hook: {
                        src: 'Hook',
                        type: 'external',
                    },
                    restHandlerName: 'aws_inspector_inputs_rh',
                    groups: [
                        {
                            label: 'AWS Input Configuration',
                            options: {
                                isExpandable: false,
                            },
                            fields: ['name', 'account', 'aws_iam_role', 'regions'],
                        },
                        {
                            label: 'Splunk-related Configuration',
                            options: {
                                isExpandable: false,
                            },
                            fields: ['sourcetype', 'index'],
                        },
                        {
                            label: 'Advanced Settings',
                            options: {
                                expand: false,
                                isExpandable: true,
                            },
                            fields: ['polling_interval'],
                        },
                    ],
                    entity: [
                        {
                            field: 'name',
                            label: 'Name',
                            type: 'text',
                            required: true,
                            validators: [
                                {
                                    type: 'regex',
                                    pattern: '^[^%<>/\\^$]+$',
                                    errorMsg:
                                        'Please enter name without special characters ^%<>/\\^$',
                                },
                            ],
                        },
                        {
                            field: 'account',
                            label: 'AWS Account',
                            type: 'singleSelect',
                            required: true,
                            options: {
                                endpointUrl: 'splunk_ta_aws_aws_all_accounts',
                            },
                        },
                        {
                            field: 'aws_iam_role',
                            label: 'Assume Role',
                            type: 'singleSelect',
                            defaultValue: '',
                            options: {
                                referenceName: 'iam_roles',
                            },
                        },
                        {
                            field: 'regions',
                            label: 'AWS Regions',
                            type: 'multipleSelect',
                            required: true,
                            options: {
                                delimiter: ',',
                                endpointUrl:
                                    'splunk_ta_aws/splunk_ta_aws_regions?aws_service=aws_inspector',
                                labelField: 'label',
                                dependencies: ['account'],
                            },
                        },
                        {
                            field: 'polling_interval',
                            label: 'Polling Interval (in seconds)',
                            type: 'text',
                            required: true,
                            defaultValue: 300,
                            validators: [
                                {
                                    type: 'number',
                                    range: [0, 31536000],
                                },
                            ],
                        },
                        {
                            field: 'sourcetype',
                            label: 'Source Type',
                            type: 'text',
                            required: true,
                            defaultValue: 'aws:inspector',
                        },
                        {
                            field: 'index',
                            label: 'Index',
                            type: 'singleSelect',
                            required: true,
                            defaultValue: 'default',
                            options: {
                                createSearchChoice: true,
                                endpointUrl: 'data/indexes',
                                denyList: '^_.*$',
                            },
                        },
                    ],
                },
                {
                    name: 'aws_inspector_v2',
                    title: 'Inspector (v2)',
                    subTitle: '(Recommended)',
                    conf: 'aws_inspector_v2_tasks',
                    style: 'page',
                    hook: {
                        src: 'Hook',
                        type: 'external',
                    },
                    restHandlerName: 'aws_inspector_v2_inputs_rh',
                    groups: [
                        {
                            label: 'AWS Input Configuration',
                            options: {
                                isExpandable: false,
                            },
                            fields: ['name', 'account', 'aws_iam_role', 'regions'],
                        },
                        {
                            label: 'Splunk-related Configuration',
                            options: {
                                isExpandable: false,
                            },
                            fields: ['sourcetype', 'index'],
                        },
                        {
                            label: 'Advanced Settings',
                            options: {
                                expand: false,
                                isExpandable: true,
                            },
                            fields: ['polling_interval'],
                        },
                    ],
                    entity: [
                        {
                            field: 'name',
                            label: 'Name',
                            type: 'text',
                            required: true,
                            validators: [
                                {
                                    type: 'regex',
                                    pattern: '^[a-zA-Z]\\w*$',
                                    errorMsg:
                                        'Name must begin with a letter and consist exclusively of alphanumeric characters and underscores.',
                                },
                            ],
                        },
                        {
                            field: 'account',
                            label: 'AWS Account',
                            type: 'singleSelect',
                            required: true,
                            options: {
                                endpointUrl: 'splunk_ta_aws_aws_all_accounts',
                            },
                        },
                        {
                            field: 'aws_iam_role',
                            label: 'Assume Role',
                            type: 'singleSelect',
                            defaultValue: '',
                            options: {
                                referenceName: 'iam_roles',
                            },
                        },
                        {
                            field: 'regions',
                            label: 'AWS Regions',
                            type: 'multipleSelect',
                            required: true,
                            options: {
                                delimiter: ',',
                                endpointUrl:
                                    'splunk_ta_aws/splunk_ta_aws_regions?aws_service=aws_inspector_v2',
                                labelField: 'label',
                                dependencies: ['account'],
                            },
                        },
                        {
                            field: 'polling_interval',
                            label: 'Polling Interval (in seconds)',
                            type: 'text',
                            required: true,
                            defaultValue: 300,
                            validators: [
                                {
                                    type: 'number',
                                    range: [0, 31536000],
                                },
                            ],
                        },
                        {
                            field: 'sourcetype',
                            label: 'Source Type',
                            type: 'text',
                            required: true,
                            defaultValue: 'aws:inspector:v2:findings',
                        },
                        {
                            field: 'index',
                            label: 'Index',
                            type: 'singleSelect',
                            required: true,
                            defaultValue: 'default',
                            options: {
                                createSearchChoice: true,
                                endpointUrl: 'data/indexes',
                                denyList: '^_.*$',
                            },
                        },
                    ],
                },
                {
                    name: 'aws_kinesis',
                    title: 'Kinesis',
                    conf: 'aws_kinesis_tasks',
                    style: 'page',
                    hook: {
                        src: 'Hook',
                        type: 'external',
                    },
                    restHandlerName: 'aws_kinesis_inputs_rh',
                    groups: [
                        {
                            label: 'AWS Input Configuration',
                            options: {
                                isExpandable: false,
                            },
                            fields: [
                                'name',
                                'account',
                                'aws_iam_role',
                                'region',
                                'private_endpoint_enabled',
                                'kinesis_private_endpoint_url',
                                'sts_private_endpoint_url',
                                'stream_names',
                            ],
                        },
                        {
                            label: 'Splunk-related Configuration',
                            options: {
                                isExpandable: false,
                            },
                            fields: ['format', 'encoding', 'sourcetype', 'index'],
                        },
                        {
                            label: 'Advanced Settings',
                            options: {
                                expand: false,
                                isExpandable: true,
                            },
                            fields: ['init_stream_position'],
                        },
                    ],
                    entity: [
                        {
                            field: 'name',
                            label: 'Name',
                            type: 'text',
                            required: true,
                            validators: [
                                {
                                    type: 'regex',
                                    pattern: '^[^%<>/\\^$]+$',
                                    errorMsg:
                                        'Please enter name without special characters ^%<>/\\^$',
                                },
                            ],
                        },
                        {
                            field: 'account',
                            label: 'AWS Account',
                            type: 'singleSelect',
                            required: true,
                            options: {
                                endpointUrl: 'splunk_ta_aws_aws_all_accounts',
                            },
                        },
                        {
                            field: 'aws_iam_role',
                            label: 'Assume Role',
                            type: 'singleSelect',
                            options: {
                                referenceName: 'iam_roles',
                            },
                        },
                        {
                            field: 'region',
                            label: 'AWS Region',
                            type: 'singleSelect',
                            required: true,
                            options: {
                                disableonEdit: true,
                                endpointUrl:
                                    'splunk_ta_aws/splunk_ta_aws_regions?aws_service=aws_kinesis',
                                labelField: 'label',
                                dependencies: ['account'],
                            },
                        },
                        {
                            field: 'private_endpoint_enabled',
                            label: 'Use Private Endpoints',
                            type: 'custom',
                            defaultValue: 0,
                            options: {
                                src: 'PrivateEndpointInput',
                                type: 'external',
                            },
                        },
                        {
                            field: 'kinesis_private_endpoint_url',
                            label: 'Private Endpoint (Kinesis)',
                            type: 'text',
                            help: 'Ex: https://vpce-<endpoint_id>-<unique_id>.kinesis.<region>.vpce.amazonaws.com',
                            defaultValue: '',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'sts_private_endpoint_url',
                            label: 'Private Endpoint (STS)',
                            type: 'text',
                            help: 'Ex: https://vpce-<endpoint_id>-<unique_id>.sts.<region>.vpce.amazonaws.com',
                            defaultValue: '',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'stream_names',
                            label: 'Stream Name',
                            type: 'singleSelect',
                            required: true,
                            options: {
                                disableonEdit: true,
                                dependencies: [
                                    'account',
                                    'aws_iam_role',
                                    'region',
                                    'private_endpoint_enabled',
                                    'sts_private_endpoint_url',
                                    'kinesis_private_endpoint_url',
                                ],
                                endpointUrl: 'splunk_ta_aws/splunk_ta_aws_kinesis_streams',
                            },
                        },
                        {
                            field: 'init_stream_position',
                            label: 'Initial Stream Position',
                            type: 'singleSelect',
                            tooltip:
                                'LATEST or TRIM_HORIZON. LATEST starts data collection from the point the input is enabled. TRIM_HORIZON starts collecting with the oldest data record.',
                            defaultValue: 'LATEST',
                            options: {
                                disableonEdit: true,
                                createSearchChoice: true,
                                autoCompleteFields: [
                                    {
                                        label: 'TRIM_HORIZON',
                                        value: 'TRIM_HORIZON',
                                    },
                                    {
                                        label: 'LATEST',
                                        value: 'LATEST',
                                    },
                                ],
                            },
                        },
                        {
                            field: 'encoding',
                            label: 'Encoding',
                            type: 'singleSelect',
                            tooltip:
                                'The encoding of the stream data. Set to gzip or leave blank, which defaults to Base64. All stream data that you collect in a single input must have the same encoding.',
                            defaultValue: '',
                            options: {
                                disableonEdit: true,
                                createSearchChoice: true,
                                autoCompleteFields: [
                                    {
                                        label: '(none)',
                                        value: '',
                                    },
                                    {
                                        label: 'gzip',
                                        value: 'gzip',
                                    },
                                ],
                            },
                        },
                        {
                            field: 'format',
                            label: 'Record Format',
                            type: 'singleSelect',
                            tooltip:
                                'CloudWatchLogs or none. If you choose CloudWatchLogs, this add-on will parse the data in CloudWatchLogs format.',
                            defaultValue: '',
                            options: {
                                disableonEdit: true,
                                createSearchChoice: true,
                                autoCompleteFields: [
                                    {
                                        label: '(none)',
                                        value: '',
                                    },
                                    {
                                        label: 'CloudWatchLogs',
                                        value: 'CloudWatchLogs',
                                    },
                                ],
                            },
                        },
                        {
                            field: 'sourcetype',
                            label: 'Source Type',
                            type: 'singleSelect',
                            defaultValue: 'aws:kinesis',
                            options: {
                                createSearchChoice: true,
                                autoCompleteFields: [
                                    {
                                        label: 'aws:kinesis',
                                        value: 'aws:kinesis',
                                    },
                                    {
                                        label: 'aws:cloudwatchlogs:vpcflow',
                                        value: 'aws:cloudwatchlogs:vpcflow',
                                    },
                                ],
                            },
                        },
                        {
                            field: 'index',
                            label: 'Index',
                            type: 'singleSelect',
                            defaultValue: 'default',
                            required: true,
                            options: {
                                createSearchChoice: true,
                                endpointUrl: 'data/indexes',
                                denyList: '^_.*$',
                            },
                        },
                    ],
                },
                {
                    name: 'splunk_ta_aws_sqs',
                    title: 'SQS',
                    conf: 'aws_sqs_tasks',
                    style: 'page',
                    hook: {
                        src: 'Hook',
                        type: 'external',
                    },
                    restHandlerName: 'aws_sqs_inputs_rh',
                    groups: [
                        {
                            label: 'AWS Input Configuration',
                            options: {
                                isExpandable: false,
                            },
                            fields: [
                                'name',
                                'aws_account',
                                'aws_iam_role',
                                'aws_region',
                                'sqs_queues',
                            ],
                        },
                        {
                            label: 'Splunk-related Configuration',
                            options: {
                                isExpandable: false,
                            },
                            fields: ['format', 'encoding', 'sourcetype', 'index'],
                        },
                        {
                            label: 'Advanced Settings',
                            options: {
                                expand: false,
                                isExpandable: true,
                            },
                            fields: ['interval'],
                        },
                    ],
                    entity: [
                        {
                            field: 'name',
                            label: 'Name',
                            type: 'text',
                            required: true,
                            validators: [
                                {
                                    type: 'regex',
                                    pattern: '^[^%<>/\\^$]+$',
                                    errorMsg:
                                        'Please enter name without special characters ^%<>/\\^$',
                                },
                            ],
                        },
                        {
                            field: 'aws_account',
                            label: 'AWS Account',
                            type: 'singleSelect',
                            required: true,
                            options: {
                                endpointUrl: 'splunk_ta_aws_aws_all_accounts',
                            },
                        },
                        {
                            field: 'aws_iam_role',
                            label: 'Assume Role',
                            type: 'singleSelect',
                            defaultValue: '',
                            options: {
                                referenceName: 'iam_roles',
                            },
                        },
                        {
                            field: 'aws_region',
                            label: 'SQS Configuration',
                            type: 'custom',
                            options: {
                                src: 'GroupSelection',
                                type: 'external',
                            },
                        },
                        {
                            field: 'sqs_queues',
                            label: 'SQS Queues',
                            type: 'text',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'interval',
                            label: 'Interval (in seconds)',
                            type: 'text',
                            required: true,
                            defaultValue: 30,
                            validators: [
                                {
                                    type: 'number',
                                    range: [0, 31536000],
                                },
                            ],
                        },
                        {
                            field: 'sourcetype',
                            label: 'Source Type',
                            type: 'text',
                            required: true,
                            defaultValue: 'aws:sqs',
                        },
                        {
                            field: 'index',
                            label: 'Index',
                            type: 'singleSelect',
                            required: true,
                            defaultValue: 'default',
                            options: {
                                createSearchChoice: true,
                                endpointUrl: 'data/indexes',
                                denyList: '^_.*$',
                            },
                        },
                    ],
                },
                {
                    name: 'aws_sqs_based_s3',
                    title: 'SQS-Based S3',
                    subTitle: '(Recommended)',
                    style: 'page',
                    hook: {
                        src: 'Hook',
                        type: 'external',
                    },
                    restHandlerName: 'aws_sqs_based_s3_inputs_rh',
                    groups: [
                        {
                            label: 'AWS Input Configuration',
                            options: {
                                isExpandable: false,
                            },
                            fields: [
                                'name',
                                'aws_account',
                                'aws_iam_role',
                                'using_dlq',
                                'sqs_queue_region',
                                'private_endpoint_enabled',
                                'sqs_private_endpoint_url',
                                's3_private_endpoint_url',
                                'sts_private_endpoint_url',
                                'sqs_queue_url',
                                'sqs_batch_size',
                                's3_file_decoder',
                                'sqs_sns_validation',
                            ],
                        },
                        {
                            label: 'Splunk-related Configuration',
                            options: {
                                isExpandable: false,
                            },
                            fields: ['sourcetype', 'index'],
                        },
                        {
                            label: 'Advanced Settings',
                            options: {
                                expand: false,
                                isExpandable: true,
                            },
                            fields: [
                                'parse_csv_with_header',
                                'parse_csv_with_delimiter',
                                'interval',
                            ],
                        },
                    ],
                    entity: [
                        {
                            field: 'name',
                            label: 'Name',
                            type: 'text',
                            required: true,
                            validators: [
                                {
                                    type: 'regex',
                                    pattern: '^[^%<>/\\^$]+$',
                                    errorMsg:
                                        'Please enter name without special characters ^%<>/\\^$',
                                },
                            ],
                        },
                        {
                            field: 'aws_account',
                            label: 'AWS Account',
                            type: 'singleSelect',
                            required: true,
                            options: {
                                endpointUrl: 'splunk_ta_aws_aws_all_accounts',
                            },
                        },
                        {
                            field: 'aws_iam_role',
                            label: 'Assume Role',
                            type: 'singleSelect',
                            options: {
                                referenceName: 'iam_roles',
                            },
                        },
                        {
                            field: 'using_dlq',
                            label: 'Force using DLQ (Recommended)',
                            type: 'checkbox',
                            tooltip:
                                "Deselect the checkbox if some data like 'Crowdstrike FDR' data is to be fetched as dead letter queue is not linked to some services like Crowdstrike supported queues",
                            required: false,
                            defaultValue: 1,
                        },
                        {
                            field: 'sqs_queue_region',
                            label: 'AWS Region',
                            type: 'singleSelect',
                            required: true,
                            options: {
                                endpointUrl:
                                    'splunk_ta_aws/splunk_ta_aws_regions?aws_service=aws_sqs_based_s3',
                                labelField: 'label',
                                dependencies: ['aws_account'],
                            },
                        },
                        {
                            field: 'private_endpoint_enabled',
                            label: 'Use Private Endpoints',
                            type: 'custom',
                            defaultValue: 0,
                            options: {
                                src: 'PrivateEndpointInput',
                                type: 'external',
                            },
                        },
                        {
                            field: 'sqs_private_endpoint_url',
                            label: 'Private Endpoint (SQS)',
                            type: 'text',
                            help: 'Ex: https://vpce-<endpoint_id>-<unique_id>.sqs.<region>.vpce.amazonaws.com',
                            defaultValue: '',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 's3_private_endpoint_url',
                            label: 'Private Endpoint (S3)',
                            type: 'text',
                            help: 'Ex: https://bucket.vpce-<endpoint_id>-<unique_id>.s3.<region>.vpce.amazonaws.com',
                            defaultValue: '',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'sts_private_endpoint_url',
                            label: 'Private Endpoint (STS)',
                            type: 'text',
                            help: 'Ex: https://vpce-<endpoint_id>-<unique_id>.sts.<region>.vpce.amazonaws.com',
                            defaultValue: '',
                            options: {
                                display: false,
                            },
                        },
                        {
                            field: 'sqs_queue_url',
                            label: 'SQS Queue Name',
                            type: 'singleSelect',
                            tooltip:
                                'SQS queue with dead letter queue setting (recommended) and visibility timeout no smaller than 300s (recommended)',
                            required: true,
                            options: {
                                createSearchChoice: true,
                                endpointUrl: 'splunk_ta_aws/splunk_ta_aws_sqs_queue_urls',
                                labelField: 'label',
                                dependencies: [
                                    'aws_account',
                                    'aws_iam_role',
                                    'sqs_queue_region',
                                    'private_endpoint_enabled',
                                    'sqs_private_endpoint_url',
                                    'sts_private_endpoint_url',
                                    'using_dlq',
                                ],
                            },
                        },
                        {
                            field: 'sqs_batch_size',
                            label: 'SQS Batch Size',
                            type: 'text',
                            tooltip:
                                'Max number of messages to pull from SQS in one batch. An integer in range [1, 10].',
                            defaultValue: '10',
                            validators: [
                                {
                                    type: 'number',
                                    range: [1, 10],
                                },
                            ],
                        },
                        {
                            field: 's3_file_decoder',
                            label: 'S3 File Decoder',
                            type: 'singleSelect',
                            required: true,
                            options: {
                                disableonEdit: true,
                                createSearchChoice: true,
                                autoCompleteFields: [
                                    {
                                        label: 'Config',
                                        value: 'Config',
                                    },
                                    {
                                        label: 'CloudTrail',
                                        value: 'CloudTrail',
                                    },
                                    {
                                        label: 'S3 Access Logs',
                                        value: 'S3AccessLogs',
                                    },
                                    {
                                        label: 'CloudFront Access Logs',
                                        value: 'CloudFrontAccessLogs',
                                    },
                                    {
                                        label: 'ELB Access Logs',
                                        value: 'ELBAccessLogs',
                                    },
                                    {
                                        label: 'VPC Flow Logs',
                                        value: 'VPCFlowLogs',
                                    },
                                    {
                                        label: 'Delimited Files',
                                        value: 'DelimitedFilesDecoder',
                                    },
                                    {
                                        label: 'Custom Logs',
                                        value: 'CustomLogs',
                                    },
                                    {
                                        label: 'Amazon Security Lake',
                                        value: 'AmazonSecurityLake',
                                    },
                                ],
                            },
                        },
                        {
                            field: 'sqs_sns_validation',
                            label: 'Signature Validate All Events',
                            type: 'checkbox',
                            required: false,
                            tooltip:
                                'SQS Queue with mix of signed and unsigned messages are not supported.',
                            defaultValue: 1,
                        },
                        {
                            field: 'parse_csv_with_header',
                            label: 'Parse all files as CSV',
                            type: 'custom',
                            tooltip:
                                'All files will be parsed as CSV with the first line considered the header.',
                            defaultValue: 0,
                            options: {
                                src: 'ParseAsDelimitedFileInput',
                                type: 'external',
                            },
                        },
                        {
                            field: 'parse_csv_with_delimiter',
                            label: 'CSV field delimiter',
                            type: 'text',
                            defaultValue: ',',
                            required: true,
                            tooltip:
                                'Delimiter must be one character. The character cannot be alphanumeric, single quote, or double quote. Tab-delimited files will be \\t',
                            validators: [
                                {
                                    type: 'string',
                                    minLength: 1,
                                    maxLength: 2,
                                    errorMsg:
                                        'Length of the delimiter is restricted to 1 character.',
                                },
                                {
                                    type: 'regex',
                                    pattern: '^[^\\d\\w\\\'\\"]{1,2}',
                                    errorMsg:
                                        'Delimiter must be one character. The character cannot be empty, alphanumeric, single quote, or double quote.',
                                },
                            ],
                        },
                        {
                            field: 'sourcetype',
                            label: 'Source Type',
                            type: 'text',
                            required: true,
                        },
                        {
                            field: 'index',
                            label: 'Index',
                            type: 'singleSelect',
                            required: true,
                            defaultValue: 'default',
                            options: {
                                createSearchChoice: true,
                                endpointUrl: 'data/indexes',
                                denyList: '^_.*$',
                            },
                        },
                        {
                            field: 'interval',
                            label: 'Interval (in seconds)',
                            type: 'text',
                            defaultValue: '300',
                            validators: [
                                {
                                    type: 'number',
                                    range: [0, 31536000],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    },
    meta: {
        name: 'Splunk_TA_aws',
        displayName: 'Splunk Add-on for AWS',
        version: '0.1053.6173380686',
        restRoot: 'splunk_ta_aws',
        schemaVersion: '0.0.3',
    },
};
