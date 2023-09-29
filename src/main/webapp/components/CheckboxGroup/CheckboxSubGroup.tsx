import React from 'react';
import styled from 'styled-components';
import Group from '../Group';
import { GroupWithRows, ValueByField } from './checkboxGroup.utils';
import CheckboxRowWrapper from './CheckboxRowWrapper';

const StyledCheckboxRowWrapper = styled.div`
    & > * {
        margin-top: 10px;
    }
`;

interface CheckboxSubGroupProps {
    group: GroupWithRows;
    values: ValueByField;
    handleRowChange: (newValue: { field: string; checkbox: boolean; text?: string }) => void;
}

function getCheckedCheckboxesCount(group: GroupWithRows, values: ValueByField) {
    let checkedCheckboxesCount = 0;
    group.rows.forEach((row) => {
        if (values.get(row.field)?.checkbox) {
            checkedCheckboxesCount += 1;
        }
    });
    return checkedCheckboxesCount;
}

function CheckboxSubGroup({ group, values, handleRowChange }: CheckboxSubGroupProps) {
    const checkedCheckboxesCount = getCheckedCheckboxesCount(group, values);

    return (
        <Group
            title={group.label}
            description={`${checkedCheckboxesCount} of ${group.fields.length}`}
            isExpandable={group.options?.isExpandable}
            defaultOpen={group.options?.defaultOpen}
        >
            <StyledCheckboxRowWrapper>
                {group.rows.map((rowInsideGroup) => (
                    <CheckboxRowWrapper
                        row={rowInsideGroup}
                        values={values}
                        handleRowChange={handleRowChange}
                        key={`row_${rowInsideGroup.field}`}
                    />
                ))}
            </StyledCheckboxRowWrapper>
        </Group>
    );
}

export default CheckboxSubGroup;
