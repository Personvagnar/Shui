export function triggerReset(setError, callback, delay) {
    return(errMsg) => {
        setError(errMsg);
        setTimeout(() => {
            setError(null);
            if (callback) callback();
        }, delay);
    };
}