import { FC } from "react";
import { createPortal } from "react-dom";

export const Portal: FC = ({ children }) => {
    return createPortal(children, document.body);
};
