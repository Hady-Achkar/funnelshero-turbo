export {};
interface Array<T> {
    mergeElements(pattern: string): string;
}

Array.prototype.mergeElements = function (pattern: string) {
    const data = "";
    for (let i: number = 0; i < this.length; i++) {
        data + `${this[i]}${pattern}`;
    }
    return data;
};

declare global {
    interface Array<T> {
        mergeElements(pattern: string): string;
    }
}
