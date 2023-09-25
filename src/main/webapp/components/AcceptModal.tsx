import React from 'react';
import Modal from '@splunk/react-ui/Modal';
import Message from '@splunk/react-ui/Message';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { StyledButton } from '../pages/EntryPageStyle';

// two components from external libs so can't change much here
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const ModalWrapper = styled(Modal)`
    width: 600px;
`;

interface AcceptModalProps {
    title: string;
    message: string;
    open: boolean;
    declineBtnLabel: string;
    acceptBtnLabel: string;
    handleRequestClose: (accepted: boolean) => void;
}

function AcceptModal(props: AcceptModalProps) {
    const handleRequestClose = (accepted: boolean) => {
        props.handleRequestClose(accepted);
    };

    return (
        <ModalWrapper open={props.open}>
            <Modal.Header onRequestClose={() => handleRequestClose(false)} title={props.title} />
            <Modal.Body>
                <Message appearance="fill" type="warning">
                    {props.message}
                </Message>
            </Modal.Body>
            <Modal.Footer>
                <StyledButton
                    appearance="primary"
                    onClick={() => handleRequestClose(false)}
                    label={props.declineBtnLabel || 'Cancel'}
                />
                <StyledButton
                    appearance="primary"
                    onClick={() => handleRequestClose(true)}
                    label={props.acceptBtnLabel || 'OK'}
                />
            </Modal.Footer>
        </ModalWrapper>
    );
}

AcceptModal.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string,
    open: PropTypes.bool.isRequired,
    declineBtnLabel: PropTypes.string,
    acceptBtnLabel: PropTypes.string,
    handleRequestClose: PropTypes.func.isRequired,
};

export default AcceptModal;
