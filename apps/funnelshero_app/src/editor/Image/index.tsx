import { useNode, useEditor, Node } from "@craftjs/core";
import { FC, useCallback } from "react";
import s from "./imageE.module.scss";
import { Button, Icon, Crop } from "ui";
import { insertNodeOnParent } from "utils";

export const Image: FC<IProps> = ({
    src,
    alt,
    width = 100,
    height = 100,
    borderRadius = "0px 0px 0px 0px",
    padding,
    margin,
}) => {
    const {
        connectors: { connect, drag },
        actions: { setProp },
        isSelected,
        id,
        parent,
    } = useNode((node: Node) => {
        return {
            isSelected: node.events.selected,
            isDragged: node.events.dragged,
            isHovered: node.events.hovered,
            parent: node.data.parent,
            selectedNodeId: node.id,
        };
    });

    const { actions, query } = useEditor((state) => ({
        selectedNodeId: state.events.selected.keys().next().value,
    }));

    const duplicateNode = useCallback(() => {
        const parentNode = query.node(parent).get();
        const indexToAdd = parentNode.data.nodes.indexOf(id) + 1;

        insertNodeOnParent(id, parent, indexToAdd, query, actions);
    }, [id, parent, query]);

    const onDelete = () => actions.delete(id);

    return (
        <div
            ref={(ref: HTMLDivElement) => connect(ref)}
            className={[s.container].join(" ")}
            style={{ margin, padding }}
        >
            {isSelected && (
                <ImageMenu
                    onDelete={onDelete}
                    duplicateNode={duplicateNode}
                    onDrag={drag}
                />
            )}
            {isSelected && (
                <Crop
                    width={width}
                    height={height}
                    onChange={(e) => {
                        setProp(
                            (props: IProps) => (
                                (props.width = e.width),
                                (props.height = e.height)
                            )
                        );
                    }}
                />
            )}
            <img
                src={src}
                alt={alt}
                style={{
                    borderRadius,
                    width,
                    height,
                }}
            />
        </div>
    );
};

const ImageMenu: FC<IImageMenuProps> = ({
    onDelete,
    duplicateNode,
    onDrag,
}) => {
    return (
        <div className={s.menu}>
            <Button className={s.menu_button} onClick={onDelete}>
                <Icon type={"Trash"} size={18} />
                Delete
            </Button>
            <Button className={s.menu_button} onClick={duplicateNode}>
                <Icon type={"Duplicate"} size={18} />
                Duplicate
            </Button>
            <Button className={s.menu_button} ref={(ref) => ref && onDrag(ref)}>
                <Icon type={"Move"} size={18} />
                Move
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
    related: {},
};

interface IProps {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
    craft?: any;
    borderRadius?: string;
    rotation?: number | string;
    padding?: string;
    margin?: string;
}

interface IImageMenuProps {
    onDelete?: () => void;
    duplicateNode: () => void;
    onDrag: TDrag;
}

type TDrag = <
    B extends
        | HTMLElement
        | React.ReactElement<
              any,
              | string
              | ((props: any) => React.ReactElement<any, any>)
              | (new (props: any) => React.Component<any, any, any>)
          >
>(
    element: B
) => B;
