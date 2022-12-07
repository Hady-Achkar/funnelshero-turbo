export * from "./colorConverter";
export * from "./craft";
import { IVideoConvertType } from "utils";

export const mergeElements = (array: string[] | number[], pattern: string) => {
    let data: string = "";
    for (let i: number = 0; i < array.length; i++) {
        data += `${array[i]}${pattern} `;
    }
    return data;
};

export const getHEXColor = (color: string): string | undefined => {
    return color.match(/[a-f0-9]{6}/gi)?.shift();
};

export const HEXAlpha = (color: string, opacity: number): string => {
    const _opacity: number = Math.round(
        Math.min(Math.max(opacity || 1, 0), 1) * 255
    );
    return color + _opacity.toString(16).toUpperCase();
};

export function getVideoFrame(
    file: string,
    seekTo: number = 0.0
): IVideoConvertType {
    return new Promise((resolve, reject) => {
        const videoPlayer = document.createElement("video");
        videoPlayer.setAttribute("src", file);
        videoPlayer.load();
        videoPlayer.addEventListener("error", (ex) => {
            reject("error when loading video file", ex);
        });
        // load metadata of the video to get video duration and dimensions
        videoPlayer.addEventListener("loadedmetadata", () => {
            if (videoPlayer.duration < seekTo) {
                reject("video is too short.");
                return;
            }
            // delay seeking or else 'seeked' event won't fire on Safari
            setTimeout(() => {
                videoPlayer.currentTime = seekTo;
            }, 200);
            // extract video thumbnail once seeking is complete
            videoPlayer.addEventListener("seeked", () => {
                // define a canvas to have the same dimension as the video
                const canvas: HTMLCanvasElement =
                    document.createElement("canvas");
                canvas.width = videoPlayer.videoWidth;
                canvas.height = videoPlayer.videoHeight;
                // draw the video frame to canvas
                const ctx = canvas.getContext("2d");
                ctx?.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
                // return the canvas image as a blob

                ctx?.canvas.toBlob(
                    (blob) => {
                        resolve({ blob, duration: videoPlayer.duration });
                    },
                    "image/jpeg",
                    0.75
                );
            });
        });
    });
}

export function blobToBase64(blob: Blob) {
    return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
}
