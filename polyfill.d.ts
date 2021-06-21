declare global {
    interface Array<T> {
        withCopiedWithin(target: number, start?: number, end?: number): T[];
        withFilled(v: T, start?: number, end?: number): T[];
        withPopped(): T[];
        withPushed(...values: T[]): T[];
        withReversed(): T[];
        withShifted(): T[];
        withSorted(compareFn?: (a: T, b: T) => number): T[];
        withSpliced(start: number, deleteCount?: number, ...values: T[]): T[];
        withUnshifted(...values: T[]): T[];
        withAt(index: number, value: T): T[];
    }

    interface Int8Array {
        withCopiedWithin(target: number, start?: number, end?: number): this;
        withFilled(v: number, start?: number, end?: number): this;
        withPopped(): this;
        withPushed(...values: number[]): this;
        withReversed(): this;
        withShifted(): this;
        withSorted(compareFn?: (a: number, b: number) => number): this;
        withSpliced(start: number, deleteCount?: number, ...values: number[]): this;
        withUnshifted(...values: number[]): this;
        withAt(index: number, value: number): this;
    }

    interface Uint8Array {
        withCopiedWithin(target: number, start?: number, end?: number): this;
        withFilled(v: number, start?: number, end?: number): this;
        withPopped(): this;
        withPushed(...values: number[]): this;
        withReversed(): this;
        withShifted(): this;
        withSorted(compareFn?: (a: number, b: number) => number): this;
        withSpliced(start: number, deleteCount?: number, ...values: number[]): this;
        withUnshifted(...values: number[]): this;
        withAt(index: number, value: number): this;
    }

    interface Uint8ClampedArray {
        withCopiedWithin(target: number, start?: number, end?: number): this;
        withFilled(v: number, start?: number, end?: number): this;
        withPopped(): this;
        withPushed(...values: number[]): this;
        withReversed(): this;
        withShifted(): this;
        withSorted(compareFn?: (a: number, b: number) => number): this;
        withSpliced(start: number, deleteCount?: number, ...values: number[]): this;
        withUnshifted(...values: number[]): this;
        withAt(index: number, value: number): this;
    }

    interface Int16Array {
        withCopiedWithin(target: number, start?: number, end?: number): this;
        withFilled(v: number, start?: number, end?: number): this;
        withPopped(): this;
        withPushed(...values: number[]): this;
        withReversed(): this;
        withShifted(): this;
        withSorted(compareFn?: (a: number, b: number) => number): this;
        withSpliced(start: number, deleteCount?: number, ...values: number[]): this;
        withUnshifted(...values: number[]): this;
        withAt(index: number, value: number): this;
    }

    interface Uint16Array {
        withCopiedWithin(target: number, start?: number, end?: number): this;
        withFilled(v: number, start?: number, end?: number): this;
        withPopped(): this;
        withPushed(...values: number[]): this;
        withReversed(): this;
        withShifted(): this;
        withSorted(compareFn?: (a: number, b: number) => number): this;
        withSpliced(start: number, deleteCount?: number, ...values: number[]): this;
        withUnshifted(...values: number[]): this;
        withAt(index: number, value: number): this;
    }

    interface Int32Array {
        withCopiedWithin(target: number, start?: number, end?: number): this;
        withFilled(v: number, start?: number, end?: number): this;
        withPopped(): this;
        withPushed(...values: number[]): this;
        withReversed(): this;
        withShifted(): this;
        withSorted(compareFn?: (a: number, b: number) => number): this;
        withSpliced(start: number, deleteCount?: number, ...values: number[]): this;
        withUnshifted(...values: number[]): this;
        withAt(index: number, value: number): this;
    }

    interface Uint32Array {
        withCopiedWithin(target: number, start?: number, end?: number): this;
        withFilled(v: number, start?: number, end?: number): this;
        withPopped(): this;
        withPushed(...values: number[]): this;
        withReversed(): this;
        withShifted(): this;
        withSorted(compareFn?: (a: number, b: number) => number): this;
        withSpliced(start: number, deleteCount?: number, ...values: number[]): this;
        withUnshifted(...values: number[]): this;
        withAt(index: number, value: number): this;
    }

    interface Float32Array {
        withCopiedWithin(target: number, start?: number, end?: number): this;
        withFilled(v: number, start?: number, end?: number): this;
        withPopped(): this;
        withPushed(...values: number[]): this;
        withReversed(): this;
        withShifted(): this;
        withSorted(compareFn?: (a: number, b: number) => number): this;
        withSpliced(start: number, deleteCount?: number, ...values: number[]): this;
        withUnshifted(...values: number[]): this;
        withAt(index: number, value: number): this;
    }

    interface Float64Array {
        withCopiedWithin(target: number, start?: number, end?: number): this;
        withFilled(v: number, start?: number, end?: number): this;
        withPopped(): this;
        withPushed(...values: number[]): this;
        withReversed(): this;
        withShifted(): this;
        withSorted(compareFn?: (a: number, b: number) => number): this;
        withSpliced(start: number, deleteCount?: number, ...values: number[]): this;
        withUnshifted(...values: number[]): this;
        withAt(index: number, value: number): this;
    }
}
export {};
