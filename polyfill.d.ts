declare global {
    interface Array<T> {
        with(index: number, value: T): T[];
        toReversed(): T[];
        toSorted(compareFn?: (a: T, b: T) => number): T[];
        toSpliced(start: number, deleteCount?: number, ...values: T[]): T[];
        [Symbol.unscopables]: {
            [N in keyof typeof Array.prototype as N extends "with" ? never : N]: true;
        };
    }

    interface ReadonlyArray<T> {
        with(index: number, value: T): T[];
        toReversed(): T[];
        toSorted(compareFn?: (a: T, b: T) => number): T[];
        toSpliced(start: number, deleteCount?: number, ...values: T[]): T[];
    }

    interface Int8Array {
        with(index: number, value: number): this;
        toReversed(): this;
        toSorted(compareFn?: (a: number, b: number) => number): this;
    }

    interface Uint8Array {
        with(index: number, value: number): this;
        toReversed(): this;
        toSorted(compareFn?: (a: number, b: number) => number): this;
    }

    interface Uint8ClampedArray {
        with(index: number, value: number): this;
        toReversed(): this;
        toSorted(compareFn?: (a: number, b: number) => number): this;
    }

    interface Int16Array {
        with(index: number, value: number): this;
        toReversed(): this;
        toSorted(compareFn?: (a: number, b: number) => number): this;
    }

    interface Uint16Array {
        with(index: number, value: number): this;
        toReversed(): this;
        toSorted(compareFn?: (a: number, b: number) => number): this;
    }

    interface Int32Array {
        with(index: number, value: number): this;
        toReversed(): this;
        toSorted(compareFn?: (a: number, b: number) => number): this;
    }

    interface Uint32Array {
        with(index: number, value: number): this;
        toReversed(): this;
        toSorted(compareFn?: (a: number, b: number) => number): this;
    }

    interface Float32Array {
        with(index: number, value: number): this;
        toReversed(): this;
        toSorted(compareFn?: (a: number, b: number) => number): this;
    }

    interface Float64Array {
        with(index: number, value: number): this;
        toReversed(): this;
        toSorted(compareFn?: (a: number, b: number) => number): this;
    }

    interface BigInt64Array {
        with(index: number, value: bigint): this;
        toReversed(): this;
        toSorted(compareFn?: (a: bigint, b: bigint) => number | bigint): this;
    }

    interface BigUint64Array {
        with(index: number, value: bigint): this;
        toReversed(): this;
        toSorted(compareFn?: (a: bigint, b: bigint) => number | bigint): this;
    }
}
export {};
