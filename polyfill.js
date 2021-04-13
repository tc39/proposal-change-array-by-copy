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

((typedArrayPrototype) => {
    /** @typedef {Int8Array} TypedArray */

    function toIntegerOrInfinity(arg) {
        let n = Number(arg);
        if (Number.isNaN(n) || n === 0) {
            return 0;
        }
        if (n === Number.POSITIVE_INFINITY) {
            return Number.POSITIVE_INFINITY
        };
        if (n === Number.NEGATIVE_INFINITY) {
            return Number.NEGATIVE_INFINITY;
        }
        let i = Math.floor(Math.abs(n));
        if (n < 0) {
            i = -i;
        }
        return i;
    }

    /**
     * @param {unknown} v
     * @returns {asserts v is TypedArray}
     */
    function assertTypedArray(v) {
        typedArrayPrototype.keys.call(v);
    }

    /**
     * @param {TypedArray} species
     * @param {number} length
     * @returns {TypedArray}
     */
    function typedArraySpeciesCreate(species, length) {
        assertTypedArray(species);
        /** @type {any} */
        const con = species.constructor;
        return new con(length);
    }

    /**
     * @this {TypedArray}
     * @type {TypedArray["popped"]}
     */
    function popped() {
        return typedArrayPrototype.slice.call(this, 0, -1);
    }

    /**
     * @this {TypedArray}
     * @type {TypedArray["pushed"]}
     */
    function pushed(...values) {
        assertTypedArray(this);
        const newLength = this.length + values.length;
        const copy = typedArraySpeciesCreate(this, newLength);
        let k = 0;
        for (const v of this) {
            copy[k++] = v;
        }
        for (const v of values) {
            copy[k++] = v;
        }
        return copy;
    }

    /**
     * @this {TypedArray}
     * @type {TypedArray["reversed"]}
     */
    function reversed() {
        assertTypedArray(this);
        const copy = typedArrayPrototype.slice.call(this);
        copy.reverse();
        return copy;
    }

    /**
     * @this {TypedArray}
     * @type {TypedArray["shifted"]}
     */
    function shifted() {
        return typedArrayPrototype.slice.call(this, 1);
    }

    /**
     * @this {TypedArray}
     * @type {TypedArray["sorted"]}
     */
    function sorted(compareFn) {
        const copy = typedArrayPrototype.slice.call(this);
        copy.sort(compareFn);
        return copy;
    }

    /**
     * @this {TypedArray}
     * @type {TypedArray["spliced"]}
     */
     function spliced(start, deleteCount, ...values) {
        assertTypedArray(this);
        const len = this.length;
        const relativeStart = toIntegerOrInfinity(start);
        let actualStart;
        if (relativeStart === -Infinity) {
            actualStart = 0;
        }
        else if (relativeStart < 0) {
            actualStart = Math.max(len + relativeStart, 0);
        }
        else {
            actualStart = Math.min(relativeStart, len);
        }
        let insertCount;
        let actualDeleteCount;
        if (start === void 0) {
            insertCount = 0;
            actualDeleteCount = 0;
        }
        else if (deleteCount === void 0) {
            insertCount = 0;
            actualDeleteCount = len - actualStart;
        }
        else {
            insertCount = values.length;
            const dc = toIntegerOrInfinity(deleteCount);
            actualDeleteCount = Math.max(0, Math.min(dc, len - actualStart))
        }
        const newLen = len + insertCount - actualDeleteCount;
        const copy = typedArraySpeciesCreate(this, newLen);
        let k = 0;
        while (k < actualStart) {
            copy[k] = this[k]
            k++;
        }
        for (const E of values) {
            copy[k] = E;
            k++;
        }
        while (k < newLen) {
            let from = k + actualDeleteCount - insertCount;
            let fromValue = this[from];
            copy[k] = fromValue;
            k++;
        }
        return copy;
    }

    /**
     * @this {TypedArray}
     * @type {TypedArray["unshifted"]}
     */
    function unshifted(...values) {
        assertTypedArray(this);
        const newLength = values.length + this.length;
        const copy = typedArraySpeciesCreate(this, newLength);
        let k = 0;
        for (const v of values) {
            copy[k++] = v;
        }
        for (const v of this) {
            copy[k++] = v;
        }
        return copy;
    }

    /**
     * @this {TypedArray}
     * @type {TypedArray["with"]}
     */
    function withFn(index, value) {
        assertTypedArray(this);
        const actualIndex = index < 0 ? this.length + index : index;
        if (actualIndex < 0 || actualIndex >= this.length) {
            throw new RangeError();
        }
        const copy = typedArrayPrototype.slice.call(this);
        copy[actualIndex] = value;
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

    Object.defineProperties(typedArrayPrototype, propertyDescriptors);
})(Object.getPrototypeOf(Int8Array.prototype));
