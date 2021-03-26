// @ts-check
((arrayPrototype) => {
    /** @this {Array} */
    function popped() {
        const copy = [...this];
        copy.pop();
        return copy;
    }


    const additions = {
        popped,
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
