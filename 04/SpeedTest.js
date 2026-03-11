import React, { useEffect } from 'react';
import useRandomItem from './hook';

function SpeedTest() {
    const [word, regenerateWord] = useRandomItem(['devmentor.pl', 'abc', 'JavaScript']);

    useEffect(() => {
        regenerateWord();
    }, []);

    return (
        <div>
            <h1>{word}</h1>
            <input />
        </div>
    );
}

export default SpeedTest;
