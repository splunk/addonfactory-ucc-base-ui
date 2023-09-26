import React, { useState, useEffect } from 'react';
import ColumnLayout from '@splunk/react-ui/ColumnLayout';
import Text from '@splunk/react-ui/Text';
import { TextChangeHandler } from '@splunk/react-ui/types/src/Text/Text';
import styled from 'styled-components';
import Switch from '@splunk/react-ui/Switch';
import { StyledColumnLayout } from '../StyledComponent';

const StyledSwitch = styled(Switch)`
    padding-left: 3px;

    //> * {
    //    &:nth-child(2) {
    //        margin-left: 8px;
    //    }
    //}

    span {
        color: red;
        font-weight: bold;
        margin-left: 5px;
    }
`;

interface CheckboxRowProps {
    field: string;
    label: string;
    checkbox: boolean;
    text?: string;
    disabled?: boolean;
    handleChange: (value: { field: string; checkbox: boolean; text?: string }) => void;
}

function CheckboxRow(props: CheckboxRowProps) {
    const { field, label, checkbox, text, disabled, handleChange } = props;

    const [isTextDisabled, setIsTextDisabled] = useState(!checkbox || disabled);

    useEffect(() => {
        setIsTextDisabled(!checkbox || disabled);
    }, [checkbox, disabled]);

    const handleChangeTextBox: TextChangeHandler = (event) => {
        if (event?.target && 'value' in event.target) {
            handleChange({ field, text: event.target.value, checkbox });
        }
    };

    const handleChangeCheckbox = (event: unknown, data: { selected: boolean; value?: unknown }) => {
        const previousValue = data.selected;
        handleChange({ field, text, checkbox: !previousValue });
    };

    return (
        <StyledColumnLayout>
            <ColumnLayout.Row>
                <ColumnLayout.Column span={5}>
                    <StyledSwitch
                        key={field}
                        value={field}
                        selected={checkbox}
                        onClick={handleChangeCheckbox}
                        appearance="checkbox"
                    >
                        {label}
                    </StyledSwitch>
                </ColumnLayout.Column>
                <ColumnLayout.Column span={2}>
                    <Text
                        inline
                        disabled={isTextDisabled}
                        value={text || ''}
                        onChange={handleChangeTextBox}
                        type="text"
                    />
                </ColumnLayout.Column>
            </ColumnLayout.Row>
        </StyledColumnLayout>
    );
}
export default CheckboxRow;
