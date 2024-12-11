import {useEffect, useState} from "react";


export const useDebounce = <T>(value: T, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const times = setTimeout(() =>  setDebouncedValue(value), delay);
        return () => clearTimeout(times);
    }, [value, delay]);

    return debouncedValue;
}