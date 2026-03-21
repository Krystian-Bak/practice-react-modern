// ./src/components/Box.js
import React, { useContext } from 'react';
import { ColorContext, TextContext } from '../context';
import Div from './Div';

function Box() {
    const borderColor = useContext(ColorContext);
    const text = useContext(TextContext);

    return (
        <div
            style={{
                border: `.5rem solid ${borderColor}`,
                padding: '.75rem',
                marginBottom: '1rem',
            }}
        >
            <h1>{text}</h1>
            {}
            <Div />
        </div>
    );
}

export default Box;
