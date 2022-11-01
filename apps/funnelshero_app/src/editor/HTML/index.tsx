import React, { FC, ReactHTML, ReactHTMLElement, useRef } from "react";
import s from "./html.module.scss";
import { useNode, Node } from "@craftjs/core";

export const HTML: FC<IProps> = ({ tagName = "span" }) => {
    const {
        connectors: { connect, drag },
        isSelected,
    } = useNode((node: Node) => ({
        isSelected: node.events.selected,
    }));

    return React.createElement(
        tagName,
        {
            className: isSelected ? "selected" : "",
            ref: (r: HTMLElement) => connect(drag(r)),
        },
        tagName
    );
};

HTML.craft = {
    rules: {
        canDrag: (node: Node) => node.data.props.text != "Drag",
    },
};

interface IProps {
    tagName?: string;
}
