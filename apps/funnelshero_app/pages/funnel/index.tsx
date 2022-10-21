import type { NextPage } from "next";
import { useState, useMemo } from "react";
import s from "./funnel.module.scss";
import { Editor, Frame, Element } from "@craftjs/core";
import { ButtonE, Image, Text, InputE } from "editor";
import NextImage from "next/image";
import { Scroll, MuiltipleSwitcher } from "ui";
import {
    ImageContent,
    TitleContent,
    ButtonContent,
    VideoContent,
    DividerContent,
    ParagraphContent,
    OptInFormContent,
    QuestionBoxContent,
    Topbar,
    Sidebar,
    Settings,
} from "components";

const Funnel: NextPage = () => {
    const [activeCard, setActiveCard] = useState<string>("image");
    const memoSidebarActiveComponents: IActiveComponent = useMemo(() => {
        return {
            image: <ImageContent />,
            video: <VideoContent />,
            text: <TitleContent />,
            button: <ButtonContent />,
            divider: <DividerContent />,
            paragraph: <ParagraphContent />,
            optInForm: <OptInFormContent />,
            questionBox: <QuestionBoxContent />,
        };
    }, []);

    const onClickCard = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (e.currentTarget.dataset.key)
            setActiveCard(e.currentTarget.dataset.key);
    };

    return (
        <div className={s.container}>
            <Topbar />
            <div className={s.block}>
                <Editor
                    resolver={{
                        Image,
                        ButtonE,
                        InputE,
                        Text,
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
                    <Settings activeCard={activeCard} />
                </Editor>
            </div>
        </div>
    );
};

interface IActiveComponent {
    [key: string]: JSX.Element;
}

export default Funnel;
