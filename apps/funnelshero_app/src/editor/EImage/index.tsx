import { useNode, useEditor, Node } from "@craftjs/core";
import { FC, useCallback } from "react";
import s from "./eImage.module.scss";
import { Button, Icon, Crop } from "ui";
import { ElementTitle } from "components";
import { insertNodeOnParent } from "utils";

export const EImage: FC<IProps> = ({
    src,
    alt,
    width = 100,
    height = 100,
    borderRadius = "0px 0px 0px 0px",
    padding,
    margin,
    rotate = 0,
}) => {
    const {
        connectors: { connect, drag },
        actions: { setProp },
        isSelected,
        id,
        parent,
        node,
    } = useNode((node: Node) => {
        return {
            isSelected: node.events.selected,
            isDragged: node.events.dragged,
            isHovered: node.events.hovered,
            parent: node.data.parent,
            selectedNodeId: node.id,
            node: node.data.displayName,
        };
    });

    // const { actions, query } = useEditor((state) => state);

    // const duplicateNode = useCallback(() => {
    //     const parentNode = query.node(parent).get();
    //     const indexToAdd = parentNode.data.nodes.indexOf(id) + 1;

    //     insertNodeOnParent(id, parent, indexToAdd, query, actions);
    // }, [id, parent, query]);

    // const onDelete = () => actions.delete(id);

    return (
        <div
            ref={(ref: HTMLDivElement) => connect(ref)}
            className={[s.container].join(" ")}
            style={{ margin, padding }}
        >
            {isSelected && (
                <ElementTitle>
                    {node}
                    <Button
                        className={s.menu_button}
                        label={<Icon type={"move"} size={16} />}
                        ref={(ref) => ref && drag(ref)}
                    />
                </ElementTitle>
            )}
            {isSelected && (
                <Crop
                    width={width}
                    height={height}
                    rotate={rotate}
                    onChange={(e) => {
                        setProp(
                            (props: IProps) => (
                                (props.width = e.width),
                                (props.height = e.height),
                                (props.rotate = e.rotate)
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
                    transform: `rotate(${rotate}deg)`,
                }}
            />
        </div>
    );
};

EImage.craft = {
    displayName: "Image",
    props: {},
    rules: {
        canDrag: (node: { data: { props: { text: string } } }) => true,
        canMoveIn: (incoming: Node[], self: Node) => true,
        canMoveOut: (outgoing: Node[], self: Node) => true,
    },
    // related: {},
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
    rotate?: number;
}

// type TDrag = <
//     B extends
//         | HTMLElement
//         | React.ReactElement<
//               any,
//               | string
//               | ((props: any) => React.ReactElement<any, any>)
//               | (new (props: any) => React.Component<any, any, any>)
//           >
// >(
//     element: B
// ) => B;
