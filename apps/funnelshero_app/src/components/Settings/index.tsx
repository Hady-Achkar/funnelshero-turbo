import React, { FC, useMemo, useState } from "react";
import s from "./settings.module.scss";
import { MuiltipleSwitcher, Scroll, IMuiltipleSwitcherEventType } from "ui";
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
} from "components";

export const Settings: FC<IProps> = ({ activeCard }) => {
    const [selectedSwitcher, setSelectedSwitcher] = useState<number>();
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
    }, [activeCard]);

    const onChangeSwitcher = (e: IMuiltipleSwitcherEventType) => {
        setSelectedSwitcher(e.target.index);
    };

    console.log(selectedSwitcher);
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
                <Scroll>
                    {/* <Tabs></Tabs> */}
                    {memoSidebarActiveComponents[activeCard]}
                    {selected &&
                        selected.settings &&
                        React.createElement(selected.settings)}
                </Scroll>
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
