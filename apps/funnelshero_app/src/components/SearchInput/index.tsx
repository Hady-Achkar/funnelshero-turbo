import { FC } from "react";
import s from "./searchInput.module.scss";
import { Input, Icon } from "ui";

interface IProps {
    type?: string;
    name?: string;
    placeholder?: string;
    onFinish?: () => void;
    onChange?: () => void;
    className?: string;
    value?: string | number;
    label?: string;
    disabled?: boolean;
}

export const SearchInput: FC<IProps> = ({
    type = "text",
    name,
    placeholder,
    onFinish,
    className = "",
    value = "",
    label,
    onChange,
    ...props
}) => {
    return (
        <div className={s.container}>
            <Input
                buttons={[{ label: <Icon type={"Search"} /> }]}
                value={value}
                label={label}
                className={className}
                name={name}
                onChange={onChange}
                onFinish={onFinish}
                placeholder={placeholder}
                {...props}
            />
        </div>
    );
};
