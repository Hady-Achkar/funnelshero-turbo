import Link from "next/link"
import { Checkbox, Input } from "ui"
import { Submit } from ".."
import s from '../../../pages/home.module.scss'
import sstyles from './stepper.module.scss'
export const Step1 = ({setStep}:{setStep:(state:number)=>void}) => {
    return (
        <div className={sstyles.mt}>
            <div className={s.sign_block_textFields}>
                <Input
                    rounded={true}
                    className={s.sign_textField}
                    placeholder={"Full name"}
                />
                <Input
                    rounded={true}
                    className={s.sign_textField}
                    placeholder={"Email"}
                />
                <Input
                    className={s.sign_textField}
                    placeholder={"Password"}
                />
            </div>
            <div className={sstyles.centered}>
                <Checkbox label="I confirm all Term and conditions and Privacy policies" />
            </div>
            <div className={sstyles.centered}>
                <Submit className={sstyles.login_btn} onClick={()=>setStep(1)}>Next step</Submit>
            </div>
            <div className={s.create_accound}>
                <p>
                    Already have an account?
                    <Link href={"/"}>
                        <a> Sign in</a>
                    </Link>
                </p>
            </div>
        </div>
    )
}