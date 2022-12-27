declare module "*.scss" {
    const content: Record<string, string>;
    export default content;
}
declare module "*.svg" {
    import React = require("react");
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}
declare module "*.mp4" {
    const src: string;
    export default src;
}

declare global {
    interface Array<T> {
        mergeElements(pattern: string): string;
    }
}
