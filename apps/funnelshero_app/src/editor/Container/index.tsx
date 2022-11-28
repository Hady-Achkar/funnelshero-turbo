import { FC } from "react";
import s from "./container.module.scss";
import { useNode, Element } from "@craftjs/core";
import { ColorPicker } from "components";

export const Container: FC<IProps> = ({
    borderRadius,
    backgroundColor,
    padding,
    margin,
    width = 300,
    height = 300,
}) => {
    const {
        connectors: { connect, drag },
    } = useNode();

    return (
        <div
            ref={(ref: HTMLDivElement) => connect(drag(ref))}
            className={s.container}
            style={{
                borderRadius,
                backgroundColor,
                padding,
                margin,
                width,
                height,
            }}
        />
    );
};
export const ContainerSettings = () => {
    const {
        actions: { setProp },
        color,
        backgroundColor,
    } = useNode((node) => ({
        color: node.data.props.color,
        backgroundColor: node.data.props.backgroundColor,
    }));

    return (
        <div className={s.settings}>
            <div>Fill</div>
            <ColorPicker
                color={backgroundColor}
                onChange={(color) => {
                    setProp(
                        (props: { backgroundColor: string }) =>
                            (props.backgroundColor = color)
                    );
                }}
            />
        </div>
    );
};

Container.craft = {
    displayName: "Container",
    props: {
        color: { h: 0, s: 80, v: 68, a: 1 },
        text: "Hi",
    },
    rules: {
        canDrag: (node: { data: { props: { text: string } } }) =>
            node.data.props.text != "Drag",
        canMoveIn: (incoming: Node[], self: Node) => true,
        canMoveOut: (outgoing: Node[], self: Node) => true,
    },
    related: {
        settings: ContainerSettings,
    },
};
interface IProps {
    borderRadius?: string;
    backgroundColor: string;
    padding?: string;
    margin?: string;
    width?: number;
    height?: number;
}
