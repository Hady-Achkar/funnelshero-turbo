import s from './stepper.module.scss'
import { Submit } from 'components'
import { Icon } from 'ui'

export const Step2 = ({ setStep }: { setStep: (state: number) => void }) => {
    return (
        <div className={s.plans_step}>
            <div className={s.plan_durations}>
                <div className={s.durations}>
                    <p>Monthly</p>
                </div>
                <div className={s.durations}>
                    <p>Yearly</p>
                </div>
            </div>
            <div className={s.plans}>
                <div className={s.plan}>
                    <h3><b>Pro</b></h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                    <p>$XX/ Month</p>
                    <Submit label={'Test for free'} />
                    <ul>
                        <li><Icon type='StepIcon' size={32}/>Lorem Ipsum </li>
                        <li><Icon type='StepIcon' size={32}/>Lorem Ipsum </li>
                        <li><Icon type='StepIcon' size={32}/>Lorem Ipsum </li>
                        <li><Icon type='StepIcon' size={32}/>Lorem Ipsum </li>
                    </ul>
                </div>
                <div className={s.plan}>
                    <h3><b>Business</b></h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                    <p>$XX/ Month</p>
                    <Submit label={'Test for free'} />
                    <ul>
                        <li><Icon type='StepIcon' size={32}/>Lorem Ipsum </li>
                        <li><Icon type='StepIcon' size={32}/>Lorem Ipsum </li>
                        <li><Icon type='StepIcon' size={32}/>Lorem Ipsum </li>
                        <li><Icon type='StepIcon' size={32}/>Lorem Ipsum </li>
                    </ul>
                </div>

                <div className={s.plan}>
                    <h3><b>Advanced</b></h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                    <p>$XX/ Month</p>
                    <Submit label={'Test for free'} onClick={()=>setStep(2)}/>
                    <ul>
                        <li><Icon type='StepIcon' size={32}/>Lorem Ipsum </li>
                        <li><Icon type='StepIcon' size={32}/>Lorem Ipsum </li>
                        <li><Icon type='StepIcon' size={32}/>Lorem Ipsum </li>
                        <li><Icon type='StepIcon' size={32}/>Lorem Ipsum </li>
                    </ul>
                </div>


            </div>
        </div>
    )
}