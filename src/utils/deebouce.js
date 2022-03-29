export function deebouce(fn, delay) {
    let timer = null;
    return function () {
        if (timer !== null) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.call(this);
        }, delay);
    }
}