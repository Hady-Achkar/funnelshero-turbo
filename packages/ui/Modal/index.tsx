import React, { FC, useRef, useLayoutEffect } from "react";
import s from "./modal.module.scss";
import { Portal } from "..";

const root = document.documentElement;

window.addEventListener("click", (e: React.MouseEvent<HTMLButtonElement>) => {
    const target: HTMLElement = e.target.closest(".modal-handler");
    if (target) {
        root.style.setProperty("--mouse-x", e.pageX + "px");
        root.style.setProperty("--mouse-y", e.pageY + "px");
    }
});

let timer: NodeJS.Timer;

interface IProps {
    visibility: boolean;
    closeBtnEnabled: boolean;
    setVisibility: (arg: boolean) => void;
    className: string;
    animationTiming: number;
}
export const Modal: FC<IProps> = ({
    visibility,
    setVisibility,
    children,
    className,
    closeBtnEnabled = true,
    animationTiming = 360,
}) => {
    const modal = useRef();

    useLayoutEffect(() => {
        clearTimeout(timer);
    }, []);

    const onClose = (
        e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
    ) => {
        if (modal.current) {
            modal.current.classList.remove(s["modal_visible"]);
            modal.current.classList.add(s["modal_hidden"]);
        }
        timer = setTimeout(() => {
            setVisibility(false);
        }, animationTiming);

        e.stopPropagation();
    };

    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            const passProps: IPassProps = { onCloseModal: onClose };
            interface IPassProps {
                onCloseModal: (
                    event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
                ) => void;
            }
            return React.cloneElement(child, passProps);
        }
        return child;
    });

    return visibility ? (
        <Portal>
            <div
                onClick={onClose}
                className={[
                    s.container,
                    s[visibility ? "container_visible" : "container_hidden"],
                    className,
                ].join(" ")}
            >
                <div
                    ref={modal}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    style={{ animationDuration: animationTiming + "ms" }}
                    className={[
                        s.modal,
                        s["modal_" + (visibility ? "visible" : "hidden")],
                    ].join(" ")}
                >
                    {closeBtnEnabled && (
                        <div className={s.close_btn} onClick={onClose}>
                            X
                        </div>
                    )}
                    {childrenWithProps}
                </div>
            </div>
        </Portal>
    ) : null;
};
