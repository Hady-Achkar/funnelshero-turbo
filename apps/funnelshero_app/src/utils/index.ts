export * from "./craft";

export const mergeElements = (array: string[] | number[], pattern: string) => {
    let data: string = "";
    for (let i: number = 0; i < array.length; i++) {
        data += `${array[i]}${pattern} `;
    }
    return data;
};
