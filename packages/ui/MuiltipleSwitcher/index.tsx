import {
    ReactNode,
    FC,
    useState,
    useRef,
    Fragment,
    useLayoutEffect,
    useMemo,
} from "react";
import s from "./muiltipleSwitcher.module.scss";

const calculateMargin = (
    data: IData[],
    index: number,
    containerPadding: number,
    paddingBetweenBtns: number,
    divider: boolean
) => {
    if (divider) {
        if (index === 0) {
            return `0 ${containerPadding / 2}px 0 0`;
        } else if (index === data.length - 1) {
            return `0 0 0 ${containerPadding / 2}px`;
        } else {
            return `0  ${containerPadding / 2}px`;
        }
    } else {
        if (paddingBetweenBtns) {
            if (index !== 0 && index !== data.length - 1) {
                return `0 ${paddingBetweenBtns}px`;
            } else {
                if (index === 0) {
                    return `0 ${paddingBetweenBtns}px 0 0`;
                } else {
                    return `0 0 0 ${paddingBetweenBtns}px `;
                }
            }
        }
        if (index !== data.length - 1) {
            return `0 ${containerPadding}px 0 0`;
        }
    }
};

const colId = (arr: IData[]) => {
    let a = "";
    for (let i = 0; i < arr.length; i++) {
        a += arr[i].id;
    }
    return a;
};

export interface IMuiltipleSwitcherEventType {
    target: {
        label: ReactNode | string | JSX.Element;
        value: string | number;
        index: number;
        name: string | undefined;
    };
}

export const MuiltipleSwitcher: FC<IProps> = ({
    data = [],
    onChange = () => {},
    containerPadding = 0,
    paddingBetweenBtns = 0,
    divider = false,
    dividerClass = "",
    containerClass = "",
    btnsClass = "",
    name,
    disabled = false,
    animatedClassName = "",
    selectedBtnClass = "",
    defaultSelected,
}) => {
    const containerId = useMemo<string>(() => colId(data), [data]);
    const [selected, setSelected] = useState<ISelected>({
        id: data[0].id,
        label: data[0].label,
        index: 0,
    });
    const container = useRef<HTMLDivElement>(null);
    const animatedBlock = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (animatedBlock.current && !disabled) {
            setSelected({
                id: data[0].id,
                label: data[0].label,
                index: 0,
            });
            animatedBlock.current.style.transform = `translateX(0px)`;
            animatedBlock.current.style.width = "0px";
            animatedBlock.current.style.height = "0px";
        }
    }, [containerId, disabled]);

    useLayoutEffect(() => {
        if (animatedBlock.current) {
            if (
                animatedBlock.current.classList.contains(s.animation) === false
            ) {
                animatedBlock.current.classList.add(s.animation);
            }
            onChange({
                target: {
                    label: selected?.label,
                    value: selected?.id,
                    index: selected?.index,
                    name,
                },
            });
            animate(selected?.id);
        }
    }, [selected]);

    const animate = (id: number | string) => {
        if (container.current) {
            const switchBtn: HTMLDivElement | null =
                container.current.querySelector("#switchBtn" + id);
            if (switchBtn) {
                const btn: DOMRect = switchBtn.getBoundingClientRect();
                if (animatedBlock?.current) {
                    animatedBlock.current.style.width = btn.width + "px";
                    animatedBlock.current.style.height = btn.height + "px";

                    const x: number =
                        btn.left -
                        container.current.getBoundingClientRect().left;
                    animatedBlock.current.style.transform = `translateX(${x}px)`;
                }
            }
        }
    };

    const onSelect = (
        label: string | JSX.Element | ReactNode,
        id: number | string,
        index: number
    ) => {
        setSelected({ id, label, index });
    };

    return (
        <div
            className={[s.container, containerClass].join(" ")}
            id={containerId}
            style={{ padding: containerPadding }}
            ref={container}
        >
            {data.map((item, index) => {
                return (
                    <Fragment key={item.id}>
                        <button
                            onClick={() => onSelect(item.label, item.id, index)}
                            id={"switchBtn" + item.id}
                            style={{
                                margin: calculateMargin(
                                    data,
                                    index,
                                    containerPadding,
                                    paddingBetweenBtns,
                                    divider
                                ),
                            }}
                            className={[
                                s.btn,
                                selected?.index === index
                                    ? selectedBtnClass || s["btn_selected"]
                                    : "",
                                btnsClass,
                            ].join(" ")}
                            disabled={disabled}
                        >
                            <span>{item.label}</span>
                        </button>
                        {divider && index !== data.length - 1 ? (
                            <div
                                className={[s.divider, dividerClass].join(" ")}
                            />
                        ) : (
                            <></>
                        )}
                    </Fragment>
                );
            })}
            {!disabled ? (
                <div
                    className={[s.animation_block, animatedClassName].join(" ")}
                    ref={animatedBlock}
                />
            ) : null}
        </div>
    );
};

interface IData {
    id: string;
    label: JSX.Element | string;
}

interface ISelected {
    id: string | number;
    label: JSX.Element | string | ReactNode;
    index: number;
}

interface IProps {
    data: IData[];
    onChange?(e: IMuiltipleSwitcherEventType): void;
    containerPadding?: number;
    paddingBetweenBtns?: number;
    divider?: boolean;
    dividerClass?: string;
    containerClass?: string;
    btnsClass?: string;
    name?: string;
    disabled?: boolean;
    animatedClassName?: string;
    selectedBtnClass?: string;
    defaultSelected?: string;
}
