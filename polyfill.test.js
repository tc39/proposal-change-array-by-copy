// @ts-check
require("./polyfill.js");
const tape = require("tape");

tape("Array.prototype.toReversed works with array-like values", (t) => {
    const orig = {
        0: 3,
        1: 2,
        2: 1,
        length: 3
    };
    const expected = [1, 2, 3];

    const copy = Array.prototype.toReversed.call(orig);

    t.deepEqual(copy, expected);
    t.notEqual(orig, copy);
    t.notDeepEqual(orig, copy);
    t.end();
});

tape("Array.prototype.toReversed", (t) => {
    const orig = [3, 2, 1];
    const expected = [1, 2, 3];

    const copy = orig.toReversed();

    t.deepEqual(copy, expected);
    t.notEqual(orig, copy);
    t.notDeepEqual(orig, copy);
    t.end();
});

tape("Array.prototype.toSorted", (t) => {
    const orig = [3, 1, 2];
    const expected = [1, 2, 3];

    const copy = orig.toSorted();

    t.deepEqual(copy, expected);
    t.notEqual(orig, copy);
    t.notDeepEqual(orig, copy);
    t.end();
});

tape("Array.prototype.toSorted(compareFn)", (t) => {
    const orig = [3, 1, 2];
    const expected = [3, 2, 1];
    function compareFn(a, b) {
        return a > b ? -1 : 1;
    }

    const copy = orig.toSorted(compareFn);

    t.deepEqual(copy, expected);
    t.notEqual(orig, copy);
    t.notDeepEqual(orig, copy);
    t.end();
});

tape("Array.prototype.toSpliced", (t) => {
    const orig = [1, -1, 0, -1, 4];
    const expected = [1, 2, 3, 4];
    const idx = 1;
    const delNum = 3;
    const ins = [2, 3];

    const copy = orig.toSpliced(idx, delNum, ...ins);

    t.deepEqual(copy, expected);
    t.notEqual(orig, copy);
    t.notDeepEqual(orig, copy);
    t.end();
});

tape("Array.prototype.with", (t) => {
    const orig = [1, 1, 3];
    const expected = [1, 2, 3];
    const idx = 1;
    const val = 2;

    const copy = orig.with(idx, val);

    t.deepEqual(copy, expected);
    t.notEqual(orig, copy);
    t.notDeepEqual(orig, copy);
    t.end();
});

tape(`Array.prototype.with negativeIndex`, (t) => {
    const orig = [1, 2, 2];
    const expected = [1, 2, 3];
    const idx = -1;
    const val = 3;

    const copy = orig.with(idx, val);

    t.deepEqual(copy, expected);
    t.notEqual(orig, copy);
    t.notDeepEqual(orig, copy);
    t.end();
});

tape(`Array.prototype.with out of bounds`, (t) => {
    const orig = [1, 2, 2];
    const idx = 3;
    const val = 4;

    t.throws(() => {
        orig.with(idx, val);
    }, RangeError);

    t.end();
});

tape(`Array does not use Symbol.species for the new methods`, (t) => {
    class SubClass extends Array { }

    const orig = new SubClass([1, 2, 3]);

    function assertType(arr) {
        t.equal(arr instanceof SubClass, false);
        t.equal(arr instanceof Array, true);
    }

    assertType(orig.with(0, 0));
    assertType(orig.toReversed());
    assertType(orig.toSorted());
    assertType(orig.toSpliced(0, 0));

    t.end();
});

tape("Array.prototype[Symbol.unscopables]", (t) => {
    const methodNames = ['toReversed', 'toSorted', 'toSpliced']; // 'with' is omitted as it is a keyword
    t.plan(6);

    // ensure we are checking the correct methods names, otherwise test will always pass, regardless of Symbol.unscopables
    for (const method of methodNames) {
        t.equal(typeof Array.prototype[method], 'function');
    }

    const marker = Symbol();
    const toReversed = marker;
    const toSorted = marker;
    const toSpliced = marker;

    // @ts-expect-error: 'with' is unsupported
    with ([]) {
        for (const method of methodNames) {
            t.equal(eval(method), marker);
        }
    }
    t.end();
});

[
    Int8Array,
    Uint8Array,
    Uint8ClampedArray,
    Int16Array,
    Uint16Array,
    Int32Array,
    Uint32Array,
    Float32Array,
    Float64Array
].forEach((TypedArray) => {
    tape(`${TypedArray.name}.prototype.toReversed`, (t) => {
        const orig = new TypedArray([3, 2, 1]);
        const expected = new TypedArray([1, 2, 3]);

        const copy = orig.toReversed();

        t.deepEqual(copy, expected);
        t.notEqual(orig, copy);
        t.notDeepEqual(orig, copy);
        t.end();
    });

    tape(`${TypedArray.name}.prototype.toSorted`, (t) => {
        const orig = new TypedArray([3, 1, 2]);
        const expected = new TypedArray([1, 2, 3]);

        const copy = orig.toSorted();

        t.deepEqual(copy, expected);
        t.notEqual(orig, copy);
        t.notDeepEqual(orig, copy);
        t.end();
    });

    tape(`${TypedArray.name}.prototype.toSorted(compareFn)`, (t) => {
        const orig = new TypedArray([3, 1, 2]);
        const expected = new TypedArray([3, 2, 1]);
        function compareFn(a, b) {
            return a > b ? -1 : 1;
        }

        const copy = orig.toSorted(compareFn);

        t.deepEqual(copy, expected);
        t.notEqual(orig, copy);
        t.notDeepEqual(orig, copy);
        t.end();
    });

    tape(`${TypedArray.name}.prototype.with`, (t) => {
        const orig = new TypedArray([1, 1, 3]);
        const expected = new TypedArray([1, 2, 3]);
        const idx = 1;
        const val = 2;

        const copy = orig.with(idx, val);

        t.deepEqual(copy, expected);
        t.notEqual(orig, copy);
        t.notDeepEqual(orig, copy);
        t.end();
    });

    tape(`${TypedArray.name}.prototype.with negativeIndex`, (t) => {
        const orig = new TypedArray([1, 2, 2]);
        const expected = new TypedArray([1, 2, 3]);
        const idx = -1;
        const val = 3;

        const copy = orig.with(idx, val);

        t.deepEqual(copy, expected);
        t.notEqual(orig, copy);
        t.notDeepEqual(orig, copy);
        t.end();
    });

    tape(`${TypedArray.name}.prototype.with out of bounds`, (t) => {
        const orig = new TypedArray([1, 2, 2]);
        const idx = 3;
        const val = 4;

        t.throws(() => {
            orig.with(idx, val);
        }, RangeError);

        t.end();
    });

    tape(`${TypedArray.name}.prototype.with executes 'user code' before starting copy`, (t) => {
        const orig = new TypedArray([1, 2, 3]);
        const idx = 1;
        const valueUserCodeWillInsert = 4;
        const userCodeReturnValue = 5;
        const expected = new TypedArray([valueUserCodeWillInsert, userCodeReturnValue, 3]);
        let userCodeExecuted = false;
        /** @type any */
        const val = {
            valueOf() {
                userCodeExecuted = true;
                orig[0] = valueUserCodeWillInsert;
                return userCodeReturnValue;
            }
        };

        const copy = orig.with(idx, val);
        t.assert(userCodeExecuted);
        t.deepEqual(copy, expected);

        t.end();
    });

    tape(`${TypedArray.name} does not use Symbol.species for the new methods`, (t) => {
        class SubClass extends TypedArray { }

        function assertType(arr) {
            t.equal(arr instanceof SubClass, false);
            t.equal(arr instanceof TypedArray, true);
        }

        /** @type {Uint8Array} */
        // @ts-ignore
        const orig = new SubClass([1, 2, 3]);

        assertType(orig.with(0, 0));
        assertType(orig.toReversed());
        assertType(orig.toSorted());

        t.end();
    });
});

[
    BigInt64Array,
    BigUint64Array
].forEach((BigIntArray) => {
    tape(`${BigIntArray.name}.prototype.toReversed`, (t) => {
        const orig = new BigIntArray([3n, 2n, 1n]);
        const expected = new BigIntArray([1n, 2n, 3n]);

        const copy = orig.toReversed();

        t.deepEqual(copy, expected);
        t.notEqual(orig, copy);
        t.notDeepEqual(orig, copy);
        t.end();
    });

    tape(`${BigIntArray.name}.prototype.toSorted`, (t) => {
        const orig = new BigIntArray([3n, 1n, 2n]);
        const expected = new BigIntArray([1n, 2n, 3n]);

        const copy = orig.toSorted();

        t.deepEqual(copy, expected);
        t.notEqual(orig, copy);
        t.notDeepEqual(orig, copy);
        t.end();
    });

    tape(`${BigIntArray.name}.prototype.toSorted(compareFn)`, (t) => {
        const orig = new BigIntArray([3n, 1n, 2n]);
        const expected = new BigIntArray([3n, 2n, 1n]);
        function compareFn(a, b) {
            return a > b ? -1 : 1;
        }

        const copy = orig.toSorted(compareFn);

        t.deepEqual(copy, expected);
        t.notEqual(orig, copy);
        t.notDeepEqual(orig, copy);
        t.end();
    });

    tape(`${BigIntArray.name}.prototype.with`, (t) => {
        const orig = new BigIntArray([1n, 1n, 3n]);
        const expected = new BigIntArray([1n, 2n, 3n]);
        const idx = 1;
        const val = 2n;

        const copy = orig.with(idx, val);

        t.deepEqual(copy, expected);
        t.notEqual(orig, copy);
        t.notDeepEqual(orig, copy);
        t.end();
    });

    tape(`${BigIntArray.name}.prototype.with non bigint throws`, (t) => {
        const orig = new BigIntArray([1n, 2n, 2n]);
        const idx = 3;
        const val = 4;

        t.throws(() => {
            // @ts-expect-error inserting number instead of bigint
            orig.with(idx, val);
        }, TypeError);

        t.end();
    });

    tape(`${BigIntArray.name}.prototype.with negativeIndex`, (t) => {
        const orig = new BigIntArray([1n, 2n, 2n]);
        const expected = new BigIntArray([1n, 2n, 3n]);
        const idx = -1;
        const val = 3n;

        const copy = orig.with(idx, val);

        t.deepEqual(copy, expected);
        t.notEqual(orig, copy);
        t.notDeepEqual(orig, copy);
        t.end();
    });

    tape(`${BigIntArray.name}.prototype.with out of bounds`, (t) => {
        const orig = new BigIntArray([1n, 2n, 2n]);
        const idx = 3;
        const val = 4n;

        t.throws(() => {
            orig.with(idx, val);
        }, RangeError);

        t.end();
    });

    tape(`${BigIntArray.name}.prototype.with executes 'user code' before starting copy`, (t) => {
        const orig = new BigIntArray([1n, 2n, 3n]);
        const idx = 1;
        const valueUserCodeWillInsert = 4n;
        const userCodeReturnValue = 5n;
        const expected = new BigIntArray([valueUserCodeWillInsert, userCodeReturnValue, 3n]);
        let userCodeExecuted = false;
        /** @type any */
        const val = {
            valueOf() {
                userCodeExecuted = true;
                orig[0] = valueUserCodeWillInsert;
                return userCodeReturnValue;
            }
        };

        const copy = orig.with(idx, val);
        t.assert(userCodeExecuted);
        t.deepEqual(copy, expected);

        t.end();
    });

    tape(`${BigIntArray.name} does not use Symbol.species for the new methods`, (t) => {
        class SubClass extends BigIntArray { }

        function assertType(arr) {
            t.equal(arr instanceof SubClass, false);
            t.equal(arr instanceof BigIntArray, true);
        }

        /** @type {BigInt64Array} */
        // @ts-ignore
        const orig = new SubClass([1n, 2n, 3n]);

        assertType(orig.with(0, 0n));
        assertType(orig.toReversed());
        assertType(orig.toSorted());

        t.end();
    });
});
