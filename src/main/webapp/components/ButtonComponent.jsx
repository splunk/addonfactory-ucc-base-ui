import React from 'react';
import PropTypes from 'prop-types';
import Button from '@splunk/react-ui/Button';

function ButtonComponent(props) {
    const { text, link } = props.controlOptions;

    return <Button to={link} openInNewContext label={text} />;
}

ButtonComponent.propTypes = {
    controlOptions: PropTypes.object,
};

export default ButtonComponent;
