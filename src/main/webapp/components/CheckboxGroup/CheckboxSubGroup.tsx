import React from 'react';
import Group from '../Group';
import { GroupWithRows, ValueByField } from './checkboxGroup.utils';
import CheckboxRowWrapper from './CheckboxRowWrapper';

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
            {group.rows.map((rowInsideGroup) => (
                <CheckboxRowWrapper
                    row={rowInsideGroup}
                    values={values}
                    handleRowChange={handleRowChange}
                    key={`row_${rowInsideGroup.field}`}
                />
            ))}
        </Group>
    );
}

export default CheckboxSubGroup;
