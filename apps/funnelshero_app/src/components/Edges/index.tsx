import { FC, useState } from "react";
import s from "./edges.module.scss";
import { IEdges } from "interfaces";

interface IProps {
    onChange: (edges: IEdges) => void;
}

const mergeElements = (arr: string[], pattern: string): string => {
    let data = "";
    for (let i: number = 0; i < arr.length; i++) {
        data += ` ${arr[i]}${pattern}`;
    }
    return data;
};

export const Edges: FC<IProps> = ({ onChange }) => {
    const [edge, setEdge] = useState<IEdges>({
        padding: ["0", "0", "0", "0"],
        margin: ["0", "0", "0", "0"],
    });

    const onChangeEdges = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const edgeClone = structuredClone(edge);
        const edgeType: string = e.target.name;

        edgeClone[edgeType][e.target.dataset.side] = e.target.value;

        const margin = mergeElements(edgeClone.margin, "px");
        const padding = mergeElements(edgeClone.padding, "px");
        onChange({ margin, padding });
        setEdge(edgeClone);
    };

    return (
        <Block
            borderWidth={6}
            name={"margin"}
            onChange={onChangeEdges}
            values={edge.margin}
        >
            <Block
                borderWidth={2}
                name={"padding"}
                onChange={onChangeEdges}
                values={edge.padding}
            />
        </Block>
    );
};

const Block: FC<IBlockProps> = ({
    values,
    children,
    borderWidth,
    name,
    onChange,
}) => {
    return (
        <div
            className={s.container}
            style={{ borderWidth: borderWidth + "px" }}
        >
            <div className={s.block}>
                <input
                    type="number"
                    name={name}
                    placeholder={name.charAt(0)}
                    className={s.input}
                    onChange={onChange}
                    data-side={"0"}
                    value={values[0]}
                />
            </div>
            <div className={s.row}>
                <div className={s.block}>
                    <input
                        type="number"
                        name={name}
                        placeholder={name.charAt(0)}
                        className={s.input}
                        onChange={onChange}
                        data-side={"3"}
                        value={values[3]}
                    />
                </div>
                <div className={s.padding_container}>{children}</div>
                <div className={s.block}>
                    <input
                        type="number"
                        name={name}
                        placeholder={name.charAt(0)}
                        className={s.input}
                        onChange={onChange}
                        data-side={"1"}
                        value={values[1]}
                    />
                </div>
            </div>
            <div className={s.block}>
                <input
                    type="number"
                    name={name}
                    placeholder={name.charAt(0)}
                    className={s.input}
                    onChange={onChange}
                    data-side={"2"}
                    value={values[2]}
                />
            </div>
        </div>
    );
};

interface IBlockProps {
    children?: React.ReactNode | React.ReactNode[];
    borderWidth?: number;
    name: string;
    onChange?: React.ChangeEventHandler;
    values: string[];
}
