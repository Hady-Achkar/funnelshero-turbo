// components/user/Text.js
import { FC } from "react";
import { useNode, useEditor } from "@craftjs/core";
import * as Tiptap from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import s from "./text.module.scss";

export const Text: FC<IProps> = ({ text }) => {
    const editor = Tiptap.useEditor({
        extensions: [StarterKit],
        content: text,
        editorProps: {
            attributes: {
                class: s.editor,
            },
        },
    });

    const {
        connectors: { connect, drag },
        isClicked,
    } = useNode((node) => ({
        isClicked: node.events.selected,
    }));

    Text.craft = {
        rules: {
            canDrag: (node) => node.data.props.text != "Drag",
        },
    };

    return (
        <div
            className={[isClicked ? "selected" : ""].join(" ")}
            ref={(ref) => connect(drag(ref))}
        >
            <Tiptap.EditorContent editor={editor} />
        </div>
    );
};

interface IProps {
    text: string;
}
