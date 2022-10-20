import { FC, useMemo, useRef } from "react";
import s from "./sidebar.module.scss";
import { Button, Icon } from "ui";

export const Sidebar: FC<IProps> = ({ onClickCard }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const memoCardData: IMemoCard[] = useMemo(() => {
        return [
            {
                icon: "Image",
                title: "Image",
            },
            {
                icon: "Video",
                title: "Video",
            },
            {
                icon: "Button",
                title: "Button",
            },
            {
                icon: "Divider",
                title: "Divider",
            },
            {
                icon: "File",
                title: "text",
            },
            {
                icon: "OptInForm",
                title: "Opt-in Form",
            },
            {
                icon: "QuestionMark",
                title: "Question Box",
            },
            {
                icon: "AlignCenter",
                title: "Quizz",
            },
            {
                icon: "Container",
                title: "Component",
            },
        ];
    }, []);

    return (
        <div className={s.container} ref={containerRef}>
            {memoCardData.map((item, index) => {
                return (
                    <Card
                        dataKey={item.title}
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
}
