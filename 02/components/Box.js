// ./src/components/Box.js
import React from 'react';
import PropTypes from 'prop-types';
import Div from './Div';

function Box(props) {
    const { text } = props;

    return <Div title={text} />;
}

Box.propTypes = {
    text: PropTypes.string.isRequired,
};

export default Box;
