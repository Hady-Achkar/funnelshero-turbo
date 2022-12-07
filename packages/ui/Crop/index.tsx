import { FC, useRef, useState, useEffect, useCallback } from "react";
import s from "./crop.module.scss";
import { Icon, Button } from "..";

export const Crop: FC<IProps> = ({ width, height, rotate = 0, onChange }) => {
    let startC = useRef<ICords>({});
    let _width = useRef<number>();
    let _height = useRef<number>();
    let _rotate = useRef<number>();
    const _side = useRef<string>("");
    const [isResizing, setIsResizing] = useState<boolean>(false);
    const [isRotating, setIsRotating] = useState<boolean>(false);
    const [dimensions, setDimensions] = useState<IDimensions>({
        width,
        height,
        rotate,
    });

    useEffect(() => {
        if (!isRotating && dimensions.rotate) {
            _rotate.current = dimensions.rotate;
        }
        if (isRotating) {
            const onMouseMove = (e: MouseEvent) => {
                onRotating(e);
            };
            window.addEventListener("mousemove", onMouseMove);
            return () => window.removeEventListener("mousemove", onMouseMove);
        }
    }, [isRotating]);

    useEffect(() => {
        if (!isResizing && dimensions.width && dimensions.height) {
            _width.current = dimensions.width;
            _height.current = dimensions.height;
        }
        if (isResizing) {
            const onMouseMove = (e: MouseEvent) => {
                updateSize(e);
            };
            window.addEventListener("mousemove", onMouseMove);
            return () => window.removeEventListener("mousemove", onMouseMove);
        }
    }, [isResizing]);

    useEffect(() => {
        const windowMouseUp = (e: MouseEvent): void => {
            if (
                startC.current.x &&
                startC.current.y &&
                dimensions.width &&
                dimensions.height
            ) {
                startC.current.x = e.pageX;
                startC.current.y = e.pageY;
            }
            setIsResizing(false);
            setIsRotating(false);
        };

        window.addEventListener("mouseup", windowMouseUp);
        return () => window.removeEventListener("mouseup", windowMouseUp);
    }, [isResizing, isRotating]);

    const updateSize = useCallback(
        (e: React.MouseEvent<HTMLDivElement>): void => {
            if (
                startC.current.x &&
                startC.current.y &&
                dimensions.width &&
                dimensions.height &&
                _width.current &&
                _height.current
            ) {
                let updatedWidth: number | undefined;
                let updatedHeight: number | undefined;

                switch (_side.current) {
                    case "right_bottom":
                        updatedWidth =
                            _width.current + e.pageX - startC.current.x;
                        updatedHeight =
                            _height.current + e.pageY - startC.current.y;
                        break;
                    case "right_top":
                        updatedWidth =
                            _width.current + e.pageX - startC.current.x;
                        updatedHeight =
                            _height.current + startC.current.y - e.pageY;
                        break;
                    case "left_top":
                        updatedWidth =
                            _width.current + startC.current.x - e.pageX;
                        updatedHeight =
                            _height.current + startC.current.y - e.pageY;
                        break;
                    case "left_bottom":
                        updatedWidth =
                            _width.current + startC.current.x - e.pageX;
                        updatedHeight =
                            _height.current + e.pageY - startC.current.y;
                        break;
                    default:
                        break;
                }

                if (updatedWidth && updatedHeight) {
                    onChange &&
                        onChange({
                            width: updatedWidth,
                            height: updatedHeight,
                            rotate: _rotate.current,
                        });
                    setDimensions({
                        width: updatedWidth,
                        height: updatedHeight,
                        rotate: _rotate.current,
                    });
                }
            }
        },
        []
    );

    const onRotating = (e: MouseEvent): void => {
        if (startC.current.x) {
            let center_x = 0 + width / 2;
            let center_y = 0 + height / 2;
            let mouse_x = e.pageX;
            let mouse_y = e.pageY;
            let radians = Math.atan2(mouse_x - center_x, mouse_y - center_y);
            let degree = radians * (180 / Math.PI) * -1 + 90;

            onChange &&
                onChange({
                    rotate: degree,
                    width: _width.current,
                    height: _height.current,
                });
            setDimensions((prev: IDimensions) => ({
                ...prev,
                rotate: degree,
            }));
        }
    };

    const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!(e.target instanceof HTMLDivElement)) return;

        setIsResizing(true);
        startC.current.x = e.pageX;
        startC.current.y = e.pageY;
        _side.current = e.target.dataset.side || "";
    };

    const onRotateMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        _side.current = "";
        startC.current.x = e.pageX;
        startC.current.y = e.pageY;
        setIsRotating(true);
    };

    const onMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
        _side.current = "";
        setIsResizing(false);
        setIsRotating(false);
    };

    return (
        <>
            <div
                className={s.rotate_btn}
                onMouseDown={onRotateMouseDown}
                onMouseUp={onMouseUp}
            >
                <Icon
                    type={"RotateCcw"}
                    feather={true}
                    stroke={"rgb(130, 206, 236)"}
                />
            </div>
            <div
                className={`${s.drag_element} ${s.left_top}`}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                data-side={"left_top"}
            />
            <div
                className={`${s.drag_element} ${s.left_bottom}`}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                data-side={"left_bottom"}
            />
            <div
                className={`${s.drag_element} ${s.right_top}`}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                data-side={"right_top"}
            />
            <div
                className={`${s.drag_element} ${s.right_bottom}`}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                data-side={"right_bottom"}
            />
        </>
    );
};

interface IProps {
    width: number;
    height: number;
    rotate: number;
    onChange: (dimensions: IDimensions) => void;
}

interface IDimensions {
    width?: number;
    height?: number;
    rotate?: number;
}

interface ICords {
    x?: number;
    y?: number;
}
