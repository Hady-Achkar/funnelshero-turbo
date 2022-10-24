import { useNode, useEditor, Node } from "@craftjs/core";
import { Component, FC, ReactElement } from "react";
import s from "./imageE.module.scss";
import { Button, Icon } from "ui";

export const Image: FC<IProps> = ({ src, alt, width = 100, height = 100 }) => {
    const {
        connectors: { connect, drag },
        isSelected,
        // isDragged,
        // isHovered,
    } = useNode((node: Node) => {
        return {
            isSelected: node.events.selected,
            isDragged: node.events.dragged,
            isHovered: node.events.hovered,
        };
    });

    const { selectedNodeId, actions } = useEditor((state) => {
        return {
            selectedNodeId: state.events.selected.keys().next().value,
        };
    });

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

    const onDelete = () => {
        actions.delete(selectedNodeId);
    };

    return (
        <div
            ref={connect}
            className={[s.container, isSelected ? s.selected : ""].join(" ")}
        >
            {isSelected ? (
                <ImageSettings onDelete={onDelete} drag={drag} />
            ) : null}
            <img src={src} alt={alt} width={width} height={height} />
        </div>
    );
};

const ImageSettings: FC<IImageProps> = ({ onDelete, drag }) => {
    return (
        <div className={s.settings}>
            <Button className={s.settings_button} ref={drag}>
                <Icon type={"Move"} size={20} />
                Move
            </Button>
            <Button className={s.settings_button} onClick={onDelete}>
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

interface IImageProps {
    onDelete?: () => void;
    // containerRef: { current: HTMLDivElement };
    drag: TDrag;
    // connect: TConnect;
}

type TDrag = <
    B extends
        | HTMLElement
        | ReactElement<
              any,
              | string
              | ((props: any) => ReactElement<any, any>)
              | (new (props: any) => Component<any, any, any>)
          >
>(
    element: B
) => B;
type TConnect = <
    B extends
        | HTMLElement
        | ReactElement<
              any,
              | string
              | ((props: any) => ReactElement<any, any>)
              | (new (props: any) => Component<any, any, any>)
          >
>(
    element: B
) => B;
