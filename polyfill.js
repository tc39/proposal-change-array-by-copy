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

    defineArrayMethods({
        toReversed() {
            const o = Object(this);
            const len = lengthOfArrayLike(o);
            const a = [];
            transfer({ src: o, srcStart: len - 1, srcStep: -1, target: a, targetStart: 0, targetStep: 1, count: len });
            return a;
        },
    });

    defineTypedArrayMethods({
        toReversed() {
            const o = assertTypedArray(this);
            const len = o.length;
            const a = typedArrayCreate(o, len);
            transfer({ src: o, srcStart: len - 1, srcStep: -1, target: a, targetStart: 0, targetStep: 1, count: len });
            return a;
        },
    });

    defineArrayMethods({
        toSorted(compareFn) {
            if (compareFn !== void 0 && typeof compareFn !== "function") {
                throw new TypeError();
            }
            const o = Object(this);
            const len = lengthOfArrayLike(o);
            const a = [];
            transfer({ src: o, srcStart: 0, target: a, targetStart: 0, count: len });
            arrayPrototype.sort.call(a, compareFn);
            return a;
        },
    });

    defineTypedArrayMethods({
        toSorted(compareFn) {
            if (compareFn !== void 0 && typeof compareFn !== "function") {
                throw new TypeError();
            }
            const o = assertTypedArray(this);
            const len = o.length;
            const a = typedArrayCreate(o, len);
            transfer({ src: o, srcStart: 0, target: a, targetStart: 0, count: len });
            typedArrayPrototype.sort.call(a, compareFn);
            return a;
        },
    });

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

    defineArrayMethods({
        toSpliced(start, deleteCount, ...values) {
            const o = Object(this);
            const len = lengthOfArrayLike(o);
            const { actualStart, actualDeleteCount, newLen } = calculateSplice({ start, deleteCount, len, values });
            const a = [];
            doSplice({ src: o, target: a, actualStart, actualDeleteCount, values, newLen });
            return a;
        }
    });

    defineTypedArrayMethods({
        toSpliced(start, deleteCount, ...values) {
            const o = assertTypedArray(this);
            const len = o.length;
            const { actualStart, actualDeleteCount, newLen } = calculateSplice({ start, deleteCount, len, values });
            const a = typedArrayCreate(o, newLen);
            doSplice({ src: o, target: a, actualStart, actualDeleteCount, values, newLen });
            return a;
        }
    });

    defineArrayMethods({
        with(index, value) {
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
    });

    defineTypedArrayMethods({
        with(index, value) {
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
    });

    /** @type {(def: { [N in "with" | "toReversed" | "toSorted" | "toSpliced"]?: typeof Array.prototype[N] }) => void} */
    function defineArrayMethods(def) {
        defineMethods(arrayPrototype, def).forEach(name => {
            if (name !== 'with') { // 'with' is already a keyword
                arrayPrototype[Symbol.unscopables][name] = true;
            }
        });
    }

    /** @type {(def: { [N in "with" | "toReversed" | "toSorted" | "toSpliced"]?: (this: TypedArray, ...args: Parameters<Uint8Array[N]>) => TypedArray }) => void} */
    function defineTypedArrayMethods(def) {
        defineMethods(typedArrayPrototype, def);
    }

    function defineMethods(obj, def) {
        return Object.entries(def).map(([name, method]) => {
            Object.defineProperty(obj, name, {
                value: method,
                enumerable: false,
                configurable: true,
                writable: true,
            });
            return name;
        });
    }
})(Array.prototype, Object.getPrototypeOf(Int8Array.prototype));
