import React, { FC, useLayoutEffect, useMemo, useState } from "react";
import s from "./settings.module.scss";
import { MuiltipleSwitcher, IMuiltipleSwitcherEventType, Tabs } from "ui";
import { SearchInput } from "components";
import { useEditor } from "@craftjs/core";
import {
    ImageContent,
    TitleContent,
    ButtonContent,
    VideoContent,
    DividerContent,
    ParagraphContent,
    OptInFormContent,
    QuestionBoxContent,
    HtmlBlockContent,
    HTMLBlock,
    Design,
    Pages,
} from "components";
import { Scroll } from "ui";

export const Settings: FC<IProps> = ({ activeCard }) => {
    const [selectedSwitcher, setSelectedSwitcher] = useState<number>(0);
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
            customHTMLBlock: <HtmlBlockContent />,
        };
    }, []);

    useLayoutEffect(() => {
        setSelectedSwitcher(0);
    }, [activeCard]);

    const { selected } = useEditor((state) => {
        const [currentNodeId]: Set<string> = state.events.selected;
        let selected;

        if (currentNodeId) {
            selected = {
                id: currentNodeId,
                name: state.nodes[currentNodeId].data.name,
                settings:
                    state.nodes[currentNodeId].related &&
                    state.nodes[currentNodeId].related.settings,
            };
        }
        return { selected };
    });

    const memoSwitchColor = useMemo(() => {
        const _DATA = [
            {
                label: "Design",
                id: "design",
            },
            {
                label: "Pages",
                id: "pages",
            },
        ];
        if (activeCard === "customHTMLBlock") {
            _DATA[2] = {
                label: "HTML block",
                id: "htmlBlock",
            };
        }
        return _DATA;
    }, [activeCard, selectedSwitcher]);

    // const memoTabContainer = useMemo(() => {
    //     return (

    //     );
    // }, [activeCard]);

    const onChangeSwitcher = (e: IMuiltipleSwitcherEventType) => {
        setSelectedSwitcher(e.target.index);
    };

    return (
        <div className={s.settings_content}>
            <div className={s.body}>
                <MuiltipleSwitcher
                    containerClass={s.switch_container}
                    data={memoSwitchColor}
                    onChange={onChangeSwitcher}
                />
                <div className={["title16", s.title].join(" ")}>Search</div>
                <div>
                    <SearchInput placeholder={"Search Image templates"} />
                </div>
                {selected &&
                    selected.settings &&
                    React.createElement(selected.settings)}
                <div className={s.container}>
                    <Tabs select={selectedSwitcher}>
                        <Design>
                            {memoSidebarActiveComponents[activeCard]}
                        </Design>
                        <Pages>asd</Pages>
                        {activeCard === "customHTMLBlock" ? (
                            <HTMLBlock />
                        ) : null}
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

interface IActiveComponent {
    [key: string]: JSX.Element;
}

interface IProps {
    activeCard: string;
}
