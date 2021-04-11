// @ts-check
require("./polyfill.js");
const tape = require("tape");

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

tape("TypedArray.prototype.popped", (t) => {
    const orig = new Int8Array([1, 2, 3]);
    const expected = new Int8Array([1, 2]);

    const copy = orig.popped();

    t.deepEqual(copy, expected);
    t.notEqual(orig, copy);
    t.notDeepEqual(orig, copy);
    t.end();
});

tape("TypedArray.prototype.pushed", (t) => {
    const orig = new Int8Array([1, 2, 3]);
    const push = [4, 5, 6];
    const expected = new Int8Array([1, 2, 3, 4, 5, 6]);

    const copy = orig.pushed(...push);

    t.deepEqual(copy, expected);
    t.notEqual(orig, copy);
    t.notDeepEqual(orig, copy);
    t.end();
});

tape("TypedArray.prototype.reversed", (t) => {
    const orig = new Int8Array([3, 2, 1]);
    const expected = new Int8Array([1, 2, 3]);

    const copy = orig.reversed();

    t.deepEqual(copy, expected);
    t.notEqual(orig, copy);
    t.notDeepEqual(orig, copy);
    t.end();
});

tape("TypedArray.prototype.shifted", (t) => {
    const orig = new Int8Array([1, 2, 3]);
    const expected = new Int8Array([2, 3]);

    const copy = orig.shifted();

    t.deepEqual(copy, expected);
    t.notEqual(orig, copy);
    t.notDeepEqual(orig, copy);
    t.end();
});

tape("TypedArray.prototype.sorted", (t) => {
    const orig = new Int8Array([3, 1, 2]);
    const expected = new Int8Array([1, 2, 3]);

    const copy = orig.sorted();

    t.deepEqual(copy, expected);
    t.notEqual(orig, copy);
    t.notDeepEqual(orig, copy);
    t.end();
});

tape("TypedArray.prototype.sorted(compareFn)", (t) => {
    const orig = new Int8Array([3, 1, 2]);
    const expected = new Int8Array([3, 2, 1]);
    function compareFn(a, b) {
        return a > b ? -1 : 1;
    }

    const copy = orig.sorted(compareFn);

    t.deepEqual(copy, expected);
    t.notEqual(orig, copy);
    t.notDeepEqual(orig, copy);
    t.end();
});

tape("TypedArray.prototype.spliced", (t) => {
    const orig = new Int8Array([1, -1, 0, -1, 4]);
    const expected = new Int8Array([1, 2, 3, 4]);
    const idx = 1;
    const delNum = 3;
    const ins = [2, 3];

    const copy = orig.spliced(idx, delNum, ...ins);

    t.deepEqual(copy, expected);
    t.notEqual(orig, copy);
    t.notDeepEqual(orig, copy);
    t.end();
});

tape("TypedArray.prototype.unshifted", (t) => {
    const orig = new Int8Array([4, 5, 6]);
    const unshift = [1, 2, 3];
    const expected = new Int8Array([1, 2, 3, 4, 5, 6]);

    const copy = orig.unshifted(...unshift);

    t.deepEqual(copy, expected);
    t.notEqual(orig, copy);
    t.notDeepEqual(orig, copy);
    t.end();
});

tape("TypedArray.prototype.with", (t) => {
    const orig = new Int8Array([1, 1, 3]);
    const expected = new Int8Array([1, 2, 3]);
    const idx = 1;
    const val = 2;

    const copy = orig.with(idx, val);

    t.deepEqual(copy, expected);
    t.notEqual(orig, copy);
    t.notDeepEqual(orig, copy);
    t.end();
});
