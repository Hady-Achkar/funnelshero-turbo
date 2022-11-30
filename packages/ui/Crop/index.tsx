import { FC, useRef, useState, useEffect, useCallback } from "react";
import s from "./crop.module.scss";
import { Icon, Button } from "..";

export const Crop: FC<IProps> = ({ width, height, onChange }) => {
    let startC = useRef<ICords>({});
    let _width = useRef<number>();
    let _height = useRef<number>();
    const _side = useRef<string>("");
    const [isResizing, setIsResizing] = useState<boolean>(false);
    const [dimensions, setDimensions] = useState<IDimensions>({
        width,
        height,
    });

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
                setIsResizing(false);
            }
        };

        window.addEventListener("mouseup", windowMouseUp);
        return () => window.removeEventListener("mouseup", windowMouseUp);
    }, [isResizing]);

    const updateSize = useCallback((e: MouseEvent): void => {
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
                    updatedWidth = _width.current + e.pageX - startC.current.x;
                    updatedHeight =
                        _height.current + e.pageY - startC.current.y;
                    break;
                case "right_top":
                    updatedWidth = _width.current + e.pageX - startC.current.x;
                    updatedHeight =
                        _height.current + startC.current.y - e.pageY;
                    break;
                case "left_top":
                    updatedWidth = _width.current + startC.current.x - e.pageX;
                    updatedHeight =
                        _height.current + startC.current.y - e.pageY;
                    break;
                case "left_bottom":
                    updatedWidth = _width.current + startC.current.x - e.pageX;
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
                    });
                setDimensions({
                    width: updatedWidth,
                    height: updatedHeight,
                });
            }
        }
    }, []);

    const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!(e.target instanceof HTMLDivElement)) {
            return;
        }
        setIsResizing(true);
        startC.current.x = e.pageX;
        startC.current.y = e.pageY;
        _side.current = e.target.dataset.side || "";
    };

    const onMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
        _side.current = "";
        setIsResizing(false);
    };

    return (
        <>
            {/* <Button>
                <Icon type={"RotateCcw"} feather={true} />
            </Button> */}
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
    onChange: (dimensions: IDimensions) => void;
}

interface IDimensions {
    width?: number;
    height?: number;
}

interface ICords {
    x?: number;
    y?: number;
}
