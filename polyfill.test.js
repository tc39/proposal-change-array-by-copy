// @ts-check
require("./polyfill.js");
const tape = require("tape");

tape("Array.prototype.copiedWithin", (t) => {
    const orig = [1, 2, 3, 4, 5];
    const expected = [5, 2, 3, 4, 5];
    const targetIndex = 0;
    const sourceIndex = -1;

    const copy = orig.copiedWithin(targetIndex, sourceIndex);

    t.deepEqual(copy, expected);
    t.notEqual(orig, copy);
    t.notDeepEqual(orig, copy);
    t.end();
});

tape("Array.prototype.filled", (t) => {
    const orig = [1, 2, 3];
    const expected = [4, 4, 4];
    const fillValue = 4;

    const copy = orig.filled(fillValue);

    t.deepEqual(copy, expected);
    t.notEqual(orig, copy);
    t.notDeepEqual(orig, copy);
    t.end();
});

tape("Array.prototype.popped", (t) => {
    const orig = [1, 2, 3];
    const expected = [1, 2];

    const copy = orig.popped();

    t.deepEqual(copy, expected);
    t.notEqual(orig, copy);
    t.notDeepEqual(orig, copy);
    t.end();
});

tape("Array.prototype.pushed", (t) => {
    const orig = [1, 2, 3];
    const push = [4, 5, 6];
    const expected = [1, 2, 3, 4, 5, 6];

    const copy = orig.pushed(...push);

    t.deepEqual(copy, expected);
    t.notEqual(orig, copy);
    t.notDeepEqual(orig, copy);
    t.end();
});

tape("Array.prototype.reversed", (t) => {
    const orig = [3, 2, 1];
    const expected = [1, 2, 3];

    const copy = orig.reversed();

    t.deepEqual(copy, expected);
    t.notEqual(orig, copy);
    t.notDeepEqual(orig, copy);
    t.end();
});

tape("Array.prototype.shifted", (t) => {
    const orig = [1, 2, 3];
    const expected = [2, 3];

    const copy = orig.shifted();

    t.deepEqual(copy, expected);
    t.notEqual(orig, copy);
    t.notDeepEqual(orig, copy);
    t.end();
});

tape("Array.prototype.sorted", (t) => {
    const orig = [3, 1, 2];
    const expected = [1, 2, 3];

    const copy = orig.sorted();

    t.deepEqual(copy, expected);
    t.notEqual(orig, copy);
    t.notDeepEqual(orig, copy);
    t.end();
});

tape("Array.prototype.sorted(compareFn)", (t) => {
    const orig = [3, 1, 2];
    const expected = [3, 2, 1];
    function compareFn(a, b) {
        return a > b ? -1 : 1;
    }

    const copy = orig.sorted(compareFn);

    t.deepEqual(copy, expected);
    t.notEqual(orig, copy);
    t.notDeepEqual(orig, copy);
    t.end();
});

tape("Array.prototype.spliced", (t) => {
    const orig = [1, -1, 0, -1, 4];
    const expected = [1, 2, 3, 4];
    const idx = 1;
    const delNum = 3;
    const ins = [2, 3];

    const copy = orig.spliced(idx, delNum, ...ins);

    t.deepEqual(copy, expected);
    t.notEqual(orig, copy);
    t.notDeepEqual(orig, copy);
    t.end();
});

tape("Array.prototype.unshifted", (t) => {
    const orig = [4, 5, 6];
    const unshift = [1, 2, 3];
    const expected = [1, 2, 3, 4, 5, 6];

    const copy = orig.unshifted(...unshift);

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
    tape(`${TypedArray.name}.prototype.copiedWithin`, (t) => {
        const orig = new TypedArray([1, 2, 3, 4, 5]);
        const expected = new TypedArray([5, 2, 3, 4, 5]);
        const targetIndex = 0;
        const sourceIndex = -1;

        const copy = orig.copiedWithin(targetIndex, sourceIndex);

        t.deepEqual(copy, expected);
        t.notEqual(orig, copy);
        t.notDeepEqual(orig, copy);
        t.end();
    });

    tape(`${TypedArray.name}.prototype.filled`, (t) => {
        const orig = new TypedArray([1, 2, 3]);
        const expected = new TypedArray([4, 4, 4]);
        const fillValue = 4;

        const copy = orig.filled(fillValue);

        t.deepEqual(copy, expected);
        t.notEqual(orig, copy);
        t.notDeepEqual(orig, copy);
        t.end();
    });

    tape(`${TypedArray.name}.prototype.popped`, (t) => {
        const orig = new TypedArray([1, 2, 3]);
        const expected = new TypedArray([1, 2]);

        const copy = orig.popped();

        t.deepEqual(copy, expected);
        t.notEqual(orig, copy);
        t.notDeepEqual(orig, copy);
        t.end();
    });

    tape(`${TypedArray.name}.prototype.pushed`, (t) => {
        const orig = new TypedArray([1, 2, 3]);
        const push = [4, 5, 6];
        const expected = new TypedArray([1, 2, 3, 4, 5, 6]);

        const copy = orig.pushed(...push);

        t.deepEqual(copy, expected);
        t.notEqual(orig, copy);
        t.notDeepEqual(orig, copy);
        t.end();
    });

    tape(`${TypedArray.name}.prototype.reversed`, (t) => {
        const orig = new TypedArray([3, 2, 1]);
        const expected = new TypedArray([1, 2, 3]);

        const copy = orig.reversed();

        t.deepEqual(copy, expected);
        t.notEqual(orig, copy);
        t.notDeepEqual(orig, copy);
        t.end();
    });

    tape(`${TypedArray.name}.prototype.shifted`, (t) => {
        const orig = new TypedArray([1, 2, 3]);
        const expected = new TypedArray([2, 3]);

        const copy = orig.shifted();

        t.deepEqual(copy, expected);
        t.notEqual(orig, copy);
        t.notDeepEqual(orig, copy);
        t.end();
    });

    tape(`${TypedArray.name}.prototype.sorted`, (t) => {
        const orig = new TypedArray([3, 1, 2]);
        const expected = new TypedArray([1, 2, 3]);

        const copy = orig.sorted();

        t.deepEqual(copy, expected);
        t.notEqual(orig, copy);
        t.notDeepEqual(orig, copy);
        t.end();
    });

    tape(`${TypedArray.name}.prototype.sorted(compareFn)`, (t) => {
        const orig = new TypedArray([3, 1, 2]);
        const expected = new TypedArray([3, 2, 1]);
        function compareFn(a, b) {
            return a > b ? -1 : 1;
        }

        const copy = orig.sorted(compareFn);

        t.deepEqual(copy, expected);
        t.notEqual(orig, copy);
        t.notDeepEqual(orig, copy);
        t.end();
    });

    tape(`${TypedArray.name}.prototype.spliced`, (t) => {
        const orig = new TypedArray([1, -1, 0, -1, 4]);
        const expected = new TypedArray([1, 2, 3, 4]);
        const idx = 1;
        const delNum = 3;
        const ins = [2, 3];

        const copy = orig.spliced(idx, delNum, ...ins);

        t.deepEqual(copy, expected);
        t.notEqual(orig, copy);
        t.notDeepEqual(orig, copy);
        t.end();
    });

    tape(`${TypedArray.name}.prototype.unshifted`, (t) => {
        const orig = new TypedArray([4, 5, 6]);
        const unshift = [1, 2, 3];
        const expected = new TypedArray([1, 2, 3, 4, 5, 6]);

        const copy = orig.unshifted(...unshift);

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
});
