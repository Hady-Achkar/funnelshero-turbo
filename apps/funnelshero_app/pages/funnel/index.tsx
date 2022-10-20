import type { NextPage } from "next";
import { useState, useMemo } from "react";
import s from "./funnel.module.scss";
import { Editor, Frame, Element } from "@craftjs/core";
import { ButtonE, Image, Text } from "editor";
import NextImage from "next/image";
import { Scroll, MuiltipleSwitcher } from "ui";
import {
    ImageContent,
    TitleContent,
    ButtonContent,
    VideoContent,
    DividerContent,
    ParagraphContent,
    Topbar,
    Sidebar,
    SearchInput,
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
                        // NextImage,
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

                    <div className={s.settings_content}>
                        <div className={s.body}>
                            <div className={s.switch_block}>
                                <MuiltipleSwitcher
                                    containerClass={s.switch_container}
                                    btnsClass={s.switch_btn}
                                    data={[
                                        {
                                            label: "Design",
                                            id: "design",
                                        },
                                        {
                                            label: "Pages",
                                            id: "pages",
                                        },
                                    ]}
                                />
                            </div>
                            <div className={["title16", s.title].join(" ")}>
                                Search
                            </div>
                            <SearchInput
                                placeholder={"Search Image templates"}
                            />
                            <Scroll>
                                {memoSidebarActiveComponents[activeCard]}
                            </Scroll>
                        </div>
                    </div>
                </Editor>
            </div>
        </div>
    );
};

interface IActiveComponent {
    [key: string]: JSX.Element;
}

export default Funnel;
