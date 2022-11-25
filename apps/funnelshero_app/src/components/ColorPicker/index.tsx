import React, { FC, useEffect, useState } from "react";
import Wheel from "@uiw/react-color-wheel";
import s from "./colorPicker.module.scss";
import { ColorConverter } from "utils";
import { Input } from "ui";
import { IRGB, IHSV, IHSVA } from "interfaces";

export const ColorPicker: FC<IProps> = ({
    color = "rgb(240,0,0)",
    onChange,
}) => {
    const [hsva, setHsva] = useState<IHSVA>({ h: 0, s: 0, v: 68, a: 1 });
    const [alpha, setAlpha] = useState<number>(100);
    const [format, setFormat] = useState<string>("rgb");

    useEffect(() => {
        if (color.includes("rgba")) {
            const [r, g, b] = color.split("(")[1].split(")")[0].split(",");
            const HSVColor: IHSV = ColorConverter.rgbToHsv(+r, +g, +b);

            if (HSVColor) setHsva({ ...HSVColor, a: 1 });
        } else if (color.includes("hex")) {
        }
    }, [color]);

    const onChangeAlpha = (e: React.ChangeEventHandler<HTMLInputElement>) => {
        setAlpha(+e?.target.value);
    };

    const onChangeHEX = (e: React.ChangeEventHandler<HTMLInputElement>) => {
        const hex_codes: string = e.target.value
            .match(/[a-f0-9]{6}/gi)
            ?.shift();

        const HSVColor = ColorConverter.hexToHsv(hex_codes);

        if (HSVColor) setHsva({ ...HSVColor, a: 1 });
    };

    return (
        <div className={s.container}>
            <Wheel
                color={hsva}
                onChange={(color) => {
                    setHsva(color.hsva);
                    // setProp((props) => (props.color = color.hexa));
                }}
            />
            <div className={s.block}>
                <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                >
                    <option value="rgb">rgb</option>
                    <option value="hex">hex</option>
                </select>
                {format === "rgb" ? (
                    <RGBInputGroup
                        onChange={(e) => {
                            console.log(e);
                        }}
                    />
                ) : (
                    <Input
                        type="text"
                        placeholder="color"
                        maxLength={6}
                        className={`${s.input} ${s.hex_input}`}
                        onChange={onChangeHEX}
                    />
                )}

                <div className={s.alpha_input}>
                    <Input
                        type="number"
                        min={0}
                        max={100}
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

const RGBInputGroup: FC<IRGBProps> = ({ onChange }) => {
    const [RGB, setRGB] = useState<IRGB>({ r: 0, g: 0, b: 0 });

    const onChangeColor = (e: React.ChangeEvent) => {
        const cloneRGB: IRGB = structuredClone(RGB);
        cloneRGB[e.target.name] = +e.target.value;

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
    onChange: () => void;
}

interface IRGBProps {
    onChange: (rgbaColor: IRGB) => void;
}
