import { FC } from "react";
import s from "./checkbox.module.scss";

interface IProps {
    label?: string;
    disabled?: boolean;
    onChange?: (chacked: boolean, name: string | undefined) => void;
    name?: string;
    rounded?: boolean;
    className?: string;
}

export const Checkbox: FC<IProps> = ({
    label,
    disabled = false,
    onChange,
    name,
    rounded = false,
    className,
    ...props
}) => {
    const onChangeInput = (e: React.ChangeEventHandler<HTMLInputElement>) => {
        onChange && onChange(e.target.chacked, name);
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
                    {...props}
                />
            )}
        </div>
    );
};
