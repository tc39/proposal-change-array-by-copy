> **Note**
> This proposal is ['finished'](https://github.com/tc39/proposals/blob/main/finished-proposals.md) and has been merged into the ECMAScript spec. [PR](https://github.com/tc39/ecma262/pull/2997)

# Change Array by copy

Provides additional methods on `Array.prototype` and `TypedArray.prototype` to enable changes on the array by returning a new copy of it with the change.

## Status

This proposal is currently at [Stage 4].

- [Candidate spec text][spec]

[Stage 4]: https://github.com/tc39/proposals/commit/ad4df8435f27f39eda26db3b940ae151980c8015#diff-af1d66eb7dbbf6f66e871d26bcad07076a557256a957f558ca21e60924e2b0b7
[spec]: https://github.com/tc39/ecma262/pull/2997/files

## Champions

- Robin Ricard (Bloomberg)
- Ashley Claymore (Bloomberg)

## Reviewers

- [Jordan Harband](https://github.com/ljharb)
- [Justin Ridgewell](https://github.com/jridgewell)
- [Sergey Rubanov](https://github.com/chicoxyzzy)

## Overview

This proposal introduces the following function properties to `Array.prototype`:

- `Array.prototype.toReversed() -> Array`
- `Array.prototype.toSorted(compareFn) -> Array`
- `Array.prototype.toSpliced(start, deleteCount, ...items) -> Array`
- `Array.prototype.with(index, value) -> Array`

All of those methods keep the target Array untouched and returns a copy of it with the change performed instead.

`toReversed`, `toSorted`, and `with` will also be added to TypedArrays:

- `TypedArray.prototype.toReversed() -> TypedArray`
- `TypedArray.prototype.toSorted(compareFn) -> TypedArray`
- `TypedArray.prototype.with(index, value) -> TypedArray`

These methods will then be available on subclasses of `TypedArray`. i.e. the following:

- `Int8Array`
- `Uint8Array`
- `Uint8ClampedArray`
- `Int16Array`
- `Uint16Array`
- `Int32Array`
- `Uint32Array`
- `Float32Array`
- `Float64Array`
- `BigInt64Array`
- `BigUint64Array`

### Example

```js
const sequence = [1, 2, 3];
sequence.toReversed(); // => [3, 2, 1]
sequence; // => [1, 2, 3]

const outOfOrder = new Uint8Array([3, 1, 2]);
outOfOrder.toSorted(); // => Uint8Array [1, 2, 3]
outOfOrder; // => Uint8Array [3, 1, 2]

const correctionNeeded = [1, 1, 3];
correctionNeeded.with(1, 2); // => [1, 2, 3]
correctionNeeded; // => [1, 1, 3]
```

## Motivation

The [`Tuple.prototype`][tuple-proto] introduces these functions as a way to deal with the immutable aspect of the Tuples in [Record & Tuple][r-t]. While Arrays are not immutable by nature, this style of programming can be beneficial to users dealing with frozen arrays for instance.

This proposal notably makes it easier to write code able to deal with Arrays and Tuples interchangeably.

## Relationship with [Record & Tuple][r-t]

While this proposal is derived from [Record & Tuple][r-t], it should progress independently.

If web compatibility prescribes it, property names defined in this proposal are going to be changed. Those changes should be reflected on [`Tuple.prototype`][tuple-proto].

[tuple-proto]: https://tc39.es/proposal-record-tuple/#sec-properties-of-the-tuple-prototype-object
[r-t]: https://github.com/tc39/proposal-record-tuple

## Implementations

 - [Firefox/SpiderMonkey](https://bugzilla.mozilla.org/show_bug.cgi?id=1729563), shipping unflagged since [Firefox 115](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/115)
 - [Safari/JavaScriptCore](https://bugs.webkit.org/show_bug.cgi?id=234604), shipping unflagged since [Safari Tech Preview 146](https://developer.apple.com/safari/technology-preview/release-notes/#:~:text=bug%20tracker.-,Release%20146,-Note%3A%20Tab)
 - [Chrome/V8](https://bugs.chromium.org/p/v8/issues/detail?id=12764), shipping unflagged since Chrome 110

 - [Ladybird/LibJS](https://github.com/SerenityOS/serenity/issues/16353), shipping unflagged

 - [core-js](https://github.com/zloirock/core-js)
   - [change-array-by-copy](https://github.com/zloirock/core-js#change-array-by-copy)

 - [es-shims](https://github.com/es-shims):
   - [`array.prototype.tosorted`](https://www.npmjs.com/package/array.prototype.tosorted)
   - [`array.prototype.toreversed`](https://www.npmjs.com/package/array.prototype.toreversed)
   - [`array.prototype.tospliced`](https://www.npmjs.com/package/array.prototype.tospliced)
   - [`array.prototype.with`](https://www.npmjs.com/package/array.prototype.with)

- [./polyfill.js](./polyfill.js) (minimalist reference implementation)
