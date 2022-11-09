import React, { FC, useEffect, useState } from "react";
import s from "./select.module.scss";

export const Select: FC<IProps> = ({ children }) => {
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        window &&
            window.addEventListener("mousedown", (e: MouseEvent) => {
                if (e.target instanceof Element) {
                    const _TARGET = e?.target?.closest("." + s.container);
                    if (show && !_TARGET) {
                        setShow(false);
                    }
                }
            });
    }, []);

    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            const passProps = {
                className: s.option,
            };

            return React.cloneElement(child, passProps);
        }
        return child;
    });

    return (
        <div className={s.container}>
            <div className={s.label} onClick={() => setShow(!show)}>
                label
            </div>

            {show && <div className={s.body}>{childrenWithProps}asdasd</div>}
        </div>
    );
};

interface IProps {
    children: React.ReactNode | React.ReactNode[];
}
