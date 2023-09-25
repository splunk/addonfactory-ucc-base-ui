import React from 'react';
import ColumnLayout from '@splunk/react-ui/ColumnLayout';
import { StyledColumnLayout } from '../StyledComponent';
import CheckboxRowComponent from './CheckboxRowComponent';
import GroupComponent from '../GroupComponent';
import {
    CheckboxGroupProps,
    getFlattenRowsWithGroups,
    isGroupWithRows,
    packValue,
    parseValue,
    Row,
    ValueByField,
} from './checkboxGroup.utils';
import { isTrue } from '../../util/util';

function getCheckboxRowComponent({
    row,
    values,
    handleRowChange,
    key,
}: {
    row: Row;
    values: ValueByField;
    handleRowChange: (newValue: { field: string; checkbox: boolean; text?: string }) => void;
    key?: string;
}) {
    return (
        <CheckboxRowComponent
            key={key}
            field={row.field}
            label={row.checkbox.label}
            checkbox={values.has(row.field) || isTrue(row.checkbox.defaultValue)}
            text={
                values.has(row.field) ? values.get(row.field) : row.value?.defaultValue.toString()
            }
            handleChange={handleRowChange}
        />
    );
}

function CheckboxGroupComponent(props: CheckboxGroupProps) {
    const { field, value, handleChange, controlOptions } = props;

    const flattenedRowsWithGroups = getFlattenRowsWithGroups(controlOptions);
    const values = parseValue(value);

    const handleRowChange = (newValue: { field: string; checkbox: boolean; text?: string }) => {
        if (newValue.checkbox) {
            values.set(newValue.field, newValue.text || '');
        } else {
            values.delete(newValue.field);
        }

        handleChange(field, packValue(values), 'checkboxGroup');
    };

    return (
        <StyledColumnLayout>
            {flattenedRowsWithGroups.map((row) => {
                if (isGroupWithRows(row)) {
                    return (
                        // labels are unique across groups
                        <ColumnLayout.Row key={`group_${row.label}`}>
                            <GroupComponent
                                title={row.label}
                                isExpandable={row.options?.isExpandable}
                            >
                                {row.rows.map((rowInsideGroup) =>
                                    getCheckboxRowComponent({
                                        row: rowInsideGroup,
                                        values,
                                        handleRowChange,
                                        key: `row_${rowInsideGroup.field}`,
                                    })
                                )}
                            </GroupComponent>
                        </ColumnLayout.Row>
                    );
                }
                return (
                    <ColumnLayout.Row key={`row_${row.field}`}>
                        {getCheckboxRowComponent({
                            row,
                            values,
                            handleRowChange,
                        })}
                    </ColumnLayout.Row>
                );
            })}
        </StyledColumnLayout>
    );
}

export default CheckboxGroupComponent;
