import Image from "next/image";
import React from "react";
import { Icon } from "ui";
import { Submit } from "..";
import s from "./style.module.scss";
import AvatarImage from "../../assets/images/Avatar.png";

export const ProfileTopBar = () => (
    <div className={`${s.top_container} flex align_center`}>
        <div className={s.top_container_logo}>
            <Image
                src={"/logo.png"}
                layout={"fixed"}
                alt="logo"
                width="50"
                height="50"
            />
        </div>
        <div
            className={`${s.top_container_nav_bar} flex flex_end align_center`}
        >
            <Icon type="NotificationIcon" color="white" />
            <Submit label="Create a new funnel" />
            <p style={{ color: "white" }}>name surname</p>
            <Image
                src={AvatarImage}
                layout={"fixed"}
                alt="logo"
                width="50"
                height="50"
            />
        </div>
    </div>
);
