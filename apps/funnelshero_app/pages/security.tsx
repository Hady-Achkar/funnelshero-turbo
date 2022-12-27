import {ProfileLayout} from "layouts";
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
                        <Input variant={ 'rounded'}  placeholder="Current Password" />
                        <Input variant={ 'rounded'} placeholder="New Password" />
                        <Input
                            variant={ 'rounded'}
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
