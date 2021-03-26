// @ts-check
((arrayPrototype) => {
    /** @type {Array["popped"]} */
    function popped() {
        const copy = [...this];
        copy.pop();
        return copy;
    }

    /** @type {Array["pushed"]} */
    function pushed(...values) {
        const copy = [...this];
        copy.push(...values);
        return copy;
    }

    /** @type {Array["reversed"]} */
    function reversed() {
        const copy = [...this];
        copy.reverse();
        return copy;
    }

    /** @type {Array["shifted"]} */
    function shifted() {
        const copy = [...this];
        copy.shift();
        return copy;
    }

    /** @type {Array["sorted"]} */
    function sorted(compareFn) {
        const copy = [...this];
        copy.sort(compareFn);
        return copy;
    }

    /** @type {Array["spliced"]} */
     function spliced(start, deleteCount, ...values) {
        const copy = [...this];
        copy.splice(start, deleteCount, ...values);
        return copy;
    }

    /** @type {Array["unshifted"]} */
    function unshifted(...values) {
        const copy = [...this];
        copy.unshift(...values);
        return copy;
    }

    /** @type {Array["with"]} */
    function withFn(index, value) {
        const copy = [...this];
        copy[index] = value
        return copy;
    }

    const additions = {
        popped,
        pushed,
        reversed,
        shifted,
        sorted,
        spliced,
        unshifted,
        with: withFn,
    };

    /** @type {PropertyDescriptorMap} */
    const propertyDescriptors = {};

    for (const [name, value] of Object.entries(additions)) {
        propertyDescriptors[name] = {
            enumerable: false,
            configurable: true,
            writable: true,
            value,
        };
    }

    Object.defineProperties(arrayPrototype, propertyDescriptors);
})(Array.prototype);
