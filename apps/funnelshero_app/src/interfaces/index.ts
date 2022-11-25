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
