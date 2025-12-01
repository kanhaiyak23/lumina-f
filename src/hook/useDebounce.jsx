import { useEffect, useRef } from "react";

function useDebounce(callback, dependencies, options = {}) {
    const { delay = 500, skipFirstCall = true } = options;
    const firstCall = useRef(skipFirstCall);

    useEffect(() => {
        if (firstCall.current) {
            firstCall.current = false;
            return;
        }

        const handler = setTimeout(() => {
            callback();
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [...dependencies, delay]);
}

export default useDebounce;
