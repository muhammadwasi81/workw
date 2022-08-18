import { useState } from 'react';


export default function Link({ defaultCount }) {
    const [count, setCount] = useState(defaultCount);

    const onIncreament = () => {
        setCount(count + 1);
    };

    const onDecreament = () => {
        setCount(count - 1);
    };

    return (
        <div>
            <h1>Hellow App</h1>
            <h1>Counter here {count}</h1>
            <button onClick={onIncreament} >+</button>
            <button onClick={onDecreament}>-</button>
        </div>
    );
}