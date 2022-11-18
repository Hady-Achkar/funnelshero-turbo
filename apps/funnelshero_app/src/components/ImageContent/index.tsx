import { ChangeEvent, FC } from "react";
import s from "./imageContent.module.scss";
import { Button, Input } from "ui";
import { Image } from "editor";
import { useEditor, Element } from "@craftjs/core";

export const ImageContent: FC = () => {
    const { connectors, actions, currentNodeId } = useEditor((node) => {
        const [currentNodeId]: Set<string> = node.events.selected;
        return {
            currentNodeId,
        };
    });

    const onChnageRadius = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        actions.setProp(currentNodeId, (props) => {
            return (props.radius = e.target.value);
        });
    };

    return (
        <div className={s.container}>
            <Input type={"number"} min={0} onChange={onChnageRadius} />

            <div className={["title16", s.title].join(" ")}>All results</div>
            <div className={s.elements}>
                <Button
                    className={s.btn}
                    ref={(ref: HTMLButtonElement) => {
                        connectors.create(
                            ref,
                            <Element
                                src={
                                    "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                                }
                                is={Image}
                                canvas
                            />
                        );
                    }}
                >
                    <img
                        src={
                            "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                        }
                        width={"100%"}
                        height={200}
                    />
                </Button>
                <Button
                    className={s.btn}
                    ref={(ref: HTMLButtonElement) => {
                        connectors.create(
                            ref,
                            <Element
                                src={
                                    "https://wallpapershome.com/images/pages/pic_h/21486.jpg"
                                }
                                is={Image}
                                canvas
                            />
                        );
                    }}
                >
                    <img
                        src={
                            "https://wallpapershome.com/images/pages/pic_h/21486.jpg"
                        }
                        width={"100%"}
                        height={200}
                    />
                </Button>
            </div>
        </div>
    );
};
