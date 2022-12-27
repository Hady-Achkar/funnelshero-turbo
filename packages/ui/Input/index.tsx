import { useLayoutEffect, useState, FC, forwardRef, ReactElement } from "react";
import { Icon } from "../Icon";
import s from "./input.module.scss";

let typingTimer: NodeJS.Timeout; //timer identifier
let doneTypingInterval: number = 360;

const regexConfig: IRegex = {
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
    card: {
        validation: new RegExp(
            "^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\\d{3})\\d{11})$"
        ),
        errorMessage: "Invalid card number.",
    },
    expDate: {
        validation: new RegExp("^(0[1-9]|1[0-2])\\/?([0-9]{4}|[0-9]{2})$"),
        errorMessage: "Invalid expiry date.",
    },
    CVV: {
        validation: new RegExp("^[0-9]{3,4}$"),
        errorMessage: "Invalid CVV",
    },
    cardholder: {
        validation: new RegExp("^[a-zA-Z]+ [a-zA-Z]+$"),
        errorMessage: "Invalid name.",
    },
};

const validateField = (
    fieldName: TValidationKey,
    text: string | number
): boolean =>
    fieldName ? regexConfig[fieldName].validation.test(text.toString()) : false;

const cardNumberUpdater = (
    e: React.ChangeEvent<HTMLInputElement>,
    stateUpdater: (state: string) => void
) => {
    // for (let i: number = 0;)
};

export const Input: FC<IProps> = forwardRef<HTMLInputElement, IProps>(
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
            validationKey,
            frontIcon = <></>,
            buttons = [],
            buttonsArgs = {},
            min,
            max,
            disabled = false,
            variant = "",
            maxLength,
            style = {},
            children,
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
            if (validationKey && defaultValue) {
                setIsValid(
                    validateField(validationKey, defaultValue.toString())
                );
            }
            setIsValid(true);
        }, []);

        const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (maxLength && +e.target.value === maxLength) {
                e.stopPropagation();
            }

            let text: InputText | undefined;

            if (type === "number") {
                if (maxLength !== undefined) {
                    if (e.target.value.length > maxLength) {
                        return;
                    }
                }
                if (min !== undefined) {
                    if (min >= 0 && +e.target.value < 0) {
                        e.target.value = Math.abs(+e.target.value).toString();
                    }
                    text = e.target.value;
                }
                if (max !== undefined) {
                    if (+e.target.value >= max) {
                        return;
                    }
                }
                // if (validationKey === "card") {
                //     cardNumberUpdater(e, setDefaultValue);
                //     text = e.target.value;
                // }
            } else {
                text = e.target.value;
            }
            setDefaultValue(text || "");
            if (onFinish) {
                if (text) {
                    clearTimeout(typingTimer);
                    if (validationKey) {
                        if (validationKey === "email") {
                            e.target.value = e.target.value.toLowerCase();
                            text = e.target.value.toLowerCase();
                            setDefaultValue(e.target.value);
                        }
                        const _isValid = validateField(validationKey, text);
                        setIsValid(_isValid);

                        return (typingTimer = setTimeout(() => {
                            onFinish(e, _isValid);
                        }, doneTypingInterval));
                    }
                    return (typingTimer = setTimeout(
                        () => onFinish(e, false),
                        doneTypingInterval
                    ));
                }
            }

            if (validationKey && text) {
                if (validationKey === "email") {
                    e.target.value = e.target.value.toLowerCase();
                    text = e.target.value.toLowerCase();
                    setDefaultValue(e.target.value);
                }
                const _isValid = validateField(validationKey, text);
                setIsValid(_isValid);

                if (!_isValid) {
                    e.target.value = "";
                }
                return onChange(e, _isValid);
            }
            return onChange(e, false);
        };

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
                ref={ref as React.RefObject<HTMLDivElement>}
                style={{ width: "auto" }}
            >
                <label className={s.label_container}>
                    <>
                    {label && <div className={s.label}>{label}</div>}
                    <div
                        className={[
                            s.container,
                            disabled ? s.container_disabled : "",
                            variant === "rounded"
                                ? validationKey
                                    ? !isValid
                                        ? [s.rounded_error]
                                        : s.rounded
                                    : s.rounded
                                : "",
                            className,
                        ].join(" ")}
                    >
                            <>
                             {frontIcon }
                        <input
                            type={
                                type === "password"
                                    ? visibility
                                        ? "text"
                                        : "password"
                                    : type
                            }
                            maxLength={maxLength}
                            className={[
                                s.input,
                                validationKey && !isValid ? s.input_error : "",
                            ].join(" ")}
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
                            </>
                        </div>
                    </>
                </label>

                {validationKey && !isValid && (
                    <div className={[s.error].join(" ")}>
                        {errorMassage ||
                            (name && regexConfig[validationKey].errorMessage)}
                    </div>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

interface IValidator {
    validation: RegExp;
    errorMessage: string;
}

interface IRegex {
    password: IValidator;
    email: IValidator;
    phone: IValidator;
    card: IValidator;
    expDate: IValidator;
    CVV: IValidator;
    cardholder: IValidator;
}

type TValidationKey = keyof IRegex;
interface IProps {
    type?: string;
    name?: string | undefined;
    placeholder?: string;
    onFinish?: (
        e: React.ChangeEvent<HTMLInputElement>,
        isValid: boolean
    ) => void;
    onChange?: (
        e: React.ChangeEvent<HTMLInputElement>,
        isValid: boolean
    ) => void;
    className?: string;
    value?: string | number;
    label?: string;
    errorMassage?: string;
    validationKey?: TValidationKey;
    frontIcon?: ReactElement | FC | null;
    buttons?: IButtons[];
    buttonsArgs?: IButtonArguments;
    min?: number;
    max?: number;
    disabled?: boolean;
    variant?: string;
    maxLength?: number;
    style?: React.CSSProperties;
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
