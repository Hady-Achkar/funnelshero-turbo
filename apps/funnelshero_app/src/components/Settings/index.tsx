import React, { FC, useLayoutEffect, useMemo, useState } from "react";
import s from "./settings.module.scss";
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
} from "components";
import { Scroll } from "ui";

export const Settings: FC<IProps> = ({ activeCard }) => {
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

    // console.log(selected?.data.props);

    useLayoutEffect(() => {
        setSelectedSwitcher(0);
    }, [activeCard]);

    const memoSettings = useMemo(() => {
        return (
            <>
                {selected &&
                    selected.settings &&
                    React.createElement(selected.settings)}
                <Edges
                    padding={selected?.data?.props?.padding}
                    margin={selected?.data?.props?.margin}
                    onChange={(edges: IEdges) => {
                        actions.setProp(selected.id, (props) => {
                            return (
                                (props.padding = edges.padding),
                                (props.margin = edges.margin)
                            );
                        });
                    }}
                />
            </>
        );
    }, [selected]);

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
                    <SearchInput placeholder={"Search Image templates"} />{" "}
                </div>
                <Tabs select={selectedSwitcher}>
                    <Design>
                        {memoSidebarActiveComponents[activeCard]}
                        {memoSettings}
                    </Design>
                    <Pages>asd</Pages>
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
