import { FC, useEffect, useState } from "react";
import s from "./edges.module.scss";
import { IEdges } from "interfaces";

interface IProps {
    onChange: (edges: IEdges) => void;
    padding: string;
    margin: string;
}

const mergeElements = (arr: string[], pattern: string): string => {
    let data = "";
    for (let i: number = 0; i < arr.length; i++) {
        data += ` ${arr[i]}${pattern}`;
    }
    return data;
};

export const Edges: FC<IProps> = ({ onChange, padding, margin }) => {
    const [edge, setEdge] = useState<IEdges>({
        padding:
            typeof padding === "string"
                ? padding.split("px").splice(0, 4)
                : ["0", "0", "0", "0"],
        margin:
            typeof margin === "string"
                ? margin.split("px").splice(0, 4)
                : ["0", "0", "0", "0"],
    });

    useEffect(() => {
        setEdge({
            padding:
                typeof padding === "string"
                    ? padding.split("px").splice(0, 4)
                    : ["0", "0", "0", "0"],
            margin:
                typeof margin === "string"
                    ? margin.split("px").splice(0, 4)
                    : ["0", "0", "0", "0"],
        });
    }, [padding, margin]);

    const onChangeEdges = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const edgeClone: IEdges = structuredClone(edge);
        const edgeType: string = e.target.name;

        edgeClone[edgeType][e.target.dataset.side] = e.target.value;

        const margin = mergeElements(edgeClone.margin, "px");
        const padding = mergeElements(edgeClone.padding, "px");
        onChange({ margin, padding });
        setEdge(edgeClone);
    };

    return (
        <div>
            Edge insets
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
        </div>
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
                    value={values[0].trim()}
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
                        value={values[3].trim()}
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
                        value={values[1].trim()}
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
                    value={values[2].trim()}
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
