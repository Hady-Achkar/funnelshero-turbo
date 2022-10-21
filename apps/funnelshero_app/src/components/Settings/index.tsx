import { FC, useMemo } from "react";
import s from "./settings.module.scss";
import { MuiltipleSwitcher, Scroll } from "ui";
import { SearchInput } from "components";
import {
    ImageContent,
    TitleContent,
    ButtonContent,
    VideoContent,
    DividerContent,
    ParagraphContent,
    OptInFormContent,
    QuestionBoxContent,
} from "components";

export const Settings: FC<IProps> = ({ activeCard }) => {
    const memoSidebarActiveComponents: IActiveComponent = useMemo(() => {
        return {
            image: <ImageContent />,
            video: <VideoContent />,
            text: <TitleContent />,
            button: <ButtonContent />,
            divider: <DividerContent />,
            paragraph: <ParagraphContent />,
            optInForm: <OptInFormContent />,
            questionBox: <QuestionBoxContent />,
        };
    }, []);

    return (
        <div className={s.settings_content}>
            <div className={s.body}>
                <MuiltipleSwitcher
                    containerClass={s.switch_container}
                    data={[
                        {
                            label: "Design",
                            id: "design",
                        },
                        {
                            label: "Pages",
                            id: "pages",
                        },
                    ]}
                />
                <div className={["title16", s.title].join(" ")}>Search</div>
                <div>
                    <SearchInput placeholder={"Search Image templates"} />
                </div>
                <Scroll>{memoSidebarActiveComponents[activeCard]}</Scroll>
            </div>
        </div>
    );
};

interface IActiveComponent {
    [key: string]: JSX.Element;
}

interface IProps {
    activeCard: string;
}
