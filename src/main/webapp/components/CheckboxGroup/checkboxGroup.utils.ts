import Validator from '../../util/Validator';
import { NumberValidator, RegexValidator, StringValidator } from '../../types/ValidatorsTypes';

type Field = string;
type Value = {
    checkbox: boolean;
    text: string;
    error?: string;
};

export type ValueByField = Map<Field, Value>;
/**
 *
 * @param collection string like collect_collaboration/1200,collect_file/1,collect_task/1
 */
export function parseValue(collection?: string): ValueByField {
    const resultMap = new Map<Field, Value>();

    if (!collection) {
        return resultMap;
    }

    const splitValues = collection.split(',');
    splitValues.forEach((rawValue) => {
        const [field, text] = rawValue.split('/');
        if (!field) {
            throw new Error(`Value is not parsable: ${collection}`);
        }

        resultMap.set(field, {
            checkbox: true,
            text: text || '',
        });
    });

    return resultMap;
}

export function packValue(map: ValueByField) {
    return Array.from(map.entries())
        .filter(([, value]) => value.checkbox)
        .map(([field, value]) => `${field}/${value.text}`)
        .join(',');
}

export interface Group {
    label: string;
    fields: string[];
    options?: {
        isExpandable?: boolean;
        defaultOpen?: boolean;
    };
}

export interface Row {
    field: string;
    checkbox: {
        label: string;
        value?: boolean;
        options?: {
            enable?: boolean;
        };
    };
    value: {
        defaultValue?: number | string;
        validators?: (StringValidator | RegexValidator | NumberValidator)[];
        required?: boolean;
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
    addCustomValidator?: (
        field: string,
        validator: (submittedField: string, submittedValue: string) => void
    ) => void;
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

export function getNewCheckboxValues(
    values: ValueByField,
    newValue: {
        field: string;
        checkbox: boolean;
        text?: string;
    }
) {
    const newValues = new Map(values);
    newValues.set(newValue.field, {
        checkbox: newValue.checkbox,
        text: newValue.text || '',
    });

    return newValues;
}

type MaybeError =
    | {
          errorField: string;
          errorMsg: string;
      }
    | false;

export function validateCheckboxGroup(
    field: string,
    packedValue: string,
    options: CheckboxGroupProps['controlOptions']
): MaybeError {
    let errorMessage: MaybeError = false;
    const parsedValue = parseValue(packedValue);
    options.rows.some((row) => {
        const rowSubmittedValue = parsedValue.get(row.field);
        if (rowSubmittedValue) {
            if (row.value.required) {
                errorMessage = Validator.RequiredValidator(
                    field,
                    row.checkbox.label,
                    rowSubmittedValue?.text
                );
                // break loop
                return true;
            }

            const { validators } = row.value;
            if (validators?.length) {
                return validators.some((validator) => {
                    const { type } = validator;
                    switch (type) {
                        case 'regex':
                            errorMessage = Validator.RegexValidator(
                                field,
                                row.checkbox.label,
                                validator,
                                rowSubmittedValue?.text
                            );
                            return true;
                        case 'string':
                            errorMessage = Validator.StringValidator(
                                field,
                                row.checkbox.label,
                                validator,
                                rowSubmittedValue?.text
                            );
                            return true;

                        case 'number':
                            errorMessage = Validator.NumberValidator(
                                field,
                                row.checkbox.label,
                                validator,
                                rowSubmittedValue?.text
                            );

                            return true;

                        default:
                            throw new Error(
                                `[CheckboxGroup] Unsupported validator ${type} for field ${field}`
                            );
                    }
                });
            }
        }
        return false;
    });
    return errorMessage;
}
