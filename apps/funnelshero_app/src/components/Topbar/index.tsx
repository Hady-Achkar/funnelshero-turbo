import React from "react";
import s from "./topbar.module.scss";
import { Button, Icon } from "ui";
import { Submit } from "components";
import NextImage from "next/image";

export const Topbar = () => {
    return (
        <div className={s.container}>
            <Button className={s.back_btn} goBack={true}>
                <>
                      <NextImage
                    src={"/logo.png"}
                    layout={"fixed"}
                    alt="logo"
                    width="56"
                    height="56"
                />
                <Icon type={"ChevronLeft"} fill={"white"} stroke={"blue"} />
                    Home
                </>
            </Button>
            <div className={s.toggle_container}>
                <Button label={<Icon type={"Settings"} fill={"white"} />} />
                <Submit label={"Preview"} />
                <Submit label={"Publish"} />
            </div>
        </div>
    );
};
