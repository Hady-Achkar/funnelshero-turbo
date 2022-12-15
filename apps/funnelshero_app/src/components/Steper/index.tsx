import { FC, useMemo } from "react";
import s from "./steper.module.scss";

export const Steper: FC<IProps> = ({ activeStep }) => {
    const memoData: IStep[] = useMemo(() => {
        return [
            {
                title: "Register",
                subtitle: "This is a description.",
            },
            {
                title: "Choose plan",
                subtitle: "This is a description.",
            },
            {
                title: "Payment",
                subtitle: "This is a description.",
            },
        ];
    }, []);

    console.log(activeStep);
    return (
        <div className={s.container}>
            {memoData.map((step: IStep, index: number) => {
                return (
                    <div
                        key={index}
                        className={`${s.block} ${activeStep === index}`}
                    >
                        <span className={s.number}>{index + 1}</span>
                        <div>
                            <div className={s.title}>
                                {step.title}
                                <div className={`${s.line}`} />
                            </div>
                            <div className={s.subtitle}>{step.subtitle}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

interface IStep {
    title: string;
    subtitle: string;
}
interface IProps {
    activeStep: number;
}
