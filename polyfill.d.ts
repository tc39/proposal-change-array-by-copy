declare global {
    interface Array<T> {
        copiedWithin(target: number, start?: number, end?: number): T[];
        filled(v: T, start?: number, end?: number): T[];
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
        copiedWithin(target: number, start?: number, end?: number): this;
        filled(v: number, start?: number, end?: number): this;
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
        copiedWithin(target: number, start?: number, end?: number): this;
        filled(v: number, start?: number, end?: number): this;
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
        copiedWithin(target: number, start?: number, end?: number): this;
        filled(v: number, start?: number, end?: number): this;
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
        copiedWithin(target: number, start?: number, end?: number): this;
        filled(v: number, start?: number, end?: number): this;
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
        copiedWithin(target: number, start?: number, end?: number): this;
        filled(v: number, start?: number, end?: number): this;
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
        copiedWithin(target: number, start?: number, end?: number): this;
        filled(v: number, start?: number, end?: number): this;
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
        copiedWithin(target: number, start?: number, end?: number): this;
        filled(v: number, start?: number, end?: number): this;
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
        copiedWithin(target: number, start?: number, end?: number): this;
        filled(v: number, start?: number, end?: number): this;
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
        copiedWithin(target: number, start?: number, end?: number): this;
        filled(v: number, start?: number, end?: number): this;
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
