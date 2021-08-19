// @ts-check
require("./polyfill.js");
const tape = require("tape");

tape("Array.prototype.withCopiedWithin", (t) => {
    const orig = [1, 2, 3, 4, 5];
    const expected = [5, 2, 3, 4, 5];
    const targetIndex = 0;
    const sourceIndex = -1;

    const copy = orig.withCopiedWithin(targetIndex, sourceIndex);

    t.deepEqual(copy, expected);
    t.notEqual(orig, copy);
    t.notDeepEqual(orig, copy);
    t.end();
});

tape("Array.prototype.withFilled", (t) => {
    const orig = [1, 2, 3];
    const expected = [4, 4, 4];
    const fillValue = 4;

    const copy = orig.withFilled(fillValue);

    t.deepEqual(copy, expected);
    t.notEqual(orig, copy);
    t.notDeepEqual(orig, copy);
    t.end();
});

tape("Array.prototype.withPopped", (t) => {
    const orig = [1, 2, 3];
    const expected = [1, 2];

    const copy = orig.withPopped();

    t.deepEqual(copy, expected);
    t.notEqual(orig, copy);
    t.notDeepEqual(orig, copy);
    t.end();
});

tape("Array.prototype.withPopped works with array-like values", (t) => {
    const orig = {
        0: 1,
        1: 2,
        2: 3,
        length: 3
    };
    const expected = [1, 2];

    const copy = Array.prototype.withPopped.call(orig);

    t.deepEqual(copy, expected);
    t.notEqual(orig, copy);
    t.notDeepEqual(orig, copy);
    t.end();
});

tape("Array.prototype.withPopped reads minimum number of properties from callee", (t) => {
    let readExcessProperties = false;
    const orig = {
        0: 1,
        1: 2,
        get "2"() {
            readExcessProperties = true;
            return 3;
        },
        length: 3
    };
    const expected = [1, 2];

    const copy = Array.prototype.withPopped.call(orig);

    t.deepEqual(copy, expected);
    t.assert(!readExcessProperties);
    t.end();
});

tape("Array.prototype.withPushed", (t) => {
    const orig = [1, 2, 3];
    const push = [4, 5, 6];
    const expected = [1, 2, 3, 4, 5, 6];

    const copy = orig.withPushed(...push);

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

tape("Array.prototype.withShifted", (t) => {
    const orig = [1, 2, 3];
    const expected = [2, 3];

    const copy = orig.withShifted();

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

tape("Array.prototype.withUnshifted", (t) => {
    const orig = [4, 5, 6];
    const unshift = [1, 2, 3];
    const expected = [1, 2, 3, 4, 5, 6];

    const copy = orig.withUnshifted(...unshift);

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
    assertType(orig.withAt(0, 0));
    assertType(orig.withCopiedWithin(0, 0, 0));
    assertType(orig.withFilled(0));
    assertType(orig.withPopped());
    assertType(orig.withPushed(0));
    assertType(orig.withReversed());
    assertType(orig.withShifted());
    assertType(orig.withSorted());
    assertType(orig.withSpliced(0, 0));
    assertType(orig.withUnshifted(0));

    t.end();
});

tape("Array.prototype[Symbol.unscopables]", (t) => {
    const marker = Symbol();
    const copiedWithin = marker;
    const filled = marker;
    const popped = marker;
    const pushed = marker;
    const reversed = marker;
    const shifted = marker;
    const sorted = marker;
    const spliced = marker;
    const unshifted = marker;

    // @ts-expect-error: 'with' is unsupported
    with ([]) {
        t.equal(copiedWithin, marker);
        t.equal(filled, marker);
        t.equal(popped, marker);
        t.equal(pushed, marker);
        t.equal(reversed, marker);
        t.equal(shifted, marker);
        t.equal(sorted, marker);
        t.equal(spliced, marker);
        t.equal(unshifted, marker);
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
    tape(`${TypedArray.name}.prototype.withCopiedWithin`, (t) => {
        const orig = new TypedArray([1, 2, 3, 4, 5]);
        const expected = new TypedArray([5, 2, 3, 4, 5]);
        const targetIndex = 0;
        const sourceIndex = -1;

        const copy = orig.withCopiedWithin(targetIndex, sourceIndex);

        t.deepEqual(copy, expected);
        t.notEqual(orig, copy);
        t.notDeepEqual(orig, copy);
        t.end();
    });

    tape(`${TypedArray.name}.prototype.withFilled`, (t) => {
        const orig = new TypedArray([1, 2, 3]);
        const expected = new TypedArray([4, 4, 4]);
        const fillValue = 4;

        const copy = orig.withFilled(fillValue);

        t.deepEqual(copy, expected);
        t.notEqual(orig, copy);
        t.notDeepEqual(orig, copy);
        t.end();
    });

    tape(`${TypedArray.name}.prototype.withPopped`, (t) => {
        const orig = new TypedArray([1, 2, 3]);
        const expected = new TypedArray([1, 2]);

        const copy = orig.withPopped();

        t.deepEqual(copy, expected);
        t.notEqual(orig, copy);
        t.notDeepEqual(orig, copy);
        t.end();
    });

    tape(`${TypedArray.name}.prototype.withPushed`, (t) => {
        const orig = new TypedArray([1, 2, 3]);
        const push = [4, 5, 6];
        const expected = new TypedArray([1, 2, 3, 4, 5, 6]);

        const copy = orig.withPushed(...push);

        t.deepEqual(copy, expected);
        t.notEqual(orig, copy);
        t.notDeepEqual(orig, copy);
        t.end();
    });

    tape(`${TypedArray.name}.prototype.withReversed`, (t) => {
        const orig = new TypedArray([3, 2, 1]);
        const expected = new TypedArray([1, 2, 3]);

        const copy = orig.withReversed();

        t.deepEqual(copy, expected);
        t.notEqual(orig, copy);
        t.notDeepEqual(orig, copy);
        t.end();
    });

    tape(`${TypedArray.name}.prototype.withShifted`, (t) => {
        const orig = new TypedArray([1, 2, 3]);
        const expected = new TypedArray([2, 3]);

        const copy = orig.withShifted();

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

    tape(`${TypedArray.name}.prototype.withUnshifted`, (t) => {
        const orig = new TypedArray([4, 5, 6]);
        const unshift = [1, 2, 3];
        const expected = new TypedArray([1, 2, 3, 4, 5, 6]);

        const copy = orig.withUnshifted(...unshift);

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
        assertType(orig.withCopiedWithin(0, 0, 0));
        assertType(orig.withFilled(0));
        assertType(orig.withPopped());
        assertType(orig.withPushed(0));
        assertType(orig.withReversed());
        assertType(orig.withShifted());
        assertType(orig.withSorted());
        assertType(orig.withSpliced(0, 0));
        assertType(orig.withUnshifted(0));

        t.end();
    });
});
