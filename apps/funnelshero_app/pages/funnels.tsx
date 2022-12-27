import {ProfileLayout} from "layouts";
import s from "./funnels.module.scss";
import funelImg from "../src/assets/images/funnel.png";
import Image from "next/image";
import { Submit } from "@components/Submit";
const Funnels = () => {
    return (
        <>
            <ProfileLayout>
                <div className={s.funnels_content}>
                    <h1>
                        <b>My Funnels</b>
                    </h1>
                    <div className={s.cards}>
                        <div className={s.card}>
                            <Image
                                src={funelImg}
                                width={268}
                                height={150}
                                alt="funel"
                            />
                            <div className={s.card_descrip}>
                                <p>Funnel Name</p>
                                <div className={s.flex}>
                                    <p>status</p>
                                    <Submit label={"Edit"} />
                                </div>
                            </div>
                        </div>
                        <div className={s.card}>
                            <Image
                                src={funelImg}
                                width={268}
                                height={150}
                                alt="funel"
                            />
                            <div className={s.card_descrip}>
                                <p>Funnel Name</p>
                                <div className={s.flex}>
                                    <p>status</p>
                                    <Submit label={"Edit"} />
                                </div>
                            </div>
                        </div>
                        <div className={s.card}>
                            <Image
                                src={funelImg}
                                width={268}
                                height={150}
                                alt="funel"
                            />
                            <div className={s.card_descrip}>
                                <p>Funnel Name</p>
                                <div className={s.flex}>
                                    <p>status</p>
                                    <Submit label={"Edit"} />
                                </div>
                            </div>
                        </div>
                        <div className={s.card}>
                            <Image
                                src={funelImg}
                                width={268}
                                height={150}
                                alt="funel"
                            />
                            <div className={s.card_descrip}>
                                <p>Funnel Name</p>
                                <div className={s.flex}>
                                    <p>status</p>
                                    <Submit label={"Edit"} />
                                </div>
                            </div>
                        </div>
                        <div className={s.card}>
                            <Image
                                src={funelImg}
                                width={268}
                                height={150}
                                alt="funel"
                            />
                            <div className={s.card_descrip}>
                                <p>Funnel Name</p>
                                <div className={s.flex}>
                                    <p>status</p>
                                    <Submit label={"Edit"} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ProfileLayout>
        </>
    );
};

export default Funnels;
