import { FC, useMemo } from "react";
import s from "./htmlBlock.module.scss";
import { Button } from "ui";
import { EHTML } from "editor";
import { Element, useEditor } from "@craftjs/core";

export const HTMLBlock: FC<IProps> = () => {
    const { connectors, query } = useEditor();

    const allHtmlTags = useMemo(() => {
        return [
            "a",
            "abbr",
            "acronym",
            "address",
            "applet",
            "area",
            "article",
            "aside",
            "audio",
            "b",
            "base",
            "bb",
            "bdo",
            "big",
            "blockquote",
            "button",
            "canvas",
            "caption",
            "center",
            "cite",
            "code",
            "col",
            "colgroup",
            "command",
            "datagrid",
            "datalist",
            "dd",
            "del",
            "details",
            "dfn",
            "dialog",
            "dir",
            "div",
            "dl",
            "dt",
            "em",
            "eventsource",
            "fieldset",
            "figcaption",
            "figure",
            "footer",
            "form",
            "frame",
            "frameset",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "head",
            "header",
            "hr",
            "html",
            "i",
            "iframe",
            "img",
            "input",
            "ins",
            "isindex",
            "kbd",
            "keygen",
            "label",
            "legend",
            "li",
            "link",
            "map",
            "mark",
            "menu",
            "meta",
            "meter",
            "nav",
            "noframes",
            "noscript",
            "ol",
            "optgroup",
            "option",
            "output",
            "p",
            "param",
            "pre",
            "progress",
            "q",
            "s",
            "samp",
            "script",
            "section",
            "select",
            "small",
            "source",
            "span",
            "strike",
            "strong",
            "sub",
        ];
    }, []);

    return (
        <div className={s.container}>
            {allHtmlTags.map((tag) => {
                return (
                    <Button
                        key={tag}
                        label={tag}
                        className={s.html_tag_handler}
                        ref={(ref: HTMLButtonElement) => {
                            connectors.create(
                                ref,
                                <Element tagName={tag} is={EHTML} canvas />
                            );
                        }}
                    />
                );
            })}
        </div>
    );
};

interface IProps {}
