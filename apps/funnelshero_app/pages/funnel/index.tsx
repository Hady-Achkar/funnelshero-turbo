import type { NextPage } from "next";
import s from "./funnel.module.scss";
import { Topbar, Sidebar } from "../../src/components";
import { Editor, Frame, Element } from "@craftjs/core";
import { ButtonE, Image, Text } from "editor";
import NextImage from "next/image";
import { Scroll } from "ui";

const Funnel: NextPage = () => {
    return (
        <div className={s.container}>
            <Topbar />
            <div className={s.block}>
                <Editor
                    resolver={{
                        Image,
                        ButtonE,
                        NextImage,
                        Text,
                    }}
                >
                    <Sidebar />
                    <Scroll className={s.artboard}>
                        <Frame>
                            <Element
                                is={"div"}
                                padding={5}
                                background="#eee"
                                className={s.element}
                                canvas
                            >
                                <ButtonE
                                    size="small"
                                    variant="outlined"
                                    text={"Click"}
                                />

                                <Element
                                    is={"div"}
                                    id={"div123123"}
                                    padding={2}
                                    background="#999"
                                    canvas
                                >
                                    and draggable // Node of type Text,
                                    draggable
                                </Element>
                                <Element is={Text} text={"image1"} canvas />
                            </Element>
                        </Frame>
                    </Scroll>
                </Editor>
            </div>
        </div>
    );
};

export default Funnel;
