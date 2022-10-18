import { useNode } from "@craftjs/core";
import { FC } from "react";
import s from "./imageE.module.scss";
import { Button, Icon } from "ui";

export const Image: FC<IProps> = ({ src, alt, width = 100, height = 100 }) => {
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

    Image.craft = {
        displayName: "Image",
        props: {
            src: src,
            alt: alt,
            width: width,
            height: height,
        },
        rules: {
            canDrag: (node: { data: { props: { text: string } } }) => true,
            canMoveIn: (incoming: Node[], self: Node) => true,
            canMoveOut: (outgoing: Node[], self: Node) => true,
        },
        related: {
            settings: ImageSettings,
        },
    };

    return (
        <div
            ref={(ref) => {
                connect(drag(ref));
            }}
            className={[s.container].join(" ")}
        >
            {isSelected ? <ImageSettings /> : null}
            <img src={src} alt={alt} width={width} height={height} />
        </div>
    );
};

const ImageSettings = () => {
    const { props, setProp } = useNode();

    return (
        <div className={s.settings}>
            <Button className={s.settings_button}>
                <Icon type={"Move"} size={20} />
                Move
            </Button>
            <Button className={s.settings_button}>
                <Icon type={"Trash"} size={20} />
                Delete
            </Button>
            <Button className={s.settings_button}>
                <Icon type={"Comment"} size={20} />
                Add Comment
            </Button>
            <Button className={s.settings_button}>
                <Icon type={"Duplicate"} size={20} />
                Duplicate
            </Button>
            <Button className={s.settings_button}>
                <Icon type={"Rotate"} size={20} />
                Rotate
            </Button>
        </div>
    );
};

interface IProps {
    src: string;
    alt?: string;
    width?: string | number;
    height?: string | number;
    craft?: any;
}
