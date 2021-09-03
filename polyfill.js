// @ts-check
/// <reference path="./polyfill.d.ts" />

((arrayPrototype, typedArrayPrototype) => {
    function toIntegerOrInfinity(arg) {
        let n = Number(arg);
        if (Number.isNaN(n) || n === 0) {
            return 0;
        }
        if (n === Number.POSITIVE_INFINITY) {
            return Number.POSITIVE_INFINITY;
        }
        if (n === Number.NEGATIVE_INFINITY) {
            return Number.NEGATIVE_INFINITY;
        }
        let i = Math.floor(Math.abs(n));
        if (n < 0) {
            i = -i;
        }
        return i;
    }

    function lengthOfArrayLike(arr) {
        if (!(typeof arr === "object" && arr !== null)) {
            throw new TypeError();
        }
        let len = toIntegerOrInfinity(arr["length"]);
        if (!Number.isFinite(len)) {
            len = 0;
        }
        return Math.max(0, Math.min(len, Number.MAX_SAFE_INTEGER));
    }

    /** @typedef {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} TypedArray */

    /**
     * @param {unknown} v
     * @returns {TypedArray}
     */
    function assertTypedArray(v) {
        typedArrayPrototype.keys.call(v);
        // @ts-expect-error
        return v;
    }

    /**
     * @param {TypedArray} arr
     * @returns {TypedArray[typeof Symbol.toStringTag]}
     */
    function typedArrayNameInternalSlot(arr) {
        return Object.getOwnPropertyDescriptor(typedArrayPrototype, Symbol.toStringTag)
            .get.call(arr);
    }

    /**
     * @param {TypedArray} example
     * @param {number} length
     * @returns {TypedArray}
     */
    function typedArrayCreate(example, length) {
        assertTypedArray(example);
        const arrayName = typedArrayNameInternalSlot(example);
        switch (arrayName) {
            case 'Int8Array':
                return new Int8Array(length);
            case 'Uint8Array':
                return new Uint8Array(length);
            case 'Uint8ClampedArray':
                return new Uint8ClampedArray(length);
            case 'Int16Array':
                return new Int16Array(length);
            case 'Uint16Array':
                return new Uint16Array(length);
            case 'Int32Array':
                return new Int32Array(length);
            case 'Uint32Array':
                return new Uint32Array(length);
            case 'Float32Array':
                return new Float32Array(length);
            case 'Float64Array':
                return new Float64Array(length);
            default:
                /** @type {never} */
                const n = arrayName;
                throw new Error(`Unexpected TypedArray name ${n}`);
        }
    }

    function transfer({ count, src, srcStart, srcStep = 1, target, targetStart, targetStep = srcStep }) {
        let from = srcStart;
        let to = targetStart;
        for (let i = 0; i < count; i++) {
            target[to] = src[from];
            from += srcStep;
            to += targetStep;
        }
    }

    /** @type {Array["withReversed"]} */
    function arrayReversed() {
        const o = Object(this);
        const len = lengthOfArrayLike(o);
        const a = [];
        transfer({ src: o, srcStart: len - 1, srcStep: -1, target: a, targetStart: 0, targetStep: 1, count: len });
        return a;
    }

    /** @type {TypedArray["withReversed"]} */
    function typedArrayReversed() {
        const o = assertTypedArray(this);
        const len = o.length;
        const a = typedArrayCreate(o, len);
        transfer({ src: o, srcStart: len - 1, srcStep: -1, target: a, targetStart: 0, targetStep: 1, count: len });
        return a;
    }

    /** @type {Array["withSorted"]} */
    function arraySorted(compareFn) {
        if (compareFn !== void 0 && typeof compareFn !== "function") {
            throw new TypeError();
        }
        const o = Object(this);
        const len = lengthOfArrayLike(o);
        const a = [];
        transfer({ src: o, srcStart: 0, target: a, targetStart: 0, count: len });
        arrayPrototype.sort.call(a, compareFn);
        return a;
    }

    /** @type {TypedArray["withSorted"]} */
    function typedArraySorted(compareFn) {
        if (compareFn !== void 0 && typeof compareFn !== "function") {
            throw new TypeError();
        }
        const o = assertTypedArray(this);
        const len = o.length;
        const a = typedArrayCreate(o, len);
        transfer({ src: o, srcStart: 0, target: a, targetStart: 0, count: len });
        typedArrayPrototype.sort.call(a, compareFn);
        return a;
    }

    function calculateSplice({ start, len, deleteCount, values }) {
        const relativeStart = toIntegerOrInfinity(start);
        let actualStart;
        if (relativeStart === -Infinity) {
            actualStart = 0;
        } else if (relativeStart < 0) {
            actualStart = Math.max(len + relativeStart, 0);
        } else {
            actualStart = Math.min(relativeStart, len);
        }
        let insertCount;
        let actualDeleteCount;
        if (start === void 0) {
            insertCount = 0;
            actualDeleteCount = 0;
        } else if (deleteCount === void 0) {
            insertCount = 0;
            actualDeleteCount = len - actualStart;
        } else {
            insertCount = values.length;
            const dc = toIntegerOrInfinity(deleteCount);
            actualDeleteCount = Math.max(0, Math.min(dc, len - actualStart));
        }
        const newLen = len + insertCount - actualDeleteCount;
        return { actualStart, newLen, actualDeleteCount };
    }

    function doSplice({ src, target, actualStart, actualDeleteCount, values, newLen }) {
        let k = 0;
        while (k < actualStart) {
            target[k] = src[k];
            k++;
        }
        for (const E of values) {
            target[k] = E;
            k++;
        }
        while (k < newLen) {
            let from = k + actualDeleteCount - values.length;
            let fromValue = src[from];
            target[k] = fromValue;
            k++;
        }
    }

    /** @type {Array["withSpliced"]} */
    function arraySpliced(start, deleteCount, ...values) {
        const o = Object(this);
        const len = lengthOfArrayLike(o);
        const { actualStart, actualDeleteCount, newLen } = calculateSplice({ start, deleteCount, len, values });
        const a = [];
        doSplice({ src: o, target: a, actualStart, actualDeleteCount, values, newLen });
        return a;
    }

    /** @type {TypedArray["withSpliced"]} */
    function typedArraySpliced(start, deleteCount, ...values) {
        const o = assertTypedArray(this);
        const len = o.length;
        const { actualStart, actualDeleteCount, newLen } = calculateSplice({ start, deleteCount, len, values });
        const a = typedArrayCreate(o, newLen);
        doSplice({ src: o, target: a, actualStart, actualDeleteCount, values, newLen });
        return a;
    }

    /** @type {Array["withAt"]} */
    function arrayWithAt(index, value) {
        const o = Object(this);
        const len = lengthOfArrayLike(o);
        const actualIndex = index < 0 ? len + index : index;
        if (actualIndex < 0 || actualIndex >= len) {
            throw new RangeError();
        }
        const a = [];
        for (let k = 0; k < len; k++) {
            const v = k === actualIndex ? value : o[k];
            a[k] = v;
        }
        return a;
    }

    /** @type {TypedArray["withAt"]} */
    function typedArrayWithAt(index, value) {
        const o = assertTypedArray(this);
        const len = o.length;
        const actualIndex = index < 0 ? len + index : index;
        if (actualIndex < 0 || actualIndex >= len) {
            throw new RangeError();
        }
        const a = typedArrayCreate(o, len);
        for (let k = 0; k < len; k++) {
            const v = k === actualIndex ? value : o[k];
            a[k] = v;
        }
        return a;
    }

    /**
     * @param {object} prototype
     * @param {{ [name: string]: Function }} additions
     */
    function addToPrototype(prototype, additions) {
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

        Object.defineProperties(prototype, propertyDescriptors);
    }

    const arrayMethods = {
        withAt: arrayWithAt,
        withReversed: arrayReversed,
        withSorted: arraySorted,
        withSpliced: arraySpliced,
    };

    addToPrototype(arrayPrototype, arrayMethods);

    for (const method of Object.keys(arrayMethods)) {
        arrayPrototype[Symbol.unscopables][method] = true;
    }

    addToPrototype(typedArrayPrototype, {
        withAt: typedArrayWithAt,
        withReversed: typedArrayReversed,
        withSorted: typedArraySorted,
        withSpliced: typedArraySpliced,
    });
})(Array.prototype, Object.getPrototypeOf(Int8Array.prototype));
