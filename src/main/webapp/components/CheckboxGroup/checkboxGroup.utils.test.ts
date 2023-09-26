import {
    getFlattenRowsWithGroups,
    Group,
    GroupWithRows,
    packValue,
    parseValue,
    Row,
} from './checkboxGroup.utils';

describe('parseValue', () => {
    it('should correctly parse a collection string into a Map', () => {
        const collection = 'collect_collaboration/1200,collect_file/1,collect_task/1';
        const resultMap = parseValue(collection);

        expect(resultMap.size).toBe(3);
        expect(resultMap.get('collect_collaboration')).toBe('1200');
        expect(resultMap.get('collect_file')).toBe('1');
        expect(resultMap.get('collect_task')).toBe('1');
    });
    it('should return an empty Map for undefined collection', () => {
        const resultMap = parseValue();
        expect(resultMap.size).toBe(0);
    });

    it('should throw an error for invalid collection format', () => {
        const collection = '/field1,text2/field2';
        expect(() => parseValue(collection)).toThrow('Value is not parsable: /field1,text2/field2');
    });
});

describe('packValue', () => {
    it('should correctly pack a Map into a collection string', () => {
        const valueMap = new Map<string, string>();
        valueMap.set('collect_collaboration', '1200');
        valueMap.set('collect_file', '1');
        valueMap.set('collect_task', '1');
        const resultString = packValue(valueMap);

        expect(resultString).toBe('collect_collaboration/1200,collect_file/1,collect_task/1');
    });

    it('parsed value should be the same as packed value', () => {
        const packedValue =
            'collect_collaboration/1200,collect_file/1,collect_task/1,fieldWithoutValue/';
        expect(packValue(parseValue(packedValue))).toBe(packedValue);
    });
});

describe('getFlattenRowsWithGroups', () => {
    let sampleGroups: Group[];
    let sampleRows: Row[];

    beforeEach(() => {
        sampleGroups = [
            {
                label: 'Group1',
                fields: ['field1', 'field2'],
                options: {
                    isExpandable: true,
                },
            },
            {
                label: 'Group2',
                fields: ['field4'],
                options: {
                    isExpandable: false,
                },
            },
        ];

        sampleRows = [
            {
                field: 'field1',
                checkbox: {
                    label: 'Checkbox1',
                    defaultValue: 1,
                },
                value: {
                    defaultValue: 'value1',
                    required: true,
                },
            },
            {
                field: 'field2',
                checkbox: {
                    label: 'Checkbox2',
                    defaultValue: 0,
                },
                value: {
                    defaultValue: 'value2',
                    required: false,
                },
            },
            {
                field: 'field3',
                checkbox: {
                    label: 'Checkbox3',
                    defaultValue: 1,
                },
                value: {
                    defaultValue: 'value3',
                    required: true,
                },
            },
            {
                field: 'field4',
                checkbox: {
                    label: 'Checkbox4',
                    defaultValue: 0,
                },
                value: {
                    defaultValue: 'value4',
                    required: false,
                },
            },
        ];
    });

    it('should group rows under their respective groups and append ungrouped rows', () => {
        const result = getFlattenRowsWithGroups({ groups: sampleGroups, rows: sampleRows });

        expect(result.length).toBe(3); // 2 groups + 1 ungrouped row

        const group1 = result[0] as GroupWithRows;
        expect(group1.label).toBe('Group1');
        expect(group1.rows.length).toBe(2);
        expect(group1.rows[0].field).toBe('field1');
        expect(group1.rows[1].field).toBe('field2');

        const ungroupedRow = result[1] as Row;
        expect(ungroupedRow.field).toBe('field3');

        const group2 = result[2] as GroupWithRows;
        expect(group2.label).toBe('Group2');
        expect(group2.rows.length).toBe(1);
        expect(group2.rows[0].field).toBe('field4');
    });
});
