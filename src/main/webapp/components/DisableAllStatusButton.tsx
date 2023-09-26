import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@splunk/react-ui/Button';
import { variables } from '@splunk/themes';
import AcceptModal from './AcceptModal';

interface InputRowData {
    account: string;
    disabled: boolean;
    host: string;
    host_resolved: string;
    index: string;
    interval: string;
    name: string;
    serviceName: string;
    serviceTitle: string;
    __toggleShowSpinner: boolean;
}

interface AllInputRowsData {
    [serviceName: string]: {
        [inputName: string]: InputRowData;
    };
}

interface DisableAllStatusButtonProps {
    displayBtnDisableAllRows: boolean;
    totalElement: number;
    allDataRows: AllInputRowsData;
    changeToggleStatus: (row: InputRowData) => void;
}

const DisableAllActionButton = styled(Button)`
    margin: 50px 30px;
    font-size: ${variables.fontSize};
`;

export function DisableAllStatusButton(props: DisableAllStatusButtonProps) {
    const [tryDisable, setTryDisable] = useState(false);

    const handleDisableAllRowsStatus = (rowsData: AllInputRowsData) => {
        Object.values(rowsData).forEach((data) =>
            Object.values(data).forEach((row) => {
                if (!row.disabled) {
                    props.changeToggleStatus({ ...row, disabled: false });
                }
            })
        );
    };

    return props.displayBtnDisableAllRows && props.totalElement > 1 ? (
        <>
            <DisableAllActionButton
                data-testid="disableAllBtn"
                onClick={() => setTryDisable(true)}
                role="button"
                disabled={false}
            >
                Disable all
            </DisableAllActionButton>
            {tryDisable && (
                <AcceptModal
                    message="Do you want to disable all?"
                    open={tryDisable}
                    handleRequestClose={(e) => {
                        setTryDisable(false);
                        if (e) {
                            handleDisableAllRowsStatus(props.allDataRows);
                        }
                    }}
                    title="Disable all"
                    declineBtnLabel="No"
                    acceptBtnLabel="Yes"
                />
            )}
        </>
    ) : null;
}
