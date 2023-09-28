import React, { useEffect, useState } from 'react';
import ColumnLayout from '@splunk/react-ui/ColumnLayout';
import Button from '@splunk/react-ui/Button';
import { StyledColumnLayout } from './StyledComponent';
import {
    CheckboxGroupProps,
    getFlattenRowsWithGroups,
    getNewCheckboxValues,
    isGroupWithRows,
    packValue,
    parseValue,
    validateCheckboxGroup,
} from './checkboxGroup.utils';
import CheckboxSubGroup from './CheckboxSubGroup';
import CheckboxRowWrapper from './CheckboxRowWrapper';

function CheckboxGroup(props: CheckboxGroupProps) {
    const { field, value, handleChange, controlOptions, addCustomValidator } = props;

    const flattenedRowsWithGroups = getFlattenRowsWithGroups(controlOptions);

    const [values, setValues] = useState(parseValue(value));

    useEffect(() => {
        addCustomValidator?.(field, (submittedField, submittedValue) => {
            const validationResult = validateCheckboxGroup(
                submittedField,
                submittedValue,
                controlOptions
            );
            if (validationResult !== false) {
                return validationResult.errorMsg;
            }
            return validationResult;
        });
    }, [field, addCustomValidator, controlOptions]);

    const handleRowChange = (newValue: { field: string; checkbox: boolean; text?: string }) => {
        const newValues = getNewCheckboxValues(values, newValue);

        setValues(newValues);
        handleChange(field, packValue(newValues), 'checkboxGroup');
    };

    function handleCheckboxToggleAll(newCheckboxValue: boolean) {
        const newValues = new Map(values);

        controlOptions.rows.forEach((row) => {
            const oldValue = values.get(row.field);
            if (!!oldValue?.checkbox === newCheckboxValue) {
                return;
            }
            newValues.set(row.field, {
                checkbox: newCheckboxValue,
                text: oldValue?.text || row.value.defaultValue?.toString() || '',
            });
        });
        setValues(newValues);
        handleChange(field, packValue(newValues), 'checkboxGroup');
    }

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
            <ColumnLayout.Row>
                <div>
                    <Button
                        label="Select All"
                        appearance="pill"
                        onClick={() => handleCheckboxToggleAll(true)}
                    />
                    <Button
                        label="Clear All"
                        appearance="pill"
                        onClick={() => handleCheckboxToggleAll(false)}
                    />
                </div>
            </ColumnLayout.Row>
        </StyledColumnLayout>
    );
}

export default CheckboxGroup;
