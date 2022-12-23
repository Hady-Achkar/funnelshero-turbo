import ProfileLayout from "@layouts/ProfileLayout";
import s from "./funnels.module.scss";
import funelImg from "../src/assets/images/funnel.png";
import Image from "next/image";
import { Submit } from "@components/Submit";
import { Input } from "ui";

const Security = () => {
    return (
        <>
            <ProfileLayout>
                <div className={s.funnels_content}>
                    <h1>
                        <b>Login & security</b>
                    </h1>
                    <div className={s.inputs}>
                        <Input rounded={true} placeholder="Current Password" />
                        <Input rounded={true} placeholder="New Password" />
                        <Input
                            rounded={true}
                            placeholder="Confirm New Password"
                        />
                        <Submit label={"Save"} />
                    </div>
                </div>
            </ProfileLayout>
        </>
    );
};

export default Security;
