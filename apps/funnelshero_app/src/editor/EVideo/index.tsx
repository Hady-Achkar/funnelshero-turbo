import { ChangeEvent, FC } from "react";
import s from "./eVideo.module.scss";
import { useNode } from "@craftjs/core";
import { Crop, Button, Icon, Checkbox } from "ui";
import { ElementTitle } from "components";

export const EVideo: FC<IProps> = ({
    src,
    type = "video/mp4",
    enableControls = false,
    width = 300,
    height = 300,
    padding,
    margin,
    borderRadius,
    rotate,
}) => {
    const {
        connectors: { connect, drag },
        actions: { setProp },
        isSelected,
        node,
    } = useNode((state) => {
        return {
            isSelected: state.events.selected,
            node: {
                name: state.data.displayName,
                id: state.id,
            },
        };
    });

    return (
        <div
            className={`${s.container} ${isSelected ? "selected" : ""}`}
            ref={(ref: HTMLDivElement) => connect(ref)}
            style={{
                width,
                height,
            }}
        >
            <video
                controls={enableControls}
                style={{
                    borderRadius,
                    padding,
                    width,
                    height,
                    transform: `rotate(${rotate}deg)`,
                }}
            >
                <source src={src} type={type} />
            </video>

            {isSelected && (
                <Crop
                    width={width}
                    height={height}
                    rotate={rotate}
                    onChange={(e: {
                        width: number | undefined;
                        height: number | undefined;
                        rotate: number | undefined;
                    }) => {
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
            {isSelected && (
                <ElementTitle>
                    {node.name}
                    <Button
                        className={s.menu_button}
                        label={<Icon type={"move"} size={16} />}
                        ref={(ref: HTMLButtonElement) => ref && drag(ref)}
                    />
                </ElementTitle>
            )}
        </div>
    );
};

export const EVideoSettings = () => {
    const {
        actions: { setProp },
        enableControls,
    } = useNode((node) => {
        return {
            enableControls: node.data.props.enableControls,
        };
    });

    return (
        <>
            <Checkbox
                label={"Enable controls"}
                checked={enableControls}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setProp(
                        (props: { enableControls: boolean }) =>
                            (props.enableControls = e.target.checked)
                    );
                }}
            />
        </>
    );
};

EVideo.craft = {
    displayName: "Video",
    props: {},
    rules: {
        // canDrop: () => true,
        // canDrag: () => true,
        // canMoveIn: () => true,
        // canMoveOut: () => true,
    },
    related: {
        settings: EVideoSettings,
    },
};

interface IProps {
    src: string;
    type?: string;
    enableControls?: boolean;
    padding?: string;
    margin?: string;
    width?: number;
    height?: number;
    rotate?: number;
    borderRadius?: string;
}
