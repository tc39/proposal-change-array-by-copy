# Change Array by copy

Provides additional methods to `Array.prototype` to enable changes on an array by returning a new copy of it with the change.

## Status

This proposal is currently at [Stage 1].

- [Candidate spec text][spec]
- [Candidate polyfill][poly]

[Stage 1]: https://github.com/tc39/proposals/blob/master/stage-1-proposals.md
[spec]: https://tc39.es/proposal-change-array-by-copy/
[poly]: ./polyfill.js


## Champions

- Robin Ricard (Bloomberg)
- Ashley Claymore (Bloomberg)

## Overview

This proposal introduces the following function properties to `Array.prototype`:

- `Array.prototype.filled(value, start, end) -> Array`
- `Array.prototype.copiedWithin(copiedTarget, start, end) -> Array`
- `Array.prototype.popped() -> Array`
- `Array.prototype.pushed(values...) -> Array`
- `Array.prototype.reversed() -> Array`
- `Array.prototype.shifted() -> Array`
- `Array.prototype.sorted(compareFn) -> Array`
- `Array.prototype.spliced(start, deleteCount, ...items) -> Array`
- `Array.prototype.unshifted(...values) -> Array`
- `Array.prototype.with(index, value) -> Array`

All of those methods keep the target Array untouched and returns a copy of it with the change performed instead.

They will also be added to TypedArrays:

- `TypedArray.prototype.filled(value, start, end) -> TypedArray`
- `TypedArray.prototype.copiedWithin(copiedTarget, start, end) -> TypedArray`
- `TypedArray.prototype.popped() -> TypedArray`
- `TypedArray.prototype.pushed(values...) -> TypedArray`
- `TypedArray.prototype.reversed() -> TypedArray`
- `TypedArray.prototype.shifted() -> TypedArray`
- `TypedArray.prototype.sorted(compareFn) -> TypedArray`
- `TypedArray.prototype.spliced(start, deleteCount, ...items) -> TypedArray`
- `TypedArray.prototype.unshifted(...values) -> TypedArray`
- `TypedArray.prototype.with(index, value) -> TypedArray`

For all the above methods, replace `TypedArray` with one of the following accordingly:

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
sequence.reversed(); // => [3, 2, 1]
sequence; // => [1, 2, 3]

const outOfOrder = new Uint8Array([3, 1, 2]);
outOfOrder.sorted(); // => Uint8Array [1, 2, 3]
outOfOrder; // => Uint8Array [3, 1, 2]

const correctionNeeded = [1, 1, 3];
correctionNeeded.with(1, 2); // => [1, 2, 3]
correctionNeeded; // => [1, 1, 3]
```

## Motivation

The [`Tuple.prototype`][tuple-proto] introduces those functions as a way to deal with the immutable aspect of the Tuples in [Record & Tuple][r-t]. While Arrays are not immutable by nature, this style of programming can be beneficial to users dealing with frozen arrays for instance.

This proposal notably makes it easier to write code able to deal with Arrays and Tuples interchangeably.

## Relationship with [Record & Tuple][r-t]

While this proposal is derived from [Record & Tuple][r-t], it should progress independently.

If web compatibility prescribes it, property names defined in this proposal are going to be changed. Those changes should be reflected on [`Tuple.prototype`][tuple-proto].

[tuple-proto]: https://tc39.es/proposal-record-tuple/#sec-properties-of-the-tuple-prototype-object
[r-t]: https://github.com/tc39/proposal-record-tuple
