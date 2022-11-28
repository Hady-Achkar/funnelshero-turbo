import type { NextPage } from "next";
import { useState } from "react";
import s from "./funnel.module.scss";
import { Editor, Frame, Element } from "@craftjs/core";
import { ButtonE, Image, Text, InputE, HTML, Container } from "editor";
import { Scroll } from "ui";
import { Topbar, Sidebar, ToolsBar } from "components";

const Funnel: NextPage = () => {
    const [activeCard, setActiveCard] = useState<string>("image");

    const onClickCard = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (e.currentTarget.dataset.key)
            setActiveCard(e.currentTarget.dataset.key);
    };

    return (
        <div className={s.container}>
            <Topbar />
            <div className={s.block}>
                <Editor
                    onNodesChange={(e) => {
                        // console.log(e.getState());
                    }}
                    resolver={{
                        Image,
                        ButtonE,
                        InputE,
                        Text,
                        HTML,
                        Container,
                    }}
                >
                    <Sidebar
                        onClickCard={onClickCard}
                        activeCard={activeCard}
                    />
                    <Scroll className={s.artboard}>
                        <Frame>
                            <Element
                                is={"div"}
                                padding={5}
                                background="#eee"
                                className={s.element}
                                canvas
                            >
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
                    <ToolsBar activeCard={activeCard} />
                </Editor>
            </div>
        </div>
    );
};

interface IActiveComponent {
    [key: string]: JSX.Element;
}

export default Funnel;
