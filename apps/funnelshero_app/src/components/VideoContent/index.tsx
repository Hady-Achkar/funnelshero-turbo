import { FC, useEffect, useState } from "react";
import s from "./videoContent.module.scss";
import { Select, Icon, Button } from "ui";
import { Element, useEditor } from "@craftjs/core";
import myvideo from "assets/videos/vs.mp4";
import { EVideo } from "editor";
import { getVideoFrame, blobToBase64 } from "utils";
import { IVideoConvertType } from "interfaces";
import Image from "next/image";

interface IData {
    url?: string;
    duration?: number;
}
// const parseNumberToFloat = (num: number): number => {
//     const str = num.toString();
//     let i: number = 0;
//     let data: string = "";
//     while (i < num) {
//         if (str[i] !== ".") {
//             i++;
//         }
//     }
//     return 0;
// };

export const VideoContent: FC<IProps> = () => {
    const { connectors } = useEditor();
    const [data, setData] = useState<IData>({});

    useEffect(() => {
        getVideoFrame(myvideo, 1.2)
            .then((res: IVideoConvertType) => {
                blobToBase64(res.blob).then((result) => {
                    if (result) {
                        setData({
                            url: result as string,
                            duration: res.duration,
                        });
                    }
                });
            })
            .catch((e: Error) => console.log(e));
    }, []);

    const onChnageSelect = () => {};

    return (
        <div className={s.container}>
            VideoContent
            <Select
                placeholder={"Select"}
                select={"two"}
                onChange={onChnageSelect}
            >
                <div id="youtube" className={s.option}>
                    <Icon type={"Youtube"} feather={true} color={"red"} />
                    Youtube
                </div>
                <div id="two" className={s.option}>
                    <Icon type={"Vimeo"} color={"#1ab7ea"} />
                    Vimeo
                </div>
            </Select>
            <div>All results</div>
            {data ? (
                <div className={s.video_container}>
                    <Button
                        className={s.video_example}
                        ref={(ref: HTMLButtonElement) => {
                            connectors.create(
                                ref,
                                <Element
                                    is={EVideo}
                                    src={myvideo}
                                    enableControls={false}
                                    canvas
                                />
                            );
                        }}
                    >
                        {data.url && (
                            <Image
                                src={data.url}
                                objectFit={"cover"}
                                layout={"fill"}
                            />
                        )}
                        <div className={s.duration}>
                            {
                                data.duration
                                // && parseNumberToFloat(data.duration)
                            }
                        </div>
                    </Button>
                </div>
            ) : null}
        </div>
    );
};

interface IProps {}
