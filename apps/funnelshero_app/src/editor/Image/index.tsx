import { useEditor, useNode } from "@craftjs/core";
import NextImage, { StaticImageData } from "next/image";
import { FC } from "react";
import s from "./imageE.module.scss";

export const Image: FC<IProps> = ({ src, alt, width, height }) => {
    const {
        connectors: { connect, drag, select },
        isClicked,
    } = useEditor((node) => ({
        isClicked: node.events.selected,
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

    // console.log(isClicked);

    if (typeof src === "string")
        return <img src={src} alt={alt} width={width} height={height} />;

    return (
        // <div ref={(ref) => connect(drag(ref))}>
        //     asddsa
        <NextImage
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={[isClicked ? "selected" : ""].join(" ")}
        />
        // </div>
    );
};

const ImageSettings = () => {
    const { props, setProp } = useNode();

    return (
        <div>
            Src:{" "}
            <input
                type="text"
                value={props.text}
                onChange={(e) =>
                    setProp((props) => {
                        return (props.text = e.target.value);
                    })
                }
            />
            Alt:{" "}
            <input
                type="text"
                value={props.color}
                onChange={(e) =>
                    setProp((props) => (props.color = e.target.value))
                }
            />
        </div>
    );
};

interface IProps {
    src: string | StaticImageData;
    alt?: string;
    width?: string | number;
    height?: string | number;
    craft?: any;
}
