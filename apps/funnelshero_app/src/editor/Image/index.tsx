import { useNode, useEditor, Node } from "@craftjs/core";
import { Component, FC, ReactElement, useCallback } from "react";
import s from "./imageE.module.scss";
import { Button, Icon } from "ui";
import { insertNodeOnParent } from "utils";

export const Image: FC<IProps> = ({ src, alt, width = 100, height = 100 }) => {
    const {
        connectors: { connect, drag },
        isSelected,
        id,
        parent,
    } = useNode((node: Node) => {
        return {
            isSelected: node.events.selected,
            isDragged: node.events.dragged,
            isHovered: node.events.hovered,
            parent: node.data.parent,
        };
    });

    const { selectedNodeId, actions, query } = useEditor((state) => {
        return {
            selectedNodeId: state.events.selected.keys().next().value,
        };
    });

    const duplicateNode = useCallback(() => {
        const parentNode = query.node(parent).get();
        const indexToAdd = parentNode.data.nodes.indexOf(id) + 1;

        insertNodeOnParent(id, parent, indexToAdd, query, actions);
    }, [id, parent, query]);

    const onDelete = () => actions.delete(selectedNodeId);

    return (
        <div
            ref={connect}
            className={[s.container, isSelected ? s.selected : ""].join(" ")}
        >
            {isSelected ? (
                <ImageSettings
                    onDelete={onDelete}
                    drag={drag}
                    duplicateNode={duplicateNode}
                />
            ) : null}
            <img src={src} alt={alt} width={width} height={height} />
        </div>
    );
};

const ImageSettings: FC<IImageProps> = ({ onDelete, drag, duplicateNode }) => {
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
            <Button className={s.settings_button} onClick={duplicateNode}>
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

Image.craft = {
    displayName: "Image",
    props: {},
    rules: {
        canDrag: (node: { data: { props: { text: string } } }) => true,
        canMoveIn: (incoming: Node[], self: Node) => true,
        canMoveOut: (outgoing: Node[], self: Node) => true,
    },
    related: {
        settings: ImageSettings,
    },
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
    drag: TDrag;
    duplicateNode: () => void;
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
