import { FC, useState, useMemo, useRef } from "react";
import s from "./sidebar.module.scss";
import { Button, Icon, Scroll } from "ui";
import {
    ImageContent,
    TitleContent,
    SearchInput,
    ButtonContent,
    VideoContent,
    DividerContent,
    ParagraphContent,
} from "components";
import { MuiltipleSwitcher } from "ui";

export const Sidebar: FC<IProps> = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeCard, setActiveCard] = useState<string>("image");
    const [showContent, setShowContent] = useState<boolean>(false);

    const onClickCard = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (containerRef.current?.querySelectorAll("." + s.navigation_btn)) {
            const elem: NodeListOf<HTMLDivElement> =
                containerRef.current?.querySelectorAll("." + s.navigation_btn);
            for (let i = 0; i < elem.length; i++) {
                elem[i].classList.remove(s.prev_sibling);
                elem[i].classList.remove(s.next_sibling);
            }
        }

        if (e.currentTarget.dataset.key) {
            setActiveCard(e.currentTarget.dataset.key);
        }
    };

    const memoCardData: IMemoCard[] = useMemo(() => {
        return [
            {
                icon: "Image",
                title: "image",
            },
            {
                icon: "File",
                title: "title",
            },
            {
                icon: "Button",
                title: "button",
            },
            {
                icon: "Video",
                title: "video",
            },
            {
                icon: "Divider",
                title: "divider",
            },
            {
                icon: "Paragraph",
                title: "paragraph",
            },
        ];
    }, []);

    const memoSidebarActiveComponents: IActiveComponent = useMemo(() => {
        return {
            image: <ImageContent />,
            video: <VideoContent />,
            title: <TitleContent />,
            button: <ButtonContent />,
            divider: <DividerContent />,
            paragraph: <ParagraphContent />,
        };
    }, []);

    return (
        <div className={s.container}>
            <div className={s.navigation_container} ref={containerRef}>
                <div className={s.block}>
                    {memoCardData.map((item, index) => {
                        return (
                            <Card
                                dataKey={item.title}
                                key={index}
                                icon={item.icon}
                                title={item.title}
                                onClick={onClickCard}
                                className={
                                    activeCard === item.title ? s.active : ""
                                }
                            />
                        );
                    })}
                </div>
            </div>

            <div
                className={[
                    s.settings_content,
                    showContent ? s.show_content : s.hide_content,
                ].join(" ")}
            >
                <div className={s.body}>
                    <MuiltipleSwitcher
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
                    <div className={["title16", s.title].join(" ")}>Search</div>
                    <SearchInput placeholder={"Search Image templates"} />
                    <Scroll>{memoSidebarActiveComponents[activeCard]}</Scroll>
                </div>
                <Button
                    label={
                        <Icon
                            type={showContent ? "ChevronLeft" : "ChevronRight"}
                            color={"white"}
                            fill={"white"}
                        />
                    }
                    className={s.open_close_btn}
                    onClick={() => setShowContent(!showContent)}
                />
            </div>
        </div>
    );
};

const Card: FC<ICard> = ({ title, icon, onClick, dataKey, className }) => {
    return (
        <Button
            className={[s.navigation_btn, className].join(" ")}
            onClick={onClick}
            data-key={dataKey}
        >
            <div>
                <Icon type={icon} size={20} />
            </div>
            <span>{title}</span>
        </Button>
    );
};

interface IProps {}

interface ICard {
    title: string;
    icon: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    dataKey: string | number;
    className: string;
}

interface IMemoCard {
    icon: string;
    title: string;
}

interface IActiveComponent {
    [key: string]: JSX.Element;
}
