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

    /**
     * @param {number} index
     * @param {number} length
     */
    function resolveRelativeIndex(index, length) {
        const target = toIntegerOrInfinity(index);
        if (target === Number.NEGATIVE_INFINITY) {
            return 0;
        }
        if (target < 0) {
            return Math.max(0, length + target);
        }
        return Math.min(target, length);
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

    /** @typedef {Int8Array} TypedArray */

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
     * @param {TypedArray} species
     * @param {number} length
     * @returns {TypedArray}
     */
    function typedArraySpeciesCreate(species, length) {
        assertTypedArray(species);
        const con = species.constructor;
        // @ts-expect-error
        return new con(length);
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

    /** @type {Array["withCopiedWithin"]} */
    function arrayCopiedWithin(target, start, end) {
        const o = Object(this);
        const len = lengthOfArrayLike(o);
        const a = [];
        const actualTarget = resolveRelativeIndex(target, len);
        const actualStart = start === void 0 ? 0 : resolveRelativeIndex(start, len);
        const actualEnd = end === void 0 ? len : resolveRelativeIndex(end, len);
        let to = 0;
        while (to < actualTarget) {
            a[to] = o[to];
            to++;
        }
        let from = actualStart;
        while (from < actualEnd) {
            a[to] = o[from];
            from++;
            to++;
        }
        while (to < len) {
            a[to] = o[to];
            to++;
        }
        return a;
    }

    /** @type {TypedArray["withCopiedWithin"]} */
    function typedArrayCopiedWithin(target, start, end) {
        const o = assertTypedArray(this);
        const len = o.length;
        const a = typedArraySpeciesCreate(o, len);
        const actualTarget = resolveRelativeIndex(target, len);
        const actualStart = start === void 0 ? 0 : resolveRelativeIndex(start, len);
        const actualEnd = end === void 0 ? len : resolveRelativeIndex(end, len);
        let to = 0;
        while (to < actualTarget) {
            a[to] = o[to];
            to++;
        }
        let from = actualStart;
        while (from < actualEnd) {
            a[to] = o[from];
            from++;
            to++;
        }
        while (to < len) {
            a[to] = o[to];
            to++;
        }
        return a;
    }

    /** @type {Array["withFilled"]} */
    function arrayFilled(value, start, end) {
        const o = Object(this);
        const len = lengthOfArrayLike(o);
        const a = [];
        const actualStart = start === void 0 ? 0 : resolveRelativeIndex(start, len);
        const actualEnd = end === void 0 ? len : resolveRelativeIndex(end, len);
        let to = 0;
        while (to < actualStart) {
            a[to] = o[to];
            to++;
        }
        while (to < actualEnd) {
            a[to] = value;
            to++;
        }
        while (to < len) {
            a[to] = o[to];
            to++;
        }
        return a;
    }

    /** @type {TypedArray["withFilled"]} */
    function typedArrayFilled(value, start, end) {
        const o = assertTypedArray(this);
        const len = o.length;
        const a = typedArraySpeciesCreate(o, len);
        const actualStart = start === void 0 ? 0 : resolveRelativeIndex(start, len);
        const actualEnd = end === void 0 ? len : resolveRelativeIndex(end, len);
        let to = 0;
        while (to < actualStart) {
            a[to] = o[to];
            to++;
        }
        while (to < actualEnd) {
            a[to] = value;
            to++;
        }
        while (to < len) {
            a[to] = o[to];
            to++;
        }
        return a;
    }

    /** @type {Array["withPopped"]} */
    function arrayPopped() {
        const o = Object(this);
        const len = lengthOfArrayLike(o);
        const newLen = Math.max(0, len - 1);
        const a = [];
        transfer({ src: o, srcStart: 0, target: a, targetStart: 0, count: newLen });
        return a;
    }

    /** @type {TypedArray["withPopped"]} */
    function typedArrayPopped() {
        const o = assertTypedArray(this);
        const len = o.length;
        const newLen = Math.max(0, len - 1);
        const a = typedArraySpeciesCreate(o, newLen);
        transfer({ src: o, srcStart: 0, target: a, targetStart: 0, count: newLen });
        return a;
    }

    /** @type {Array["withPushed"]} */
    function arrayPushed(...values) {
        const o = Object(this);
        const len = lengthOfArrayLike(o);
        const a = [];
        transfer({ src: o, srcStart: 0, target: a, targetStart: 0, count: len });
        transfer({ src: values, srcStart: 0, target: a, targetStart: len, count: values.length });
        return a;
    }

    /** @type {TypedArray["withPushed"]} */
    function typedArrayPushed(...values) {
        const o = assertTypedArray(this);
        const len = o.length;
        const newLen = len + values.length;
        const a = typedArraySpeciesCreate(o, newLen);
        transfer({ src: o, srcStart: 0, target: a, targetStart: 0, count: len });
        transfer({ src: values, srcStart: 0, target: a, targetStart: len, count: values.length });
        return a;
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
        const a = typedArraySpeciesCreate(o, len);
        transfer({ src: o, srcStart: len - 1, srcStep: -1, target: a, targetStart: 0, targetStep: 1, count: len });
        return a;
    }

    /** @type {Array["withShifted"]} */
    function arrayShifted() {
        const o = Object(this);
        const len = lengthOfArrayLike(o);
        const newLen = Math.max(0, len - 1);
        const a = [];
        transfer({ src: o, srcStart: 1, target: a, targetStart: 0, count: newLen });
        return a;
    }

    /** @type {TypedArray["withShifted"]} */
    function typedArrayShifted() {
        const o = assertTypedArray(this);
        const len = o.length;
        const newLen = Math.max(0, len - 1);
        const a = typedArraySpeciesCreate(o, newLen);
        transfer({ src: o, srcStart: 1, target: a, targetStart: 0, count: newLen });
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
        const a = typedArraySpeciesCreate(o, len);
        transfer({ src: o, srcStart: 0, target: a, targetStart: 0, count: len });
        typedArrayPrototype.sort.call(a, compareFn);
        return a;
    }

    function calculateSlice({ start, len, deleteCount, values }) {
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

    function doSlice({ src, target, actualStart, actualDeleteCount, values, newLen }) {
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
        const { actualStart, actualDeleteCount, newLen } = calculateSlice({ start, deleteCount, len, values });
        const a = [];
        doSlice({ src: o, target: a, actualStart, actualDeleteCount, values, newLen });
        return a;
    }

    /** @type {TypedArray["withSpliced"]} */
    function typedArraySpliced(start, deleteCount, ...values) {
        const o = assertTypedArray(this);
        const len = o.length;
        const { actualStart, actualDeleteCount, newLen } = calculateSlice({ start, deleteCount, len, values });
        const a = typedArraySpeciesCreate(o, newLen);
        doSlice({ src: o, target: a, actualStart, actualDeleteCount, values, newLen });
        return a;
    }

    /** @type {Array["withUnshifted"]} */
    function arrayUnshifted(...values) {
        const o = Object(this);
        const len = lengthOfArrayLike(o);
        const a = [];
        transfer({ src: values, srcStart: 0, target: a, targetStart: 0, count: values.length });
        transfer({ src: o, srcStart: 0, target: a, targetStart: values.length, count: len });
        return a;
    }

    /** @type {TypedArray["withUnshifted"]} */
    function typedArrayUnshifted(...values) {
        const o = assertTypedArray(this);
        const len = o.length;
        const newLength = values.length + len;
        const a = typedArraySpeciesCreate(o, newLength);
        transfer({ src: values, srcStart: 0, target: a, targetStart: 0, count: values.length });
        transfer({ src: o, srcStart: 0, target: a, targetStart: values.length, count: len });
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
        const a = typedArraySpeciesCreate(o, len);
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

    addToPrototype(arrayPrototype, {
        withCopiedWithin: arrayCopiedWithin,
        withFilled: arrayFilled,
        withPopped: arrayPopped,
        withPushed: arrayPushed,
        withReversed: arrayReversed,
        withShifted: arrayShifted,
        withSorted: arraySorted,
        withSpliced: arraySpliced,
        withUnshifted: arrayUnshifted,
        withAt: arrayWithAt,
    });

    addToPrototype(typedArrayPrototype, {
        withCopiedWithin: typedArrayCopiedWithin,
        withFilled: typedArrayFilled,
        withPopped: typedArrayPopped,
        withPushed: typedArrayPushed,
        withReversed: typedArrayReversed,
        withShifted: typedArrayShifted,
        withSorted: typedArraySorted,
        withSpliced: typedArraySpliced,
        withUnshifted: typedArrayUnshifted,
        withAt: typedArrayWithAt,
    });
})(Array.prototype, Object.getPrototypeOf(Int8Array.prototype));