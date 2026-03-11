import { useState } from 'react';

const useRandomItem = (itemsList) => {
    if (!Array.isArray(itemsList)) throw new Error('Parameter itemsList is not an array!');

    const [state, setState] = useState(null);

    const randomItem = () => {
        const rand = Math.floor(Math.random() * itemsList.length);
        setState(itemsList[rand]);
    };

    return [state, randomItem];
};

export default useRandomItem;
