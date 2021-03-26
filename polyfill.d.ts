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
}
export {};
