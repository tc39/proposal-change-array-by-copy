// @ts-check
((arrayPrototype) => {
    /** @type {Array["withCopiedWithin"]} */
    function withCopiedWithin(target, start, end) {
        const copy = [...this];
        copy.copyWithin(target, start, end);
        return copy;
    }

    /** @type {Array["withFilled"]} */
    function withFilled(value, start, end) {
        const copy = [...this];
        copy.fill(value, start, end);
        return copy;
    }

    /** @type {Array["withPopped"]} */
    function withPopped() {
        const copy = [...this];
        copy.pop();
        return copy;
    }

    /** @type {Array["withPushed"]} */
    function withPushed(...values) {
        const copy = [...this];
        copy.push(...values);
        return copy;
    }

    /** @type {Array["withReversed"]} */
    function withReversed() {
        const copy = [...this];
        copy.reverse();
        return copy;
    }

    /** @type {Array["withShifted"]} */
    function withShifted() {
        const copy = [...this];
        copy.shift();
        return copy;
    }

    /** @type {Array["withSorted"]} */
    function withSorted(compareFn) {
        const copy = [...this];
        copy.sort(compareFn);
        return copy;
    }

    /** @type {Array["withSpliced"]} */
     function withSpliced(start, deleteCount, ...values) {
        const copy = [...this];
        copy.splice(start, deleteCount, ...values);
        return copy;
    }

    /** @type {Array["withUnshifted"]} */
    function withUnshifted(...values) {
        const copy = [...this];
        copy.unshift(...values);
        return copy;
    }

    /** @type {Array["withAt"]} */
    function withAt(index, value) {
        const copy = [...this];
        copy[index] = value
        return copy;
    }

    const additions = {
        withCopiedWithin,
        withFilled,
        withPopped,
        withPushed,
        withReversed,
        withShifted,
        withSorted,
        withSpliced,
        withUnshifted,
        withAt,
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

        if (name !== 'with') { // 'with' is already a keyword
            arrayPrototype[Symbol.unscopables][name] = true;
        }
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
     * @type {TypedArray["withCopiedWithin"]}
     */
    function withCopiedWithin(target, start, end) {
        assertTypedArray(this);
        const copy = typedArrayPrototype.slice.call(this);
        copy.copyWithin(target, start, end);
        return copy;
    }

    /**
     * @this {TypedArray}
     * @type {TypedArray["withFilled"]}
     */
    function withFilled(value, start, end) {
        assertTypedArray(this);
        const copy = typedArrayPrototype.slice.call(this);
        copy.fill(value, start, end);
        return copy;
    }

    /**
     * @this {TypedArray}
     * @type {TypedArray["withPopped"]}
     */
    function withPopped() {
        return typedArrayPrototype.slice.call(this, 0, -1);
    }

    /**
     * @this {TypedArray}
     * @type {TypedArray["withPushed"]}
     */
    function withPushed(...values) {
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
     * @type {TypedArray["withReversed"]}
     */
    function withReversed() {
        assertTypedArray(this);
        const copy = typedArrayPrototype.slice.call(this);
        copy.reverse();
        return copy;
    }

    /**
     * @this {TypedArray}
     * @type {TypedArray["withShifted"]}
     */
    function withShifted() {
        return typedArrayPrototype.slice.call(this, 1);
    }

    /**
     * @this {TypedArray}
     * @type {TypedArray["withSorted"]}
     */
    function withSorted(compareFn) {
        const copy = typedArrayPrototype.slice.call(this);
        copy.sort(compareFn);
        return copy;
    }

    /**
     * @this {TypedArray}
     * @type {TypedArray["withSpliced"]}
     */
     function withSpliced(start, deleteCount, ...values) {
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
     * @type {TypedArray["withUnshifted"]}
     */
    function withUnshifted(...values) {
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
     * @type {TypedArray["withAt"]}
     */
    function withAt(index, value) {
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
        withCopiedWithin,
        withFilled,
        withPopped,
        withPushed,
        withReversed,
        withShifted,
        withSorted,
        withSpliced,
        withUnshifted,
        withAt,
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
