import { FC } from "react";
import s from "./checkbox.module.scss";

interface IProps {
    label?: string | undefined;
    disabled?: boolean;
    onChange?: (chacked: boolean, name: string | undefined) => void | undefined;
    name?: string;
    rounded?: boolean;
    className?: string;
    checked?: boolean;
}

export const Checkbox: FC<IProps> = ({
    label,
    disabled = false,
    onChange,
    name = "",
    rounded = false,
    className = "",
    checked = false,
    ...props
}) => {
    const onChangeInput = (e: React.ChangeEventHandler<HTMLInputElement>) => {
        onChange && onChange(e);
    };

    return (
        <div className={s.container}>
            {label ? (
                <label
                    className={[
                        s["form-control"],
                        disabled ? s["form-control--disabled"] : "",
                        // rounded ? s["checkbox-round"] : "",
                        className,
                    ].join(" ")}
                >
                    <input
                        type="checkbox"
                        name={name}
                        defaultChecked={checked}
                        disabled={disabled}
                        onChange={onChangeInput}
                    />
                    <span>{label} </span>
                </label>
            ) : (
                <input
                    type="checkbox"
                    name={name}
                    disabled={disabled}
                    onChange={onChangeInput}
                    defaultChecked={checked}
                    {...props}
                />
            )}
        </div>
    );
};
