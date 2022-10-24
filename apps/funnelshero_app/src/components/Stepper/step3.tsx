import { Input, Icon } from 'ui'
import { Submit } from 'components'
import s from './stepper.module.scss'

export const Step3 = ({ setStep }: { setStep: (state: number) => void }) => {
    return (
        <div >
            <div className={s.flex}>
                <div>
                    <div className={s.row}>
                        <Input
                            rounded={true}
                            className={s.sign_textField}
                            placeholder={"Card number"}
                        />
                        <Input
                            rounded={true}
                            className={s.sign_textField}
                            placeholder={"Month/Year"}
                        />
                        <Input
                            rounded={true}
                            className={s.sign_textField}
                            placeholder={"CVC"}
                        />

                    </div>
                    <div className={s.card_holder_row}>
                        <Input
                            rounded={true}
                            className={s.sign_textField}
                            placeholder={"Name of card holder"}
                        />
                        <Input
                            rounded={true}
                            className={s.sign_textField}
                            placeholder={"City"}
                        />


                    </div>
                    <div className={s.column}>
                        <Submit label={"Start 14 day Trial"} href={"/"}/>
                        <p>or</p>
                        <Submit className={s.submit_btn}>
                            <Icon type='PayPalIcon' className={s.icon_size} />
                        </Submit>
                    </div>
                </div>
                <div>
                    <div className={s.plan}>
                        <h3><b>Business</b></h3>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                        <p>$XX/ Month</p>
                        <Submit label={'Test for free'} />
                        <ul>
                            <li><Icon type='StepIcon' size={32} />Lorem Ipsum </li>
                            <li><Icon type='StepIcon' size={32} />Lorem Ipsum </li>
                            <li><Icon type='StepIcon' size={32} />Lorem Ipsum </li>
                            <li><Icon type='StepIcon' size={32} />Lorem Ipsum </li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    )
}