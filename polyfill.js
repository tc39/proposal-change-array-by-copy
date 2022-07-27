// @ts-check
/// <reference path="./polyfill.d.ts" />
/// <reference lib="es2020" />

((arrayPrototype, typedArrayPrototype) => {
    "use strict";

    const typedArrayLength = Function.call.bind(
        Object.getOwnPropertyDescriptor(typedArrayPrototype, "length").get
    );

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

    function toObject(val) {
        if (val === null || val === undefined) {
            throw new TypeError(`${val} is not an object`);
        }
        return Object(val);
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

    /** @typedef {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|BigInt64Array|BigUint64Array} TypedArray */

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
            case 'BigInt64Array':
                return new BigInt64Array(length);
            case 'BigUint64Array':
                return new BigUint64Array(length);
            default:
                /** @type {never} */
                const n = arrayName;
                throw new Error(`Unexpected TypedArray name ${n}`);
        }
    }

    /**
     * @param {TypedArray} example
     * @returns {boolean}
     */
    function isBigIntArray(example) {
        assertTypedArray(example);
        const arrayName = typedArrayNameInternalSlot(example);
        switch (arrayName) {
            case 'BigInt64Array':
            case 'BigUint64Array':
                return true;
        }
        return false;
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

    /**
     * @param {TypedArray} example
     * @param {unknown} value
     * @description convert `value` to bigint or number based on the the type of array
     * @returns {bigint | number}
     * @throws if one of the override methods throws. e.g. `@@toPrimitive`, `valueOf`, `toString`
     */
    function typedArrayNumberConversion(example, value) {
        let asNumber;
        {
            if (isBigIntArray(example)) {
                asNumber = 0n;
            } else {
                asNumber = -0; // important to use `-0` and not `0`
            }
            // @ts-ignore : using `+=` to emulate ToBigInt or ToNumber
            asNumber += value;
        }
        return asNumber;
    }

    defineArrayMethods({
        toReversed() {
            const o = toObject(this);
            const len = lengthOfArrayLike(o);
            const a = new Array(len);
            transfer({ src: o, srcStart: len - 1, srcStep: -1, target: a, targetStart: 0, targetStep: 1, count: len });
            return a;
        },
    });

    defineTypedArrayMethods({
        toReversed() {
            const o = assertTypedArray(this);
            const len = typedArrayLength(o);
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
            const o = toObject(this);
            const len = lengthOfArrayLike(o);
            const a = new Array(len);;
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
            const len = typedArrayLength(o);
            const a = typedArrayCreate(o, len);
            transfer({ src: o, srcStart: 0, target: a, targetStart: 0, count: len });
            typedArrayPrototype.sort.call(a, compareFn);
            return a;
        },
    });

    function calculateSplice({ start, len, deleteCount, values, argsCount }) {
        const relativeStart = toIntegerOrInfinity(start);
        let actualStart;
        if (relativeStart === -Infinity) {
            actualStart = 0;
        } else if (relativeStart < 0) {
            actualStart = Math.max(len + relativeStart, 0);
        } else {
            actualStart = Math.min(relativeStart, len);
        }
        const insertCount = values.length;
        let actualDeleteCount;
        if (/* start is not present */ argsCount === 0) {
            actualDeleteCount = 0;
        } else if (/* deleteCount is not present */ argsCount === 1) {
            actualDeleteCount = len - actualStart;
        } else {
            const dc = toIntegerOrInfinity(deleteCount);
            actualDeleteCount = Math.max(0, Math.min(dc, len - actualStart));
        }
        const newLen = len + insertCount - actualDeleteCount;
        return { actualStart, newLen, actualDeleteCount };
    }

    function doSplice({ src, target, actualStart, actualDeleteCount, values, newLen }) {
        let i = 0;
        while (i < actualStart) {
            target[i] = src[i];
            i++;
        }
        for (const E of values) {
            target[i] = E;
            i++;
        }
        let r = actualStart + actualDeleteCount;
        while (i < newLen) {
            let fromValue = src[r];
            target[i] = fromValue;
            i++;
            r++;
        }
    }

    defineArrayMethods({
        toSpliced(start, deleteCount, ...values) {
            const o = toObject(this);
            const len = lengthOfArrayLike(o);
            const { actualStart, actualDeleteCount, newLen } = calculateSplice({ start, deleteCount, len, values, argsCount: arguments.length });
            if (newLen > Number.MAX_SAFE_INTEGER) {
                throw new TypeError();
            }
            const a = new Array(newLen);
            doSplice({ src: o, target: a, actualStart, actualDeleteCount, values, newLen });
            return a;
        }
    });

    defineArrayMethods({
        with(index, value) {
            const o = toObject(this);
            const len = lengthOfArrayLike(o);
            const relativeIndex = toIntegerOrInfinity(index);
            const actualIndex = relativeIndex < 0 ? len + relativeIndex : relativeIndex;
            if (actualIndex < 0 || actualIndex >= len) {
                throw new RangeError();
            }
            const a = new Array(len);
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
            const len = typedArrayLength(o);
            const relativeIndex = toIntegerOrInfinity(index);
            const actualIndex = relativeIndex < 0 ? len + relativeIndex : relativeIndex;
            const asNumber = typedArrayNumberConversion(o, value);
            if (actualIndex < 0 || actualIndex >= len) {
                throw new RangeError();
            }
            const a = typedArrayCreate(o, len);
            for (let k = 0; k < len; k++) {
                const v = k === actualIndex ? asNumber : o[k];
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

    /** @type {(def: { [N in "with" | "toReversed" | "toSorted"]?: (this: TypedArray, ...args: Parameters<Uint8Array[N]>) => TypedArray }) => void} */
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
