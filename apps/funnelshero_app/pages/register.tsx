import RegisterStepper from "@components/Stepper"
import { Submit } from "@components/Submit"
import SignLayout from "layouts/signLayout"
import Link from "next/link"
import { useState } from "react"
import { Checkbox, Input } from "ui"
import s from './home.module.scss'
const Register = () => {
    const [activeStep, setActiveStep] = useState(0);
    const activeText = () => {
        switch (activeStep) {
            case 0:
                return <h1 className={s.login_title}>Create your <span>free account</span></h1>
            case 1:
                return <h1 className={s.login_title}><span>Test every plan 14 days free</span></h1>
            case 2:
                return <h1 className={s.login_title}>Last Step.<span> Confirm your account</span></h1>
            default:
                return <h1 className={s.login_title}>Create your <span>free account</span></h1>
        }
    }
    return (
        <SignLayout>
            <div className={s.full_centered}>
                <div className={s.sign_block}>
                    <div>
                    {activeText()}
                    </div>
                    <RegisterStepper activeStep={activeStep} setActiveStep={setActiveStep} />
                </div>
            </div>
        </SignLayout>
    )
}

export default Register