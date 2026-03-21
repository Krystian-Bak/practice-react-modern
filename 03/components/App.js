// ./src/components/App.js
import React from 'react';
import Box from './Box';
import Div from './Div';
import { ColorContext, TextContext } from '../context';

function App() {
    return (
        <ColorContext.Provider value="red">
            <section>
                <Box />
                <TextContext.Provider value="sibling">
                    <Div />
                </TextContext.Provider>
            </section>
        </ColorContext.Provider>
    );
}

export default App;
