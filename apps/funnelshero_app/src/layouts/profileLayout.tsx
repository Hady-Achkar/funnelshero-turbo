import ProfileTopBar from "@components/ProfileTopBar";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "ui";
import s from "./layouts.module.scss";
import AvatarImage from "../assets/images/Avatar.png";

const ProfileLayout = ({ children }: { children: JSX.Element }) => (
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
                        <p>email address</p>
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

export default ProfileLayout;
