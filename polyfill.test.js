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
