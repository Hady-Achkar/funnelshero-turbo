import React, { FC, useEffect, useState } from "react";
import Wheel from "@uiw/react-color-wheel";
import s from "./colorPicker.module.scss";
import { ColorConverter, getHEXColor, HEXAlpha } from "utils";
import { Input } from "ui";
import { IRGB, IHSV, IHSVA } from "interfaces";
import { TypeInputChangeEvent } from "types";

export const ColorPicker: FC<IProps> = ({
    color = "rgba(0,0,0,0.5)",
    onChange,
}) => {
    const [hsva, setHsva] = useState<IHSVA>({ h: 0, s: 0, v: 68, a: 1 });
    const [alpha, setAlpha] = useState<number>(100);
    const [format, setFormat] = useState<string>("rgb");

    useEffect(() => {
        if (typeof color === "string") {
            if (color?.includes("rgba")) {
                const [r, g, b, a] = color
                    .split("(")[1]
                    .split(")")[0]
                    .split(",");
                const HSVColor: IHSV = ColorConverter.rgbToHsv(+r, +g, +b);

                if (HSVColor) {
                    setHsva({ ...HSVColor, a: 1 });
                    setAlpha(+a * 100);
                }
            } else if (color?.includes("#")) {
                let _COLOR = color.slice(1);
                if (_COLOR.length === 3) {
                    _COLOR = `${_COLOR[0]}${_COLOR[0]}${_COLOR[1]}${_COLOR[1]}${_COLOR[2]}${_COLOR[2]}`;
                }

                const HSVColor = ColorConverter.hexToHsv(_COLOR);
                if (HSVColor) {
                    setHsva({ ...HSVColor, a: 1 });
                }
            }
        }
    }, []);

    useEffect(() => {
        if (format === "rgb") {
            const RGB: IRGB = ColorConverter.hsvToRgb(hsva.h, hsva.s, hsva.v);

            onChange(`rgba(${RGB.r}, ${RGB.g}, ${RGB.b}, ${0.01 * alpha})`);
        } else if (format === "#") {
            const HEX: string = ColorConverter.hsvToHex(hsva.h, hsva.s, hsva.v);
            onChange(HEXAlpha(HEX, 0.01 * alpha));
        }
    }, [alpha, format, hsva]);

    const onChangeAlpha = (e: TypeInputChangeEvent) => {
        setAlpha(+e?.target.value);
    };

    const onChangeHEX = (e: TypeInputChangeEvent) => {
        const hex_codes: string | undefined = getHEXColor(e.target.value);
        if (hex_codes) {
            const HSVColor = hex_codes && ColorConverter.hexToHsv(hex_codes);

            if (HSVColor) setHsva({ ...HSVColor, a: 1 });
        }
    };

    const onChangeRgb = (rgb: IRGB) => {
        const HSVColor = ColorConverter.rgbToHsv(rgb.r, rgb.g, rgb.b);
        setHsva({ ...HSVColor, a: 1 });
    };

    return (
        <div className={s.container}>
            <Wheel
                width={160}
                height={160}
                color={hsva}
                onChange={(color) => {
                    setHsva(color.hsva);
                }}
            />
            <div className={s.block}>
                <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                >
                    <option value="rgb">RGB</option>
                    <option value="#">HEX</option>
                </select>
                {format === "rgb" ? (
                    <RGBInputGroup
                        onChange={onChangeRgb}
                        value={ColorConverter.hsvToRgb(hsva.h, hsva.s, hsva.v)}
                    />
                ) : (
                    <Input
                        type="text"
                        placeholder="#HEX"
                        maxLength={6}
                        className={`${s.input} ${s.hex_input}`}
                        onChange={onChangeHEX}
                        value={ColorConverter.hsvToHex(
                            hsva.h,
                            hsva.s,
                            hsva.v
                        ).slice(1)}
                    />
                )}

                <div className={s.alpha_input}>
                    <Input
                        type="number"
                        min={0}
                        max={100}
                        maxLength={3}
                        value={alpha}
                        onChange={onChangeAlpha}
                        placeholder="alpha"
                        className={`${s.input}`}
                    />
                </div>
            </div>
        </div>
    );
};

const RGBInputGroup: FC<IRGBProps> = ({
    onChange,
    value = { r: 0, g: 0, b: 0 },
}) => {
    const [RGB, setRGB] = useState<IRGB>(value);

    useEffect(() => {
        setRGB(value);
    }, [value]);

    const onChangeColor = (e?: TypeInputChangeEvent) => {
        const cloneRGB: IRGB = structuredClone(RGB);
        if (e) {
            cloneRGB[e.target.name as keyof typeof cloneRGB] = +e.target.value;
        }
        onChange(cloneRGB);
        setRGB(cloneRGB);
    };

    return (
        <>
            <Input
                type={"number"}
                className={`${s.rgba_input} ${s.input}`}
                maxLength={3}
                placeholder={"r"}
                min={0}
                max={255}
                onChange={onChangeColor}
                name={"r"}
                value={RGB.r}
            />
            <Input
                type={"number"}
                className={`${s.rgba_input} ${s.input}`}
                maxLength={3}
                placeholder={"g"}
                min={0}
                max={255}
                onChange={onChangeColor}
                name={"g"}
                value={RGB.g}
            />
            <Input
                type={"number"}
                className={`${s.rgba_input} ${s.input}`}
                maxLength={3}
                placeholder={"b"}
                min={0}
                max={255}
                onChange={onChangeColor}
                name={"b"}
                value={RGB.b}
            />
        </>
    );
};

interface IProps {
    color?: string;
    name?: string;
    onChange: (color: string) => void;
}

interface IRGBProps {
    onChange: (rgbaColor: IRGB) => void;
    value: IRGB;
}
