import { useEffect, useState, FC } from "react";
import s from "./borderRadius.module.scss";
import { Icon, Input } from "ui";

export const BorderRadius: FC<IProps> = ({ onChange }) => {
    const [borders, setBorders] = useState<string[]>(["0", "0", "0", "0"]);

    useEffect(() => {
        setBorders(["0", "0", "0", "0"]);
    }, []);

    const onChangeBorder = (e: React.ChangeEvent<HTMLInputElement>) => {
        const bordersClone = structuredClone(borders);
        const bordersType: string = e.target.name;

        bordersClone[e.target.name] = e.target.value;
        onChange(borders);
        setBorders(bordersClone);
    };

    const onChangeAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBorders(Array.from({ length: 4 }, (_, x) => e.target.value));
    };

    return (
        <div className={s.container}>
            Corner radius
            <div className={s.row}>
                <Icon type={"BorderRadius"} />
                <Input
                    type="number"
                    placeholder={"90°"}
                    className={s.input}
                    onChange={onChangeAll}
                    name={"3"}
                />
            </div>
            <div className={`${s.row} ${s.multiple_border_sides_container}`}>
                <Icon type={"BorderRadius"} />
                <Input
                    type="number"
                    placeholder={"90°"}
                    className={s.input}
                    onChange={onChangeBorder}
                    name={"0"}
                    value={borders[3].trim()}
                />
                <Input
                    type="number"
                    placeholder={"90°"}
                    className={s.input}
                    onChange={onChangeBorder}
                    name={"1"}
                    value={borders[3].trim()}
                />
                <Input
                    type="number"
                    placeholder={"90°"}
                    className={s.input}
                    onChange={onChangeBorder}
                    name={"2"}
                    value={borders[3].trim()}
                />
                <Input
                    type="number"
                    placeholder={"90°"}
                    className={s.input}
                    onChange={onChangeBorder}
                    name={"3"}
                    value={borders[3].trim()}
                />
            </div>
        </div>
    );
};

interface IProps {
    onChange: (borders: string[]) => void;
}
