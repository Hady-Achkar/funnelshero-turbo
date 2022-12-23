import React, { FC } from "react";
import { useNode, Node } from "@craftjs/core";
import * as Tiptap from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import s from "./eText.module.scss";
import { Button, Icon, Select } from "ui";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import TiptapText from "@tiptap/extension-text";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { ElementTitle } from "components";
import TextStyle from "@tiptap/extension-text-style";
import { stringify } from "querystring";

export const EText = ({ text }:IProps) => {
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
            TextStyleExtended,
            TextStyle,
        ],
        content: text,
    });

    const {
        connectors: { connect, drag },
        isSelected,
    } = useNode((node: Node) => {
        return {
            isSelected: node.events.selected,
            isDragged: node.events.dragged,
            isHovered: node.events.hovered,
        };
    });

    if (!editor) return null;

    return (
        <div
            className={[s.container, isSelected ? "selected" : ""].join(" ")}
            ref={(ref: HTMLDivElement) => connect(drag(ref))}
        >
            {isSelected ? (
                <ElementTitle>
                    <TextSettings editor={editor} />
                </ElementTitle>
            ) : null}
            <Tiptap.EditorContent editor={editor} />
        </div>
    );
};

const TextSettings: FC<IMenuProps> = ({ editor }) => {
    const generateFontSize = (): number[] => {
        const data: number[] = [];
        for (let i: number = 6; i <= 76; i++) {
            data.push(i);
        }
        return data;
    };

    return (
        <div className={s.settings}>
            <Select
                name="fontSize"
                onChange={(e) => editor.commands.setFontSize(e.target.value)}
                labelClassName={s.font_size_select}
            >
                {generateFontSize().map((item: number) => {
                    return (
                        <div id={item.toString()} key={item.toString()}>
                            {item}
                        </div>
                    );
                })}
            </Select>
            <Button
                onClick={() =>
                    editor?.chain().focus().setTextAlign("justify").run()
                }
                className={[
                    s.tool_btn,
                    editor?.isActive({ textAlign: "justify" })
                        ? s.is_active
                        : "",
                ].join(" ")}
                label={<Icon type={"AlignJustify"} size={18} strokeWidth={2} />}
            />
            <Button
                onClick={() =>
                    editor?.chain().focus().setTextAlign("left").run()
                }
                className={[
                    s.tool_btn,
                    editor?.isActive({ textAlign: "left" }) ? s.is_active : "",
                ].join(" ")}
                label={<Icon type={"AlignLeft"} size={18} strokeWidth={2} />}
            />
            <Button
                onClick={() =>
                    editor?.chain().focus().setTextAlign("center").run()
                }
                className={[
                    s.tool_btn,
                    editor?.isActive({ textAlign: "center" })
                        ? s.is_active
                        : "",
                ].join(" ")}
                label={<Icon type={"AlignCenter"} size={18} strokeWidth={2} />}
            />
            <Button
                onClick={() =>
                    editor?.chain().focus().setTextAlign("right").run()
                }
                className={[
                    s.tool_btn,
                    editor?.isActive({ textAlign: "right" }) ? s.is_active : "",
                ].join(" ")}
                label={<Icon type={"AlignRight"} size={18} strokeWidth={2} />}
            />
            <Button
                onClick={() => editor?.commands.deleteSelection()}
                className={s.tool_btn}
                label={<Icon type={"Trash"} size={18} strokeWidth={2} />}
            />
            <Button
                onClick={() => editor?.chain().focus().toggleStrike().run()}
                disabled={!editor?.can().chain().focus().toggleStrike().run()}
                className={[
                    s.tool_btn,
                    editor?.isActive("strike") ? s.is_active : "",
                ].join(" ")}
                label={<Icon type={"LineThrough"} size={18} strokeWidth={2} />}
            />
            <Button
                onClick={() => editor?.chain().focus().toggleItalic().run()}
                disabled={!editor?.can().chain().focus().toggleItalic().run()}
                className={[
                    s.tool_btn,
                    editor?.isActive("italic") ? s.is_active : "",
                ].join(" ")}
                label={<Icon type={"Italic"} size={18} strokeWidth={2} />}
            />
            <Button
                onClick={() => editor?.chain().focus().toggleBold().run()}
                disabled={!editor?.can().chain().focus().toggleBold().run()}
                className={[
                    s.tool_btn,
                    editor?.isActive("bold") ? s.is_active : "",
                ].join(" ")}
                label={<Icon type={"Bold"} size={18} strokeWidth={2} />}
            />
            <Button
                onClick={() => {
                    if (editor?.isActive("underline")) {
                        editor?.chain().focus().unsetUnderline().run();
                    } else {
                        editor?.chain().focus().setUnderline().run();
                    }
                }}
                disabled={!editor?.can().chain().focus().toggleBold().run()}
                className={[
                    s.tool_btn,
                    editor?.isActive("underline") ? s.is_active : "",
                ].join(" ")}
                label={<Icon type={"Underline"} size={18} strokeWidth={2} />}
            />
            <span>Text style</span>
            <span>
                <Button
                    onClick={() =>
                        editor?.commands.toggleLink({
                            href: "https://example.com",
                            target: "_blank",
                        })
                    }
                    className={[
                        s.tool_btn,
                        editor?.isActive("bold") ? s.is_active : "",
                    ].join(" ")}
                    label={<Icon type={"Link"} size={18} strokeWidth={2} />}
                />
                Create link
            </span>
        </div>
    );
};

EText.craft = {
    rules: {
        canDrag: (node: Node) => node.data.props.text != "Drag",
    },
    related: {
        settings: TextSettings,
        toolbar: <div>123123</div>,
    },
};

interface IMenuProps {
    editor: any;
}

interface IProps {
    text: string;
}

const TextStyleExtended = TextStyle.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            fontSize: {
                default: null,
                parseHTML: (element: HTMLElement) => {
                    return element.style.fontSize.replace("px", "");
                },
                renderHTML: (attributes: React.CSSProperties) => {
                    if (!attributes["fontSize"]) {
                        return {};
                    }

                    return {
                        style: `font-size: ${attributes["fontSize"]}px`,
                    };
                },
            },
        };
    },

    addCommands() {
        return {
            ...this.parent?.(),
            setFontSize:
                (fontSize: string) =>
                    ({ commands }:{ commands: { setMark(name:string,{}):void}}) => {
                    return commands.setMark(this?.name, { fontSize: fontSize });
                },
        };
    },
});
