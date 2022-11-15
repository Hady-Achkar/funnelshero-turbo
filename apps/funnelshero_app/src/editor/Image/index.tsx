import { useNode, useEditor, Node } from "@craftjs/core";
import { Component, FC, ReactElement, useCallback, useState } from "react";
import s from "./imageE.module.scss";
import { Button, Icon, Input } from "ui";
import { insertNodeOnParent } from "utils";

export const Image: FC<IProps> = ({
    src,
    alt,
    width = 100,
    height = 100,
    radius = 0,
}) => {
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

    const { selectedNodeId, actions, query } = useEditor((state) => ({
        selectedNodeId: state.events.selected.keys().next().value,
    }));

    const [isRotating, setIsRotating] = useState<boolean>(false);
    const [corners, setCorners] = useState<Array<number>>([]);

    const onRatation = (): void => setIsRotating(!isRotating);

    const duplicateNode = useCallback(() => {
        const parentNode = query.node(parent).get();
        const indexToAdd = parentNode.data.nodes.indexOf(id) + 1;

        insertNodeOnParent(id, parent, indexToAdd, query, actions);
    }, [id, parent, query]);

    const onDelete = () => actions.delete(selectedNodeId);

    const onSelectCorners = (index: number) => {
        const copyCorners = structuredClone(corners);
        copyCorners[index] = 0;
        setCorners(copyCorners);
    };

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
                    onRatation={onRatation}
                    isRotating={isRotating}
                />
            ) : null}
            <img src={src} alt={alt} width={width} height={height} />
            {isRotating && (
                <>
                    <div
                        className={s.left_top}
                        onClick={() => onSelectCorners(0)}
                    />
                    <div
                        className={s.right_top}
                        onClick={() => onSelectCorners(1)}
                    />
                    <div
                        className={s.right_bottom}
                        onClick={() => onSelectCorners(2)}
                    />
                    <div
                        className={s.left_bottom}
                        onClick={() => onSelectCorners(3)}
                    />
                </>
            )}
        </div>
    );
};

const ImageSettings: FC<IImageProps> = ({
    onDelete,
    drag,
    duplicateNode,
    onRatation,
    isRotating,
}) => {
    // const onChnageRadius = (e) => {
    //     console.log(e.target.value)
    // }

    return (
        <div className={s.settings}>
            {/* <div className={ s.border_radius_container}>
                <Icon type={'BorderRadius'} size={ 30} />
                <Input type={'number'} onChange={onChnageRadius} className={ s.radius_input} />
            </div> */}
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
            <Button
                className={`${s.settings_button} ${
                    isRotating ? s.active_btn : ""
                }`}
                onClick={onRatation}
            >
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
    related: {},
};

interface IProps {
    src: string;
    alt?: string;
    width?: string | number;
    height?: string | number;
    craft?: any;
    radius?: string;
}

interface IImageProps {
    onDelete?: () => void;
    drag: TDrag;
    duplicateNode: () => void;
    onRatation: () => void;
    isRotating: boolean;
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
