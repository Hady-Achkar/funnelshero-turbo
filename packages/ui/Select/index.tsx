import {
    FC,
    useEffect,
    useState,
    useMemo,
    useLayoutEffect,
    Children,
    isValidElement,
    cloneElement,
} from "react";
import { Icon } from "../Icon";
import s from "./select.module.scss";

let id = 0;

export const Select: FC<IProps> = ({
    children,
    select = "",
    placeholder = "placeholder",
    icon,
    labelClassName = "",
    onChange,
    className = "",
    name,
}) => {
    const [show, setShow] = useState<boolean>(false);
    const [selected, setSelected] = useState<ISelected | null>(null);

    useEffect(() => {
        ++id;
    }, []);

    const containerId = id.toString(2);
    useLayoutEffect(() => {
        Children.forEach(children, (child) => {
            if (!isValidElement(child)) {
                return null;
            }
            if (
                child.props?.id === selected?.id ||
                child.props?.id === select
            ) {
                setSelected({
                    child,
                    id: child.props.id,
                });
            }
        });
    }, [select]);

    const childrenWithProps = useMemo(() => {
        return Children.map(children, (child) => {
            if (!isValidElement(child)) {
                return null;
            }
            const activeClassName: string =
                child.props?.id === selected?.id ? s.activeClassName : "";
            let classNames = `${s.option} ${activeClassName}`;

            if (child?.props?.className) {
                classNames += child?.props?.className;
            }
            const passProps = {
                className: classNames,
                onClick: () => onSelectOption(child),
                draggable: false,
            };
            return cloneElement(child, passProps);
        });
    }, [selected]);

    useEffect(() => {
        const onMouseDown = (e: MouseEvent) => {
            if (e.target && show) {
                const _TARGET = e?.target?.closest("." + s.container);

                if (_TARGET === null || _TARGET?.id !== containerId)
                    setShow(false);
            }
        };
        window.addEventListener("mousedown", onMouseDown);
        return () => window.removeEventListener("mousedown", onMouseDown);
    }, [show]);

    const onSelectOption = (child: React.ReactChild) => {
        setSelected({
            id: child.props.id,
            child: child,
        });

        onChange &&
            onChange({
                target: {
                    name,
                    value: child.props.id,
                },
            });

        setShow(false);
    };

    return (
        <div className={`${s.container} ${className}`} id={containerId}>
            <button
                className={`${s.label_container} ${labelClassName}`}
                onClick={() => {
                    setShow(!show);
                }}
            >
                <div className={s.label}>{selected?.child || placeholder}</div>
                {icon && typeof icon === "function" ? (
                    icon(show)
                ) : (
                    <Icon type={"ChevronDown"} feather={true} />
                )}
            </button>
            {show && <div className={s.body}>{childrenWithProps}</div>}
        </div>
    );
};

interface ISelected {
    id: string;
    child: React.ReactNode | React.ReactNode[];
}

interface IProps {
    children: React.ReactNode | React.ReactNode[];
    select?: string;
    optionClassName?: string;
    bodyClassName?: string;
    name?: string;
    labelClassName?: string;
    placeholder?: string;
    className?: string;
    icon?: (icon: React.ReactNode) => React.ReactNode | React.ReactNode[];
    onChange?: (e: ITarget) => void;
}
interface ITarget {
    target: {
        name: string | undefined;
        value: string;
    };
}
