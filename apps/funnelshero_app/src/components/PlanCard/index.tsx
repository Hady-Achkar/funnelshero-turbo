import { FC } from "react";
import s from "./planCard.module.scss";
import { Submit } from "components";
import { Icon } from "ui";
import { useRouter } from "next/router";

export const PlanCard: FC<IProps> = ({ price, plan, children }) => {
    const router = useRouter();

    return (
        <div className={s.card_container}>
            <h3>{plan}</h3>
            <div className={s.text}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry
            </div>
            <h4>
                {price}
                <span>/ Month</span>
            </h4>
            <Submit
                label={"Text for free"}
                className={s.submit_btn}
                size={"small"}
                onClick={() =>
                    router.push({
                        pathname: "confirm",
                        query: { price, plan },
                    })
                }
            />
            <div>
                <div className={s.row}>
                    <Icon type={"Check"} color={"#00AD9C"} />
                    Lorem ipsum
                </div>
                <div className={s.row}>
                    <Icon type={"Check"} color={"#00AD9C"} />
                    Lorem ipsum
                </div>
                <div className={s.row}>
                    <Icon type={"Check"} color={"#00AD9C"} />
                    Lorem ipsum
                </div>
                <div className={s.row}>
                    <Icon type={"Check"} color={"#00AD9C"} />
                    Lorem ipsum
                </div>
            </div>
            {children}
        </div>
    );
};

interface IProps {
    price: string | number;
    plan: string;
    children?: React.ReactNode | React.ReactNode[];
}
