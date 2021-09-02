declare global {
    interface Array<T> {
        withAt(index: number, value: T): T[];
        withReversed(): T[];
        withSorted(compareFn?: (a: T, b: T) => number): T[];
        withSpliced(start: number, deleteCount?: number, ...values: T[]): T[];
    }

    interface Int8Array {
        withAt(index: number, value: number): this;
        withReversed(): this;
        withSorted(compareFn?: (a: number, b: number) => number): this;
        withSpliced(start: number, deleteCount?: number, ...values: number[]): this;
    }

    interface Uint8Array {
        withAt(index: number, value: number): this;
        withReversed(): this;
        withSorted(compareFn?: (a: number, b: number) => number): this;
        withSpliced(start: number, deleteCount?: number, ...values: number[]): this;
    }

    interface Uint8ClampedArray {
        withAt(index: number, value: number): this;
        withReversed(): this;
        withSorted(compareFn?: (a: number, b: number) => number): this;
        withSpliced(start: number, deleteCount?: number, ...values: number[]): this;
    }

    interface Int16Array {
        withAt(index: number, value: number): this;
        withReversed(): this;
        withSorted(compareFn?: (a: number, b: number) => number): this;
        withSpliced(start: number, deleteCount?: number, ...values: number[]): this;
    }

    interface Uint16Array {
        withAt(index: number, value: number): this;
        withReversed(): this;
        withSorted(compareFn?: (a: number, b: number) => number): this;
        withSpliced(start: number, deleteCount?: number, ...values: number[]): this;
    }

    interface Int32Array {
        withAt(index: number, value: number): this;
        withReversed(): this;
        withSorted(compareFn?: (a: number, b: number) => number): this;
        withSpliced(start: number, deleteCount?: number, ...values: number[]): this;
    }

    interface Uint32Array {
        withAt(index: number, value: number): this;
        withReversed(): this;
        withSorted(compareFn?: (a: number, b: number) => number): this;
        withSpliced(start: number, deleteCount?: number, ...values: number[]): this;
    }

    interface Float32Array {
        withAt(index: number, value: number): this;
        withReversed(): this;
        withSorted(compareFn?: (a: number, b: number) => number): this;
        withSpliced(start: number, deleteCount?: number, ...values: number[]): this;
    }

    interface Float64Array {
        withAt(index: number, value: number): this;
        withReversed(): this;
        withSorted(compareFn?: (a: number, b: number) => number): this;
        withSpliced(start: number, deleteCount?: number, ...values: number[]): this;
    }
}
export {};
