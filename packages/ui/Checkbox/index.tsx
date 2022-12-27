import { FC } from "react";
import s from "./checkbox.module.scss";

interface IProps {
    label: string;
    disabled?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void | undefined;
    name?: string;
    rounded?: boolean;
    className?: string;
    checked?: boolean;
}

export const Checkbox: FC<IProps> = ({
    label = '',
    disabled = false,
    onChange,
    name = "",
    rounded = false,
    className = "",
    checked = false,
    ...props
}) => {
    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e);
    };

    if (label) {
        return (
            <div className={s.container}>
                <label
                    className={[
                        s["form-control"],
                        disabled ? s["form-control--disabled"] : "",
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
            </div>
        )

    }
    return (
        <div className={s.container}>
            {/* <input
                type="checkbox"
                name={name}
                disabled={disabled}
                onChange={onChangeInput}
                defaultChecked={checked}
                {...props}
            /> */}
        </div>
    );
};
