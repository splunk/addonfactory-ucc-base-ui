type Field = string;
type Text = string;

export type ValueByField = Map<Field, Text>;
/**
 *
 * @param collection string like collect_collaboration/1200,collect_file/1,collect_task/1
 */
export function parseValue(collection?: string): ValueByField {
    const resultMap = new Map<Field, Text>();

    if (!collection) {
        return resultMap;
    }

    const splitValues = collection.split(',');
    splitValues.forEach((rawValue) => {
        const [field, text] = rawValue.split('/');
        if (!field) {
            throw new Error(`Value is not parsable: ${collection}`);
        }

        resultMap.set(field, text || '');
    });

    return resultMap;
}

export function packValue(value: ValueByField) {
    return Array.from(value.entries())
        .map(([field, text]) => `${field}/${text}`)
        .join(',');
}

export interface Group {
    label: string;
    fields: string[];
    options?: {
        isExpandable: boolean;
    };
}

export interface Row {
    field: string;
    checkbox: {
        label: string;
        value?: boolean;
        defaultValue?: number; // why not boolean?
        options?: {
            enable?: boolean;
        };
    };
    value: {
        defaultValue: number | string; // only number?
        required: boolean;
    };
}

export type GroupWithRows = Group & { rows: Row[] };

export interface CheckboxGroupProps {
    field: string;
    value?: string;
    disabled?: boolean;
    error?: boolean;
    encrypted?: boolean;
    controlOptions: {
        groups?: Group[];
        rows: Row[];
    };
    handleChange: (field: string, value: string, componentType?: 'checkboxGroup') => void;
}

export function isGroupWithRows(item: GroupWithRows | Row): item is GroupWithRows {
    return 'label' in item;
}

export function getFlattenRowsWithGroups({ groups, rows }: CheckboxGroupProps['controlOptions']) {
    const flattenRowsMixedWithGroups: Array<GroupWithRows | Row> = [];

    rows.forEach((row) => {
        const groupForThisRow = groups?.find((group) => group.fields.includes(row.field));
        if (groupForThisRow) {
            const addedGroup = flattenRowsMixedWithGroups.find(
                (item): item is GroupWithRows =>
                    isGroupWithRows(item) && item.label === groupForThisRow.label
            );
            const groupToAdd = addedGroup || {
                ...groupForThisRow,
                rows: [],
            };
            groupToAdd.rows.push(row);
            if (!addedGroup) {
                flattenRowsMixedWithGroups.push(groupToAdd);
            }
            return;
        }
        flattenRowsMixedWithGroups.push(row);
    });

    return flattenRowsMixedWithGroups;
}
