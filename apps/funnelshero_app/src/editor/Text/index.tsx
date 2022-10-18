import { FC } from "react";
import { useNode } from "@craftjs/core";
import * as Tiptap from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import s from "./text.module.scss";
import { Button, Icon } from "ui";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import TiptapText from "@tiptap/extension-text";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";

export const Text: FC<IProps> = ({ text }) => {
    const editor = Tiptap.useEditor({
        extensions: [
            StarterKit,
            Document,
            Paragraph,
            TiptapText,
            Heading,
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Link,
            Underline,
        ],
        content: text,
    });

    const {
        connectors: { connect, drag },
        isSelected,
        // isDragged,
        // isHovered,
    } = useNode((node) => ({
        isSelected: node.events.selected,
        isDragged: node.events.dragged,
        isHovered: node.events.hovered,
    }));

    Text.craft = {
        rules: {
            canDrag: (node) => node.data.props.text != "Drag",
        },
    };
    if (!editor) {
        return null;
    }
    return (
        <div
            className={[s.container, isSelected ? "selected" : ""].join(" ")}
            ref={(ref) => connect(drag(ref))}
        >
            {isSelected ? <TextMenu editor={editor} /> : null}
            <Tiptap.EditorContent editor={editor} />
        </div>
    );
};

const TextMenu: FC<IMenuProps> = ({ editor }) => {
    return (
        <div className={s.menu}>
            <Button
                onClick={() =>
                    editor.chain().focus().setTextAlign("center").run()
                }
                className={[
                    s.tool_btn,
                    editor.isActive({ textAlign: "center" }) ? s.is_active : "",
                ].join(" ")}
                label={<Icon type={"AlignCenter"} size={18} strokeWidth={2} />}
            />
            <Button
                onClick={() =>
                    editor.chain().focus().setTextAlign("justify").run()
                }
                className={[
                    s.tool_btn,
                    editor.isActive({ textAlign: "justify" })
                        ? s.is_active
                        : "",
                ].join(" ")}
                label={<Icon type={"AlignJustify"} size={18} strokeWidth={2} />}
            />
            <Button
                onClick={() =>
                    editor.chain().focus().setTextAlign("left").run()
                }
                className={[
                    s.tool_btn,
                    editor.isActive({ textAlign: "left" }) ? s.is_active : "",
                ].join(" ")}
                label={<Icon type={"AlignLeft"} size={18} strokeWidth={2} />}
            />
            <Button
                onClick={() =>
                    editor.chain().focus().setTextAlign("right").run()
                }
                className={[
                    s.tool_btn,
                    editor.isActive({ textAlign: "right" }) ? s.is_active : "",
                ].join(" ")}
                label={<Icon type={"AlignRight"} size={18} strokeWidth={2} />}
            />
            <Button
                onClick={() => editor.commands.deleteSelection()}
                className={s.tool_btn}
                label={<Icon type={"Trash"} size={18} strokeWidth={2} />}
            />
            <Button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                className={[
                    s.tool_btn,
                    editor.isActive("strike") ? s.is_active : "",
                ].join(" ")}
                label={<Icon type={"LineThrough"} size={18} strokeWidth={2} />}
            />
            <Button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={[
                    s.tool_btn,
                    editor.isActive("italic") ? s.is_active : "",
                ].join(" ")}
                label={<Icon type={"Italic"} size={18} strokeWidth={2} />}
            />
            <Button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={[
                    s.tool_btn,
                    editor.isActive("bold") ? s.is_active : "",
                ].join(" ")}
                label={<Icon type={"Bold"} size={18} strokeWidth={2} />}
            />
            <Button
                onClick={() => {
                    if (editor.isActive("underline")) {
                        editor.chain().focus().unsetUnderline().run();
                    } else {
                        editor.chain().focus().setUnderline().run();
                    }
                }}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={[
                    s.tool_btn,
                    editor.isActive("underline") ? s.is_active : "",
                ].join(" ")}
                label={<Icon type={"Underline"} size={18} strokeWidth={2} />}
            />
            <span>Text style</span>
            <span>
                <Button
                    onClick={() =>
                        editor.commands.toggleLink({
                            href: "https://example.com",
                            target: "_blank",
                        })
                    }
                    className={[
                        s.tool_btn,
                        editor.isActive("bold") ? s.is_active : "",
                    ].join(" ")}
                    label={<Icon type={"Link"} size={18} strokeWidth={2} />}
                />
                Create link
            </span>
        </div>
    );
};

interface IMenuProps {
    editor: any;
}

interface IProps {
    text: string;
}
