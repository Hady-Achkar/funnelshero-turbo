import { FC } from "react";
import { RegisterLayout } from "layouts";
import Image from "next/image";
import { useRouter } from "next/router";
import { Select, Input, Icon } from "ui";
import { Submit, PlanCard } from "components";
import s from "./confirm.module.scss";
import paypal from "assets/images/paypal.png";
import countries from "./countries";

const Confirm: FC = () => {
    const router = useRouter();

    return (
        <RegisterLayout
            activeStep={2}
            title={
                <>
                    Last Step.<span> Confirm your account</span>
                </>
            }
        >
            <div className={s.container}>
                <div>
                    <div className={s.block}>
                        <div className={s.column} style={{ flex: 1.5 }}>
                            <Input
                                placeholder="Card number"
                                variant={"rounded"}
                                className={s.input}
                            />
                            <Input
                                placeholder="Name of card Holder"
                                variant={"rounded"}
                                className={s.input}
                            />
                        </div>
                        <div className={s.column} style={{ flex: 1 }}>
                            <div className={s.row}>
                                <div style={{ flex: 1.5 }}>
                                    <Input
                                        placeholder="Month/Year"
                                        variant={"rounded"}
                                        className={s.input}
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <Input
                                        placeholder="CVC"
                                        variant={"rounded"}
                                        className={s.input}
                                    />
                                </div>
                            </div>
                            <Select
                                labelClassName={s.countries}
                                icon={(isSelected) => {
                                    return (
                                        <Icon
                                            type={
                                                isSelected
                                                    ? "ChevronUp"
                                                    : "ChevronDown"
                                            }
                                            color={"rgba(0,0,0,.2)"}
                                            feather={true}
                                            size={18}
                                        />
                                    );
                                }}
                            >
                                {Object.keys(countries).map((item) => (
                                    <div
                                        key={item.toLowerCase()}
                                        className={s.option}
                                    >
                                        <img
                                            src={
                                                countries[
                                                    item as keyof typeof countries
                                                ].mini
                                            }
                                            width={30}
                                            height={20}
                                        />
                                        {item}
                                    </div>
                                ))}
                            </Select>
                        </div>
                    </div>
                    <div className={s.submit_container}>
                        <Submit label={"Start 14 day Trial"} size={"large"} />
                        <div style={{ textAlign: "center" }}>or</div>
                        <Submit
                            label={<Image src={paypal} height={26} />}
                            className={s.paypal_btn}
                        />
                    </div>
                </div>
                <div>
                    {router.query.plan && router.query.price && (
                        <PlanCard
                            plan={router.query.plan}
                            price={router.query.price}
                        />
                    )}
                </div>
            </div>
        </RegisterLayout>
    );
};

export async function getStaticProps() {
    return {
        props: {},
    };
}

export default Confirm;
