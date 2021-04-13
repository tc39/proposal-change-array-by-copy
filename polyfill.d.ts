declare global {
    interface Array<T> {
        popped(): T[];
        pushed(...values: T[]): T[];
        reversed(): T[];
        shifted(): T[];
        sorted(compareFn?: (a: T, b: T) => number): T[];
        spliced(start: number, deleteCount?: number, ...values: T[]): T[];
        unshifted(...values: T[]): T[];
        with(index: number, value: T): T[];
    }

    interface Int8Array {
        popped(): this;
        pushed(...values: number[]): this;
        reversed(): this;
        shifted(): this;
        sorted(compareFn?: (a: number, b: number) => number): this;
        spliced(start: number, deleteCount?: number, ...values: number[]): this;
        unshifted(...values: number[]): this;
        with(index: number, value: number): this;
    }

    interface Uint8Array {
        popped(): this;
        pushed(...values: number[]): this;
        reversed(): this;
        shifted(): this;
        sorted(compareFn?: (a: number, b: number) => number): this;
        spliced(start: number, deleteCount?: number, ...values: number[]): this;
        unshifted(...values: number[]): this;
        with(index: number, value: number): this;
    }

    interface Uint8ClampedArray {
        popped(): this;
        pushed(...values: number[]): this;
        reversed(): this;
        shifted(): this;
        sorted(compareFn?: (a: number, b: number) => number): this;
        spliced(start: number, deleteCount?: number, ...values: number[]): this;
        unshifted(...values: number[]): this;
        with(index: number, value: number): this;
    }

    interface Int16Array {
        popped(): this;
        pushed(...values: number[]): this;
        reversed(): this;
        shifted(): this;
        sorted(compareFn?: (a: number, b: number) => number): this;
        spliced(start: number, deleteCount?: number, ...values: number[]): this;
        unshifted(...values: number[]): this;
        with(index: number, value: number): this;
    }

    interface Uint16Array {
        popped(): this;
        pushed(...values: number[]): this;
        reversed(): this;
        shifted(): this;
        sorted(compareFn?: (a: number, b: number) => number): this;
        spliced(start: number, deleteCount?: number, ...values: number[]): this;
        unshifted(...values: number[]): this;
        with(index: number, value: number): this;
    }

    interface Int32Array {
        popped(): this;
        pushed(...values: number[]): this;
        reversed(): this;
        shifted(): this;
        sorted(compareFn?: (a: number, b: number) => number): this;
        spliced(start: number, deleteCount?: number, ...values: number[]): this;
        unshifted(...values: number[]): this;
        with(index: number, value: number): this;
    }

    interface Uint32Array {
        popped(): this;
        pushed(...values: number[]): this;
        reversed(): this;
        shifted(): this;
        sorted(compareFn?: (a: number, b: number) => number): this;
        spliced(start: number, deleteCount?: number, ...values: number[]): this;
        unshifted(...values: number[]): this;
        with(index: number, value: number): this;
    }

    interface Float32Array {
        popped(): this;
        pushed(...values: number[]): this;
        reversed(): this;
        shifted(): this;
        sorted(compareFn?: (a: number, b: number) => number): this;
        spliced(start: number, deleteCount?: number, ...values: number[]): this;
        unshifted(...values: number[]): this;
        with(index: number, value: number): this;
    }

    interface Float64Array {
        popped(): this;
        pushed(...values: number[]): this;
        reversed(): this;
        shifted(): this;
        sorted(compareFn?: (a: number, b: number) => number): this;
        spliced(start: number, deleteCount?: number, ...values: number[]): this;
        unshifted(...values: number[]): this;
        with(index: number, value: number): this;
    }
}
export {};
