import { useEffect, useState, FC } from "react";
import s from "./borderRadius.module.scss";
import { Icon, Input } from "ui";
import { mergeElements } from "utils";

export const BorderRadius: FC<IProps> = ({ onChange, borderRadius }) => {
    const [borders, setBorders] = useState<string[]>(
        borderRadius?.split("px").splice(0, 4) || ["0", "0", "0", "0"]
    );

    useEffect(() => {
        setBorders(
            borderRadius?.split("px").splice(0, 4) || ["0", "0", "0", "0"]
        );
    }, [borderRadius]);

    const onChangeBorder = (e: React.ChangeEvent<HTMLInputElement>) => {
        const bordersClone = structuredClone(borders);

        bordersClone[e.target.name] = e.target.value || "0";

        onChange(mergeElements(bordersClone, "px"));
        setBorders(bordersClone);
    };

    const onChangeAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        const _BORDES = Array.from({ length: 4 }, () => e.target.value || "0");

        onChange(mergeElements(_BORDES, "px"));
        setBorders(_BORDES);
    };

    return (
        <div className={s.container}>
            Corner radius
            <div className={s.row}>
                <Icon type={"BorderRadius"} className={s.icon} />
                <Input
                    type="number"
                    placeholder={"90°"}
                    className={s.input}
                    onChange={onChangeAll}
                    name={"3"}
                    min={0}
                />
            </div>
            <div className={`${s.row}`}>
                <Icon type={"AllBorderRadius"} className={s.icon} />
                <Input
                    type="number"
                    placeholder={"90°"}
                    className={s.input}
                    onChange={onChangeBorder}
                    name={"0"}
                    value={borders[0].trim()}
                    min={0}
                />
                <Input
                    type="number"
                    placeholder={"90°"}
                    className={s.input}
                    onChange={onChangeBorder}
                    name={"1"}
                    value={borders[1].trim()}
                    min={0}
                />
                <Input
                    type="number"
                    placeholder={"90°"}
                    className={s.input}
                    onChange={onChangeBorder}
                    name={"2"}
                    value={borders[2].trim()}
                    min={0}
                />
                <Input
                    type="number"
                    placeholder={"90°"}
                    className={s.input}
                    onChange={onChangeBorder}
                    name={"3"}
                    value={borders[3].trim()}
                    min={0}
                />
            </div>
        </div>
    );
};

interface IProps {
    onChange: (borders: string, isValid: boolean) => void;
    borderRadius: string;
}
