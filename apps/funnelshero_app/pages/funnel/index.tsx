import type { NextPage } from "next";
import { useState, useEffect } from "react";
import s from "./funnel.module.scss";
import { Editor, Frame, Element } from "@craftjs/core";
import {
    EButton,
    EImage,
    EText,
    EInput,
    EHTML,
    EContainer,
    ESelect,
    EVideo,
    EIcon,
} from "editor";
import { Scroll, Button } from "ui";
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
                        // console.log(e.getNodes());
                        // console.log(document.getElementsByClassName(s.root)[0]);
                    }}
                    resolver={{
                        EImage,
                        EButton,
                        EInput,
                        EText,
                        EHTML,
                        EContainer,
                        ESelect,
                        EVideo,
                        EIcon,
                    }}
                >
                    <Sidebar
                        onClickCard={onClickCard}
                        activeCard={activeCard}
                    />
                    <div
                        style={{
                            flex: 1,
                            display: "grid",
                            gridTemplateRows: "auto 1fr",
                            zIndex: 1,
                            position: "relative",
                        }}
                    >
                        <div className={s.funnel_menu_container}>
                            <Button className={s.question_btn}>
                                <div>?</div> +add
                            </Button>
                            <Button
                                className={s.add_page_btn}
                                label={"Add page"}
                            />
                        </div>
                        <Scroll className={s.artboard}>
                            <Frame>
                                <Element is={"div"} className={s.root} canvas />
                            </Frame>
                        </Scroll>
                    </div>
                    <ToolsBar activeCard={activeCard} />
                </Editor>
            </div>
        </div>
    );
};

export default Funnel;
