import { FC } from "react";
import { RegisterLayout } from "layouts";

const Confirm: FC = () => {
    return (
        <RegisterLayout
            activeStep={2}
            title={
                <>
                    Last Step.<span> Confirm your account</span>
                </>
            }
        >
            {/* <Steper activeStep={activeStep} /> */}
        </RegisterLayout>
    );
};

export async function getStaticProps(context: any) {
    return {
        props: {},
    };
}

export default Confirm;
