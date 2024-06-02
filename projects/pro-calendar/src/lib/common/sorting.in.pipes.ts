import { KeyValue } from "@angular/common";

// Preserve original property order
export const originalOrder = <T, U>(a: KeyValue<T, U>, b: KeyValue<T, U>): number => {
    return 0;
}

// Order by ascending property value
export const valueAscOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return a.value.localeCompare(b.value);
}

// Order by descending property key
export const keyDescOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
}