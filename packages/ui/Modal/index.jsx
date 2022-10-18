import { FC, useRef, useLayoutEffect, useState, useEffect } from "react";
import s from "./modal.module.css";
import { Button, Icon } from "../../core";
import { createPortal } from "react-dom";

const root = document.documentElement;

window.addEventListener("click", (e) => {
    const target = e.target.closest(".modal-handler");
    if (target) {
        root.style.setProperty("--mouse-x", e.pageX + "px");
        root.style.setProperty("--mouse-y", e.pageY + "px");
    }
});

let timer;

export const Modal = ({
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

    const onClose = (e) => {
        if (modal.current) {
            modal.current.classList.remove(s["modal_visible"]);
            modal.current.classList.add(s["modal_hidden"]);
        }
        timer = setTimeout(() => {
            setVisibility(false);
        }, animationTiming);

        e.stopPropagation();
    };

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
                        <Button
                            className={s.close_btn}
                            onClick={onClose}
                            label={<Icon type={"X"} size={22} feather={true} />}
                        />
                    )}
                    {children}
                </div>
            </div>
        </Portal>
    ) : null;
};

const Portal = ({ children }) => {
    return createPortal(children, document.getElementById("root"));
};
