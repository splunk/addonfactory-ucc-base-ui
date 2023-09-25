import React from 'react';
import Modal from '@splunk/react-ui/Modal';
import Message from '@splunk/react-ui/Message';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { StyledButton } from '../pages/EntryPageStyle';

const ModalWrapper = styled(Modal)`
    width: 600px;
`;

function AcceptModal(props) {
    const handleRequestClose = (accepted) => {
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
