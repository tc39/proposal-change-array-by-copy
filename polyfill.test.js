// @ts-check
require("./polyfill.js");
const tape = require("tape");

tape("Array.prototype.withReversed works with array-like values", (t) => {
    const orig = {
        0: 3,
        1: 2,
        2: 1,
        length: 3
    };
    const expected = [1, 2, 3];

    const copy = Array.prototype.withReversed.call(orig);

    t.deepEqual(copy, expected);
    t.notEqual(orig, copy);
    t.notDeepEqual(orig, copy);
    t.end();
});

tape("Array.prototype.withReversed", (t) => {
    const orig = [3, 2, 1];
    const expected = [1, 2, 3];

    const copy = orig.withReversed();

    t.deepEqual(copy, expected);
    t.notEqual(orig, copy);
    t.notDeepEqual(orig, copy);
    t.end();
});

tape("Array.prototype.withSorted", (t) => {
    const orig = [3, 1, 2];
    const expected = [1, 2, 3];

    const copy = orig.withSorted();

    t.deepEqual(copy, expected);
    t.notEqual(orig, copy);
    t.notDeepEqual(orig, copy);
    t.end();
});

tape("Array.prototype.withSorted(compareFn)", (t) => {
    const orig = [3, 1, 2];
    const expected = [3, 2, 1];
    function compareFn(a, b) {
        return a > b ? -1 : 1;
    }

    const copy = orig.withSorted(compareFn);

    t.deepEqual(copy, expected);
    t.notEqual(orig, copy);
    t.notDeepEqual(orig, copy);
    t.end();
});

tape("Array.prototype.withSpliced", (t) => {
    const orig = [1, -1, 0, -1, 4];
    const expected = [1, 2, 3, 4];
    const idx = 1;
    const delNum = 3;
    const ins = [2, 3];

    const copy = orig.withSpliced(idx, delNum, ...ins);

    t.deepEqual(copy, expected);
    t.notEqual(orig, copy);
    t.notDeepEqual(orig, copy);
    t.end();
});

tape("Array.prototype.withAt", (t) => {
    const orig = [1, 1, 3];
    const expected = [1, 2, 3];
    const idx = 1;
    const val = 2;

    const copy = orig.withAt(idx, val);

    t.deepEqual(copy, expected);
    t.notEqual(orig, copy);
    t.notDeepEqual(orig, copy);
    t.end();
});

tape(`Array.prototype.withAt negativeIndex`, (t) => {
    const orig = [1, 2, 2];
    const expected = [1, 2, 3];
    const idx = -1;
    const val = 3;

    const copy = orig.withAt(idx, val);

    t.deepEqual(copy, expected);
    t.notEqual(orig, copy);
    t.notDeepEqual(orig, copy);
    t.end();
});

tape(`Array.prototype.withAt out of bounds`, (t) => {
    const orig = [1, 2, 2];
    const idx = 3;
    const val = 4;

    t.throws(() => {
        orig.withAt(idx, val);
    }, RangeError);

    t.end();
});

tape(`Array does not use Symbol.species for the new methods`, (t) => {
    class SubClass extends Array {}

    const orig = new SubClass([1, 2, 3]);

    function assertType(arr) {
        t.equal(arr instanceof SubClass, false);
        t.equal(arr instanceof Array, true);
    }

    assertType(orig.withAt(0, 0));
    assertType(orig.withReversed());
    assertType(orig.withSorted());
    assertType(orig.withSpliced(0, 0));

    t.end();
});

tape("Array.prototype[Symbol.unscopables]", (t) => {
    const methodNames = ['withAt', 'withReversed', 'withSorted', 'withSpliced'];

    // ensure we are checking the correct methods names, otherwise test will always pass, regardless of Symbol.unscopables
    for (const method of methodNames) {
        t.equal(typeof Array.prototype[method], 'function');
    }

    const marker = Symbol();
    const withAt = marker;
    const withReversed = marker;
    const withSorted = marker;
    const withSpliced = marker;

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
    tape(`${TypedArray.name}.prototype.withReversed`, (t) => {
        const orig = new TypedArray([3, 2, 1]);
        const expected = new TypedArray([1, 2, 3]);

        const copy = orig.withReversed();

        t.deepEqual(copy, expected);
        t.notEqual(orig, copy);
        t.notDeepEqual(orig, copy);
        t.end();
    });

    tape(`${TypedArray.name}.prototype.withSorted`, (t) => {
        const orig = new TypedArray([3, 1, 2]);
        const expected = new TypedArray([1, 2, 3]);

        const copy = orig.withSorted();

        t.deepEqual(copy, expected);
        t.notEqual(orig, copy);
        t.notDeepEqual(orig, copy);
        t.end();
    });

    tape(`${TypedArray.name}.prototype.withSorted(compareFn)`, (t) => {
        const orig = new TypedArray([3, 1, 2]);
        const expected = new TypedArray([3, 2, 1]);
        function compareFn(a, b) {
            return a > b ? -1 : 1;
        }

        const copy = orig.withSorted(compareFn);

        t.deepEqual(copy, expected);
        t.notEqual(orig, copy);
        t.notDeepEqual(orig, copy);
        t.end();
    });

    tape(`${TypedArray.name}.prototype.withSpliced`, (t) => {
        const orig = new TypedArray([1, -1, 0, -1, 4]);
        const expected = new TypedArray([1, 2, 3, 4]);
        const idx = 1;
        const delNum = 3;
        const ins = [2, 3];

        const copy = orig.withSpliced(idx, delNum, ...ins);

        t.deepEqual(copy, expected);
        t.notEqual(orig, copy);
        t.notDeepEqual(orig, copy);
        t.end();
    });

    tape(`${TypedArray.name}.prototype.withAt`, (t) => {
        const orig = new TypedArray([1, 1, 3]);
        const expected = new TypedArray([1, 2, 3]);
        const idx = 1;
        const val = 2;

        const copy = orig.withAt(idx, val);

        t.deepEqual(copy, expected);
        t.notEqual(orig, copy);
        t.notDeepEqual(orig, copy);
        t.end();
    });

    tape(`${TypedArray.name}.prototype.withAt negativeIndex`, (t) => {
        const orig = new TypedArray([1, 2, 2]);
        const expected = new TypedArray([1, 2, 3]);
        const idx = -1;
        const val = 3;

        const copy = orig.withAt(idx, val);

        t.deepEqual(copy, expected);
        t.notEqual(orig, copy);
        t.notDeepEqual(orig, copy);
        t.end();
    });

    tape(`${TypedArray.name}.prototype.withAt out of bounds`, (t) => {
        const orig = new TypedArray([1, 2, 2]);
        const idx = 3;
        const val = 4;

        t.throws(() => {
            orig.withAt(idx, val);
        }, RangeError);

        t.end();
    });

    tape(`${TypedArray.name} does not use Symbol.species for the new methods`, (t) => {
        class SubClass extends TypedArray {}

        function assertType(arr) {
            t.equal(arr instanceof SubClass, false);
            t.equal(arr instanceof TypedArray, true);
        }

        /** @type {Uint8Array} */
        // @ts-ignore
        const orig = new SubClass([1, 2, 3]);

        assertType(orig.withAt(0, 0));
        assertType(orig.withReversed());
        assertType(orig.withSorted());
        assertType(orig.withSpliced(0, 0));

        t.end();
    });
});
