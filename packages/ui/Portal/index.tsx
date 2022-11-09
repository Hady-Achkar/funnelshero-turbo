import { FC } from "react";
import { createPortal } from "react-dom";

export const Portal: FC<IProps> = ({ children }) => {
    return createPortal(children, document.body);
};

interface IProps {
    children: React.ReactNode | React.ReactNode[];
}
