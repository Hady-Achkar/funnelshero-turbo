import { FC, ReactElement, useRef } from "react";
import s from "./tabs.module.scss";

export const Tabs: FC<IProps> = ({ children = [], select = 0 }) => {
    const blockRef = useRef<HTMLElement>();

    return (
        <div className={s.container}>
            <div
                className={s.block}
                ref={blockRef as React.RefObject<HTMLDivElement>}
                style={{
                    transform: `translateX(-${select * 100}%`,
                }}
            >
                {blockRef.current &&
                    children.map((child, index) => {
                        return (
                            <div
                                key={index}
                                className={s.tab}
                                style={{
                                    height: blockRef?.current?.clientHeight,
                                    overflowY: "auto",
                                }}
                            >
                                {child}
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

interface IProps {
    select: number;
    children: ReactElement[];
}
