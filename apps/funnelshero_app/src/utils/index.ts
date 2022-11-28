export * from "./colorConverter";
export * from "./craft";

export const mergeElements = (array: string[] | number[], pattern: string) => {
    let data: string = "";
    for (let i: number = 0; i < array.length; i++) {
        data += `${array[i]}${pattern} `;
    }
    return data;
};

export const getHEXColor = (color: string): string | undefined => {
    return color.match(/[a-f0-9]{6}/gi)?.shift();
};

export const HEXAlpha = (color: string, opacity: number): string => {
    const _opacity: number = Math.round(
        Math.min(Math.max(opacity || 1, 0), 1) * 255
    );
    return color + _opacity.toString(16).toUpperCase();
};
