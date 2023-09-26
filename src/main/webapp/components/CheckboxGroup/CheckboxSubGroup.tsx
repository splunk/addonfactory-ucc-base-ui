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

function CheckboxSubGroup({ group, values, handleRowChange }: CheckboxSubGroupProps) {
    return (
        <Group
            title={group.label}
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
