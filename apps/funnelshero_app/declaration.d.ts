declare module "*.scss" {
    const content: Record<string, string>;
    export default content;
}

declare module "*.mp4" {
    const src: string;
    export default src;
}

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        fontSize: {
            setFontSize: (size: string) => ReturnType;
        };
    }
}
