import React, { useState } from 'react';
import ColumnLayout from '@splunk/react-ui/ColumnLayout';
import { StyledColumnLayout } from '../StyledComponent';
import {
    CheckboxGroupProps,
    getFlattenRowsWithGroups,
    isGroupWithRows,
    packValue,
    parseValue,
    ValueByField,
} from './checkboxGroup.utils';
import CheckboxSubGroup from './CheckboxSubGroup';
import CheckboxRowWrapper from './CheckboxRowWrapper';

function getNewCheckboxValues(
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

function CheckboxGroup(props: CheckboxGroupProps) {
    const { field, value, handleChange, controlOptions } = props;

    const flattenedRowsWithGroups = getFlattenRowsWithGroups(controlOptions);

    const [values, setValues] = useState(parseValue(value));

    const handleRowChange = (newValue: { field: string; checkbox: boolean; text?: string }) => {
        const newValues = getNewCheckboxValues(values, newValue);

        setValues(newValues);
        handleChange(field, packValue(newValues), 'checkboxGroup');
    };

    return (
        <StyledColumnLayout gutter={5}>
            {flattenedRowsWithGroups.map((row) => {
                if (isGroupWithRows(row)) {
                    // labels are unique across groups
                    return (
                        <ColumnLayout.Row key={`group_${row.label}`}>
                            <CheckboxSubGroup
                                group={row}
                                values={values}
                                handleRowChange={handleRowChange}
                            />
                        </ColumnLayout.Row>
                    );
                }
                return (
                    <ColumnLayout.Row key={`row_${row.field}`}>
                        <CheckboxRowWrapper
                            row={row}
                            values={values}
                            handleRowChange={handleRowChange}
                        />
                    </ColumnLayout.Row>
                );
            })}
        </StyledColumnLayout>
    );
}

export default CheckboxGroup;
