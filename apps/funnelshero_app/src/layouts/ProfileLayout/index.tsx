import { FC } from "react";
import { ProfileTopBar } from "components";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "ui";
import AvatarImage from "assets/images/Avatar.png";
import s from "./layouts.module.scss";

export const ProfileLayout: FC<IProps> = ({ children }): JSX.Element => {
    return (
        <>
            <ProfileTopBar />
            <div className={`${s.mainContent} flex space_between`}>
                <div className={`${s.nav_bar} flex column`}>
                    <div className={`${s.avatar} flex`}>
                        <Image
                            src={AvatarImage}
                            layout={"fixed"}
                            alt="logo"
                            width="50"
                            height="50"
                        />
                        <div>
                            <p>Name surname</p>
                            <p>Email address</p>
                        </div>
                    </div>
                    <div>
                        <ul className={`${s.list} flex column`}>
                            <li className={`${s.list_item} flex align_center`}>
                                <Icon type="AccountIcon" />
                                Your Account
                            </li>
                            <li className={`${s.list_item} flex align_center`}>
                                <Icon type="FunnelIcon" />
                                My Funnels
                            </li>
                            <li className={`${s.list_item} flex align_center`}>
                                <Icon type="PasswordIcon" />
                                Login & security
                            </li>
                            <li className={`${s.list_item} flex align_center`}>
                                <Icon type="BillingIcon" />
                                Billing & plans
                            </li>
                            <li className={`${s.list_item} flex align_center`}>
                                <Icon type="PurchaseIcon" />
                                Purchase history
                            </li>
                            <li className={`${s.list_item} flex align_center`}>
                                <Icon type="NotificationIcon" />
                                Notification
                            </li>
                        </ul>
                    </div>
                </div>
                {children}
                <div className={s.account}>
                    <div className={`${s.avatar} flex align_center`}>
                        <Image
                            src={AvatarImage}
                            layout={"fixed"}
                            alt="logo"
                            width="50"
                            height="50"
                        />
                        <div>
                            <p>Name surname</p>
                            <p>email address</p>
                        </div>
                    </div>
                    <hr />
                    <ul className={s.list}>
                        <li className={s.list_item}>
                            <Link href={"/"}>Account settings</Link>
                        </li>
                        <li className={s.list_item}>
                            <Link href={"/"}>Sign out</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

interface IProps {
    children: React.ReactNode | React.ReactNode[];
}
