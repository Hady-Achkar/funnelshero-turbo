import { FC, useMemo, useRef } from "react";
import s from "./sidebar.module.scss";
import { Button, Icon } from "ui";

export const Sidebar: FC<IProps> = ({ onClickCard }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const memoCardData: IMemoCard[] = useMemo<IMemoCard[]>(() => {
        return [
            {
                icon: "Image",
                title: "Image",
                id: "image",
            },
            {
                icon: "Video",
                title: "Video",
                id: "video",
            },
            {
                icon: "Button",
                title: "Button",
                id: "button",
            },
            {
                icon: "Divider",
                title: "Divider",
                id: "divider",
            },
            {
                icon: "File",
                title: "text",
                id: "text",
            },
            {
                icon: "OptInForm",
                title: "Opt in Form",
                id: "optInForm",
            },
            {
                icon: "QuestionMark",
                title: "Question Box",
                id: "questionBox",
            },
            {
                icon: "AlignCenter",
                title: "Quizz",
                id: "1uizz",
            },
            {
                icon: "File",
                title: "Custom HTML block",
                id: "customHTMLBlock",
            },
            {
                icon: "Container",
                title: "Container",
                id: "container",
            },
        ];
    }, []);

    return (
        <div className={s.container} ref={containerRef}>
            {memoCardData.map((item, index) => {
                return (
                    <Card
                        dataKey={item.id}
                        key={index}
                        icon={item.icon}
                        title={item.title}
                        onClick={onClickCard}
                    />
                );
            })}
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

interface IProps {
    onClickCard: (e: React.MouseEvent<HTMLButtonElement>) => void;
    activeCard: string;
}

interface ICard {
    title: string;
    icon: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    dataKey: string | number;
    className?: string;
}

interface IMemoCard {
    icon: string;
    title: string;
    id: string;
}
