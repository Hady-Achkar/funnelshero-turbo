import RegisterStepper from "@components/Stepper"
import { Submit } from "@components/Submit"
import SignLayout from "layouts/signLayout"
import Link from "next/link"
import { useState } from "react"
import { Checkbox, Input } from "ui"
import s from './home.module.scss'
const Register = () => {
    const [activeStep, setActiveStep] = useState(0);
    return (
        <SignLayout>
            <div className={s.full_centered}>
                <div className={s.sign_block}>
                    <div>
                        <h1 className={s.login_title}>
                            Create your <span>free account</span>
                        </h1>
                    </div>
                    <RegisterStepper activeStep={activeStep} setActiveStep={setActiveStep}/>
                </div>
            </div>
        </SignLayout>
    )
}

export default Register