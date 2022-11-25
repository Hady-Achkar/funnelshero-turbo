import { useLayoutEffect, useState, FC, forwardRef, ReactElement } from "react";
import { Icon } from "..";
import s from "./input.module.scss";

let typingTimer: NodeJS.Timeout; //timer identifier
let doneTypingInterval: number = 360;

const regex: IRegex = {
    //min 8 character, 1 number, 1 UPPERCASE, 1 lowercase, 1 special character
    password: {
        validation: new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
        ),
        errorMessage:
            "Password must be at least 8 characters long, contains 1 UPPERCASE 1 lowercase 1 special charecter.",
    },
    // @, 0 UPPERCASE, only com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)
    email: {
        validation: new RegExp(
            "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])(?:[A-z])?\\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum|mail)\\b"
        ),
        errorMessage: "Invalid email.",
    },
    phone: {
        validation: new RegExp(
            /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/
        ),
        errorMessage: "Invalid phone number.",
    },
};

const validateField = (
    fieldName: string | undefined,
    text: string | number
): boolean =>
    fieldName ? regex[fieldName].validation.test(text.toString()) : false;

export const Input: FC<IProps> = forwardRef<HTMLButtonElement, IProps>(
    (
        {
            type = "text",
            name,
            placeholder,
            onFinish,
            className = "",
            value = "",
            label,
            errorMassage = null,
            onChange = () => {},
            validate = false,
            frontIcon = <></>,
            buttons = [],
            buttonsArgs = {},
            min,
            max,
            disabled = false,
            rounded = false,
            maxLength,
            ...props
        },
        ref
    ) => {
        const [visibility, setVisibility] = useState<boolean>(false);
        const [isValid, setIsValid] = useState<boolean>(false);
        const [defaultValue, setDefaultValue] = useState<string | number>(
            value
        );

        useLayoutEffect(() => setDefaultValue(value), [value]);

        useLayoutEffect(() => {
            if (validate && defaultValue) {
                name &&
                    setIsValid(validateField(name, defaultValue.toString()));
                // return onChange && onChange(text, validateField(name, defaultValue))
            }
            setIsValid(true);
        }, []);

        const onTextChange = (
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
            let text: InputText | undefined;

            if (type === "number") {
                if (min !== undefined) {
                    if (min >= 0 && +e.target.value < 0) {
                        e.target.value = "0";
                    }
                    text = e.target.value;
                }
                if (max !== undefined) {
                    if (+e.target.value > max) {
                        e.target.value = max.toString();
                        text = e.target.value;
                    }
                }
            } else {
                text = e.target.value;
            }
            setDefaultValue(text || "");

            if (onFinish) {
                if (text) {
                    clearTimeout(typingTimer);
                    if (validate) {
                        const _isValid = validateField(name, text);

                        setIsValid(_isValid);
                        return (typingTimer = setTimeout(
                            () => onFinish(e, label, _isValid),
                            doneTypingInterval
                        ));
                    }
                    return (typingTimer = setTimeout(
                        () => onFinish(e, label),
                        doneTypingInterval
                    ));
                }
            }

            if (validate && text) {
                console.log(text);
                const _isValid = validateField(name, text);
                setIsValid(_isValid);
                if (_isValid) {
                    return onChange(e, label, _isValid);
                } else {
                    return onChange({
                        target: {
                            name: e.target.name,
                            value: false,
                        },
                    });
                }
            }
            return onChange(e, label);
        };

        if (type === "textarea") {
            return (
                <div
                    className={[s.container, className].join(" ")}
                    ref={ref as React.RefObject<HTMLDivElement>}
                >
                    <textarea
                        className={[s.container, s.textarea].join(" ")}
                        name={name}
                        placeholder={placeholder}
                        rows={8}
                        onChange={onTextChange}
                        disabled={disabled}
                        {...props}
                    />
                </div>
            );
        }

        if (type === "file") {
            return (
                <label
                    className={s.label_container}
                    ref={ref as React.RefObject<HTMLLabelElement>}
                >
                    <div className={[s.container, className].join(" ")}>
                        {placeholder}
                        <input
                            type="file"
                            onChange={onTextChange}
                            disabled={disabled}
                            {...props}
                        />
                    </div>
                </label>
            );
        }

        return (
            <div
                style={{
                    flex: 1,
                    width: "auto",
                }}
            >
                <label
                    className={s.label_container}
                    ref={ref as React.RefObject<HTMLLabelElement>}
                >
                    {label && <div className={s.label}>{label}</div>}
                    <div
                        className={[
                            s.container,
                            disabled ? s.container_disabled : "",
                            rounded
                                ? validate
                                    ? !isValid
                                        ? [s.rounded_error]
                                        : s.rounded
                                    : s.rounded
                                : "",
                            className,
                        ].join(" ")}
                    >
                        {frontIcon}
                        <input
                            type={
                                type === "password"
                                    ? visibility
                                        ? "text"
                                        : "password"
                                    : type
                            }
                            maxLength={maxLength}
                            className={[s.input].join(" ")}
                            placeholder={placeholder}
                            value={defaultValue}
                            name={name}
                            onChange={(e) => onTextChange(e)}
                            disabled={disabled}
                            {...props}
                        />
                        {type === "password" && (
                            <span onClick={() => setVisibility(!visibility)}>
                                <Icon
                                    feather={true}
                                    type={visibility ? "EyeOff" : "Eye"}
                                    color={"#94A3B8"}
                                />
                            </span>
                        )}
                        {buttons &&
                            buttons.map(({ onClick, ...args }, index) => {
                                return (
                                    <button
                                        className={s.input_button}
                                        key={index}
                                        onClick={() => {
                                            onClick &&
                                                onClick({
                                                    value: defaultValue,
                                                    setValue: setDefaultValue,
                                                    isValid,
                                                    ...buttonsArgs,
                                                });
                                        }}
                                        {...args}
                                    >
                                        {args?.label}
                                    </button>
                                );
                            })}
                    </div>
                </label>

                {validate && !isValid && (
                    <div className={[s.error].join(" ")}>
                        {errorMassage || (name && regex[name].errorMessage)}
                    </div>
                )}
            </div>
        );
    }
);

interface IValidator {
    validation: RegExp;
    errorMessage: string;
}

interface IRegex {
    [key: string]: IValidator;
}

interface ITarget {
    target: {
        name: string;
        value: any;
    };
}

interface IProps {
    type?: string;
    name?: string | undefined;
    placeholder?: string;
    onFinish?: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | ITarget,
        label?: string,
        isValid?: boolean
    ) => void;
    onChange?: (
        e?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | ITarget,
        label?: string,
        isValid?: boolean
    ) => void;
    className?: string;
    value?: string | number;
    label?: string;
    errorMassage?: string;
    validate?: boolean;
    frontIcon?: ReactElement | FC | null;
    buttons?: IButtons[];
    buttonsArgs?: IButtonArguments;
    min?: number;
    max?: number;
    disabled?: boolean;
    rounded?: boolean;
    maxLength?: number;
}

interface IButtons {
    label: string | JSX.Element;
    onClick?: (obj: IOnClick) => void;
}

interface IOnClick {
    value?: string | number;
    setValue?: React.Dispatch<React.SetStateAction<string | number>>;
    isValid?: boolean;
    buttonsArgs?: React.HTMLProps<HTMLButtonElement> | IButtonArguments;
}

interface IButtonArguments {
    [key: string]: any;
}

type InputText = number | string | undefined;
