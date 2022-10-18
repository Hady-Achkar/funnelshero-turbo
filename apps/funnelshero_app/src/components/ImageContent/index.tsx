import { FC } from "react";
import s from "./imageContent.module.scss";
import { Button } from "ui";
import { Image } from "editor";
import { useEditor, Element } from "@craftjs/core";
import image1 from "assets/images/r-1.png";
import image2 from "assets/images/r-2.png";
import NextImage from "next/image";

export const ImageContent: FC = () => {
    const { connectors } = useEditor();

    return (
        <div className={s.container}>
            <div className={["title16", s.title].join(" ")}>All results</div>
            <div className={s.elements}>
                <Button
                    className={s.btn}
                    ref={(ref: HTMLButtonElement) => {
                        connectors.create(
                            ref,
                            <Element
                                src={
                                    "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                                }
                                is={Image}
                                canvas
                            />
                        );
                    }}
                >
                    <img
                        src={
                            "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                        }
                        width={"100%"}
                        height={200}
                    />
                </Button>
                <Button
                    className={s.btn}
                    ref={(ref: HTMLButtonElement) => {
                        connectors.create(
                            ref,
                            <Element
                                src={
                                    "https://wallpapershome.com/images/pages/pic_h/21486.jpg"
                                }
                                is={Image}
                                canvas
                            />
                        );
                    }}
                >
                    <img
                        src={
                            "https://wallpapershome.com/images/pages/pic_h/21486.jpg"
                        }
                        width={"100%"}
                        height={200}
                    />
                </Button>
            </div>
        </div>
    );
};
