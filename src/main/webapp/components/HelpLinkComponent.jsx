import React from 'react';
import PropTypes from 'prop-types';
import Link from '@splunk/react-ui/Link';

function HelpLinkComponent(props) {
    const { text, link } = props.controlOptions;

    return (
        <Link to={link} openInNewContext>
            {text}
        </Link>
    );
}

HelpLinkComponent.propTypes = {
    controlOptions: PropTypes.object,
};

export default HelpLinkComponent;
