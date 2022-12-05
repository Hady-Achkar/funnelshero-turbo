import React, {
    FC,
    useEffect,
    useState,
    useMemo,
    useLayoutEffect,
} from "react";
import { Icon } from "../Icon";
import s from "./select.module.scss";

export const Select: FC<IProps> = ({
    children,
    select = "",
    placeholder = "placeholder",
    icon,
    bodyClassName = "",
    labelClassName = "",
    onChange,
    name,
}) => {
    const [show, setShow] = useState<boolean>(false);
    const [selected, setSelected] = useState<ISelected | null>(null);

    useLayoutEffect(() => {
        React.Children.map(children, (child) => {
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
        return React.Children.map(children, (child) => {
            const activeClassName: string =
                child.props?.id === selected?.id ? s.activeClassName : "";
            let classNames = `${s.option} ${activeClassName}`;

            if (child?.props?.className) {
                classNames += child?.props?.className;
            }

            if (React.isValidElement(child)) {
                const passProps = {
                    className: classNames,
                    onClick: () => onSelectOption(child),
                    draggable: false,
                };
                return React.cloneElement(child, passProps);
            }
            return child;
        });
    }, [selected]);

    useEffect(() => {
        const onMouseDown = (e: MouseEvent) => {
            if (e.target instanceof Element && show) {
                const _TARGET = e?.target?.closest("." + s.container);
                if (_TARGET === null) setShow(false);
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
        <div className={s.container}>
            <div
                className={`${s.label_container} ${labelClassName}`}
                onClick={() => setShow(!show)}
            >
                <div className={s.label}>{selected?.child || placeholder}</div>
                {icon || <Icon type={"ChevronDown"} feather={true} />}
            </div>
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
    icon?: (icon: React.ReactNode) => React.ReactNode | React.ReactNode[];
    onChange?: (e: ITarget) => void;
}
interface ITarget {
    target: {
        name: string | undefined;
        value: string;
    };
}
