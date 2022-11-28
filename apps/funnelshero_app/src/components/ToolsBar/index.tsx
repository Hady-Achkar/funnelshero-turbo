import React, {
    FC,
    useEffect,
    useLayoutEffect,
    useMemo,
    useState,
} from "react";
import s from "./toolsBar.module.scss";
import { MuiltipleSwitcher, IMuiltipleSwitcherEventType, Tabs } from "ui";
import { SearchInput, Edges } from "components";
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
    ContainerContent,
    Settings,
} from "components";
import { Scroll } from "ui";

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
            text: <TitleContent />,
            button: <ButtonContent />,
            divider: <DividerContent />,
            paragraph: <ParagraphContent />,
            optInForm: <OptInFormContent />,
            questionBox: <QuestionBoxContent />,
            customHTMLBlock: <HtmlBlockContent />,
            container: <ContainerContent />,
        };
    }, []);

    useLayoutEffect(() => {
        setSelectedSwitcher(0);
    }, [activeCard]);

    // const memoSettings = useMemo(() => {
    //     return <></>;
    // }, [selected]);

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
        return _DATA;
    }, [activeCard, selectedSwitcher]);

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
