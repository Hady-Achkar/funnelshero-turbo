import { FC } from "react";
import s from "./imageContent.module.scss";
import { Button } from "ui";
import { Image } from "editor";
import { useEditor, Element } from "@craftjs/core";
import image1 from "assets/images/r-1.png";
import image2 from "assets/images/r-2.png";

export const ImageContent: FC = () => {
    const { connectors, query } = useEditor();

    return (
        <div className={s.container}>
            <div className={["title16", s.title].join(" ")}>All results</div>
            <div className={s.elements}>
                <Button
                    className={s.btn}
                    ref={(ref: HTMLButtonElement) => {
                        connectors.create(
                            ref,
                            <Element src={image1} is={Image} canvas />
                        );
                    }}
                >
                    <Image src={image1} />
                </Button>
                <Button
                    ref={(ref: HTMLButtonElement) => {
                        connectors.create(
                            ref,
                            <Element
                                id={"asdjdimasdkjsdf"}
                                src={image2}
                                is={Image}
                                width={300}
                                canvas
                            />
                        );
                    }}
                >
                    <Image src={image2} />
                </Button>
            </div>
        </div>
    );
};
