import React from "react";
import s from "./eHtml.module.scss";
import { useNode, Node } from "@craftjs/core";

export const EHTML = ({ tagName = "span" }:IProps) => {
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

EHTML.craft = {
    rules: {
        canDrag: (node: Node) => node.data.props.text != "Drag",
    },
};

interface IProps {
    tagName?: string;
}
