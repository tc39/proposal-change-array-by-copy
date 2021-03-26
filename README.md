# Change Array by copy

Provides additional methods to `Array.prototype` to enable changes on an array by returning a new copy of it with the change.

## Status

This proposal is currently at [Stage 0].

- [Candidate spec text][spec]
- [Candidate polyfill][poly]

[Stage 0]: https://github.com/tc39/proposals/blob/master/stage-0-proposals.md
[spec]: http://www.rricard.me/proposal-change-array-by-copy/
[poly]: ./polyfill.js


## Champions

- Robin Ricard (@rricard)

## Overview

This proposal introduces the following function properties to `Array.prototype`:

- `Array.prototype.popped() -> Array`
- `Array.prototype.pushed(values...) -> Array`
- `Array.prototype.reversed() -> Array`
- `Array.prototype.shifted() -> Array`
- `Array.prototype.sorted(compareFn) -> Array`
- `Array.prototype.spliced(start, deleteCount, ...items) -> Array`
- `Array.prototype.unshifted(...values) -> Array`
- `Array.prototype.with(index, value) -> Array`

All of those methods keep the target Array untouched and returns a copy of it with the change performed instead.

### Example

```js
const sequence = [1, 2, 3];
sequence.reversed(); // => [3, 2, 1]
sequence; // => [1, 2, 3]

const outOfOrder = [3, 1, 2];
outOfOrder.sorted(); // => [1, 2, 3]
outOfOrder; // => [3, 1, 2]
```

## Motivation

The [`Tuple.prototype`][tuple-proto] introduces those functions as a way to deal with the immutable aspect of the Tuples in [Record & Tuple][r-t]. While Arrays are not immutable by nature, this style of programming can be beneficial to users dealing with frozen arrays for instance.

This proposal notably makes it easier to write code able to deal with Arrays and Tuples interchangeably.

## Relationship with [Record & Tuple][r-t]

While this proposal is derived from [Record & Tuple][r-t], it should progress indepenedently.

If web compatibility prescribes it, property names defined in this proposal are going to be changed. Those changes should be reflected on [`Tuple.prototype`][tuple-proto].

[tuple-proto]: https://tc39.es/proposal-record-tuple/#sec-properties-of-the-tuple-prototype-object
[r-t]: https://github.com/tc39/proposal-record-tuple
