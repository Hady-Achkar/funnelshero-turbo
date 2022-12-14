export * from "./request";
export interface IEdges {
    padding: string[];
    margin: string[];
}

export interface IHSV {
    h: number;
    s: number;
    v: number;
}

export interface IRGB {
    r: number;
    g: number;
    b: number;
}
export interface IHSVA extends IHSV {
    a: number;
}

export interface ITarget {
    target: {
        name: string;
        value: any;
    };
}

export interface IDimensions {
    width?: number;
    height?: number;
    rotate?: number;
}
export interface IVideoConvertType {
    blob: Blob;
    duration: number;
}

export interface IEdgesOnChange {
    padding: string;
    margin: string;
}
