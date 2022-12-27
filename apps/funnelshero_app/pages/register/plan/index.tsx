import React, { FC, useState, useMemo } from "react";
import { RegisterLayout } from "layouts";
import { Icon, MuiltipleSwitcher } from "ui";
import { Submit, PlanCard } from "components";
import s from "./plan.module.scss";
interface IPlan {
    plan: string;
    price: string;
}

const Plan = () => {
    const [selectedPlan, setSelectedPlan] = useState<number>(0);
    const memoSwitchData = useMemo(() => {
        return [
            {
                label: "Monthly",
                id: "monthly",
            },
            {
                label: "Yearly",
                id: "yearly",
            },
        ];
    }, []);

    const memoPlanData: IPlan[] = useMemo(() => {
        return [
            {
                plan: "Pro",
                price: "$XX",
            },
            {
                plan: "Business",
                price: "$XX ",
            },
            {
                plan: "Advanced",
                price: "$XX",
            },
        ];
    }, []);

    return (
        <RegisterLayout
            activeStep={1}
            title={<div className={s.header}>Test every plan 14 days free</div>}
        >
            <div className={s.plan_size_container}>
                <MuiltipleSwitcher
                    onChange={(e) => {
                        setSelectedPlan(e.target.index);
                    }}
                    containerClass={s.switch_container}
                    btnsClass={s.switch_btn}
                    animatedClassName={`${s.switch_animated} ${
                        selectedPlan === 0
                            ? s.first
                            : selectedPlan === memoSwitchData.length - 1
                            ? s.last
                            : ""
                    }`}
                    selectedBtnClass={s.switch_selected_btn}
                    data={memoSwitchData}
                />
                <div className={s.save_size}>save $XX</div>
            </div>
            <div className={s.plan_cards}>
                {memoPlanData.map((item) => (
                    <PlanCard
                        key={item.plan}
                        price={item.price}
                        plan={item.plan}
                    />
                ))}
            </div>
        </RegisterLayout>
    );
};

export default Plan;
