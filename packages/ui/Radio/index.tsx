import { FC } from "react";
import s from "./radio.module.scss";

interface IProps {
    label?: string;
    onChange?: () => void;
    name: string;
    className?: string;
}

export const Radio: FC<IProps> = ({ label, className, onChange, name }):JSX.Element => {
    return (
        <label className={[s["l-radio"], className].join(" ")}>
            <input type="radio" name={name} tab-index="3" onChange={onChange} />
            {label && <span>{label}</span>}
        </label>
    );
};
