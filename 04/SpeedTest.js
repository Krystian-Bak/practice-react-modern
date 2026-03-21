import React, { useState, useEffect, useRef } from 'react';
import useRandomItem from './hook';

function SpeedTest() {
    const [word, regenerateWord] = useRandomItem(['Krystian', 'Kamila', 'Iga', 'Anastazja']);

    const [inputValue, setInputValue] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [results, setResults] = useState([]);

    const inputRef = useRef(null);

    useEffect(() => {
        regenerateWord();
    }, []);

    const handleFocus = () => {
        if (!startTime) {
            setStartTime(Date.now());
        }
    };

    const handleChange = (e) => {
        const { value } = e.target;
        setInputValue(value);

        if (value === word) {
            const endTime = Date.now();
            const time = (endTime - startTime) / 1000;

            setResults((prev) => [
                ...prev,
                {
                    id: Date.now(),
                    word,
                    length: word.length,
                    time,
                },
            ]);

            regenerateWord();
            setInputValue('');
            setStartTime(null);

            setTimeout(() => {
                inputRef.current?.focus();
            }, 0);
        }
    };

    return (
        <div>
            <h1>{word}</h1>

            <input
                ref={inputRef}
                value={inputValue}
                onFocus={handleFocus}
                onChange={handleChange}
            />

            <ul>
                {results.map((r) => (
                    <li key={r.id}>
                        {r.word} — {r.length} znaków — {r.time.toFixed(2)}s
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SpeedTest;
