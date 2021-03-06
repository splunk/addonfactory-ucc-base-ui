import React from 'react';
import PropTypes from 'prop-types';
import ControlGroup from '@splunk/react-ui/ControlGroup';
import styled from 'styled-components';

import MarkdownMessage from './MarkdownMessage';
import CONTROL_TYPE_MAP from '../constants/ControlTypeMap';

const CustomElement = styled.div`
    margin-left: 30px;
`;

const ControlGroupWrapper = styled(ControlGroup).attrs((props) => ({
    'data-name': props.dataName,
}))`
    width: 100%;
    max-width: 100%;

    > * {
        &:first-child {
            width: 240px !important;
        }
        &:nth-child(3) {
            margin-left: 270px !important;
            width: 320px;
        }
    }
`;

class ControlWrapper extends React.PureComponent {
    constructor(props) {
        super(props);
        this.controlType = this.isString(props.entity.type)
            ? CONTROL_TYPE_MAP[props.entity.type]
            : null;
        // Add 'optional' placeholder for optional field
        // Note: for oauth field it is possible required is false but the field is actually required
        // based on what type of authentication is selected
        this.options = this.props.entity.options;
        if (
            !this.props.entity.required &&
            !Object.prototype.hasOwnProperty.call(this.props.entity, 'oauth_field') &&
            !this.options?.placeholder
        ) {
            this.options = {
                ...this.options,
                placeholder: 'optional',
            };
        }
    }

    isString = (str) => {
        return !!(typeof str === 'string' || str instanceof String);
    };

    render() {
        const { field, type, label, tooltip, help, encrypted = false } = this.props.entity;
        const { handleChange, addCustomValidator, utilCustomFunctions } = this.props.utilityFuncts;
        // We have to put empty object because markDownMessage prop can be undefined
        // because we are not explicitly setting it but expecting it from custom hooks only.
        const { text, link, color, markdownType, token, linkText } =
            this.props.markdownMessage || {};
        let rowView;
        if (this.props.entity.type === 'custom') {
            const data = {
                value: this.props.value,
                mode: this.props.mode,
                serviceName: this.props.serviceName,
            };

            rowView = this.controlType
                ? React.createElement(this.controlType, {
                      data,
                      field,
                      handleChange,
                      addCustomValidator,
                      utilCustomFunctions,
                      controlOptions: this.options,
                  })
                : `No View Found for ${type} type`;
        } else {
            rowView = this.controlType
                ? React.createElement(this.controlType, {
                      handleChange,
                      value: this.props.value,
                      field,
                      controlOptions: this.options,
                      error: this.props.error,
                      disabled: this.props.disabled,
                      encrypted,
                      dependencyValues: this.props.dependencyValues,
                  })
                : `No View Found for ${type} type`;
        }

        const helpText = (
            <>
                <MarkdownMessage
                    text={text || ''}
                    link={link || ''}
                    color={color || ''}
                    markdownType={markdownType || ''}
                    token={token || ''}
                    linkText={linkText || ''}
                />
                {help}
            </>
        );

        return (
            this.props.display && (
                <ControlGroupWrapper
                    label={label}
                    help={helpText}
                    tooltip={tooltip}
                    error={this.props.error}
                    dataName={field}
                >
                    <CustomElement>{rowView}</CustomElement>
                </ControlGroupWrapper>
            )
        );
    }
}

ControlWrapper.propTypes = {
    mode: PropTypes.string,
    utilityFuncts: PropTypes.object,
    value: PropTypes.any,
    display: PropTypes.bool,
    error: PropTypes.bool,
    entity: PropTypes.object,
    disabled: PropTypes.bool,
    markdownMessage: PropTypes.object,
    serviceName: PropTypes.string,
    dependencyValues: PropTypes.object,
};

export default ControlWrapper;
