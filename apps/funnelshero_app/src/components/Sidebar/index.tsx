import { FC, useMemo, useRef } from "react";
import s from "./sidebar.module.scss";
import { Button, Icon } from "ui";

export const Sidebar: FC<IProps> = ({ onClickCard }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const memoCardData: IMemoCard[] = useMemo(() => {
        return [
            {
                icon: "Image",
                title: "image",
            },
            {
                icon: "Video",
                title: "video",
            },
            {
                icon: "Button",
                title: "button",
            },
            {
                icon: "Divider",
                title: "divider",
            },
            {
                icon: "File",
                title: "text",
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
