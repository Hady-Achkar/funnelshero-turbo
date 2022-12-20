import React from "react";
import { RegisterLayout } from "layouts";

const Plan = () => {
    return (
        <RegisterLayout
            activeStep={1}
            title={
                <>
                    Test every <span>plan 14 days free</span>
                </>
            }
        >
            {/* <Steper activeStep={activeStep} /> */}
        </RegisterLayout>
    );
};

export default Plan;
