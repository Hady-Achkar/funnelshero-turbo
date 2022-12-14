import React, { FC, useEffect, useMemo, useState } from "react";
import s from "./toolsBar.module.scss";
import { MuiltipleSwitcher, IMuiltipleSwitcherEventType, Tabs } from "ui";
import { SearchInput } from "components";
import { useEditor } from "@craftjs/core";
import {
    ImageContent,
    TextContent,
    ButtonContent,
    VideoContent,
    DividerContent,
    ParagraphContent,
    OptInFormContent,
    QuestionBoxContent,
    HTMLBlock,
    Design,
    Pages,
    ContainerContent,
    Settings,
    QuizzContent,
} from "components";

export const ToolsBar: FC<IProps> = ({ activeCard }) => {
    const [selectedSwitcher, setSelectedSwitcher] = useState<number>(0);

    const { selected, actions } = useEditor((state) => {
        const [currentNodeId]: Set<string> = state.events.selected;
        let selected;

        if (currentNodeId) {
            selected = {
                data: state.nodes[currentNodeId].data,
                id: currentNodeId,
                name: state.nodes[currentNodeId].data.name,
                settings:
                    state.nodes[currentNodeId].related &&
                    state.nodes[currentNodeId].related.settings,
            };
        }
        return { selected };
    });

    useEffect(() => {
        setSelectedSwitcher(0);
    }, [activeCard]);

    const memoSidebarActiveComponents: IActiveComponent = useMemo(() => {
        return {
            image: <ImageContent />,
            video: <VideoContent />,
            text: <TextContent />,
            button: <ButtonContent />,
            divider: <DividerContent />,
            paragraph: <ParagraphContent />,
            optInForm: <OptInFormContent />,
            questionBox: <QuestionBoxContent />,
            container: <ContainerContent />,
            quizz: <QuizzContent />,
        };
    }, []);

    const onChangeSwitcher = (e: IMuiltipleSwitcherEventType) => {
        setSelectedSwitcher(e.target.index);
    };

    const memoSwitch: React.ReactNode = useMemo(() => {
        const _DATA = [
            {
                label: "Design",
                id: "design",
            },
            {
                label: "Pages",
                id: "pages",
            },
            {
                label: "Settings",
                id: "settings",
            },
        ];
        if (activeCard === "customHTMLBlock") {
            _DATA[3] = {
                label: "HTML block",
                id: "htmlBlock",
            };
        }
        return (
            <MuiltipleSwitcher
                defaultSelected={activeCard}
                containerClass={s.switch_container}
                data={_DATA}
                onChange={onChangeSwitcher}
            />
        );
    }, [activeCard]);

    return (
        <div className={s.settings_content}>
            <div className={s.body}>
                {memoSwitch}
                <div className={["title16", s.title].join(" ")}>Search</div>
                <SearchInput placeholder={"Search Image templates"} />
                <Tabs select={selectedSwitcher}>
                    <Design>{memoSidebarActiveComponents[activeCard]}</Design>
                    <Pages>asd</Pages>
                    <Settings
                        selectedEditorElement={selected}
                        actions={actions}
                    />
                    {activeCard === "customHTMLBlock" ? <HTMLBlock /> : null}
                </Tabs>
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
