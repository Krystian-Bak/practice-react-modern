// ./src/App.js
import React, { useState, useMemo } from 'react';
import Box from './Box';
import AppContext from './context';

function App() {
    const [text] = useState('React HelloWorld Modern!');

    const contextValue = useMemo(() => ({ text }), [text]); // eslint zwraca mi błąd żeby uzyć hooksa useMemo()

    return (
        <AppContext.Provider value={contextValue}>
            <Box />
        </AppContext.Provider>
    );
}

export default App;
