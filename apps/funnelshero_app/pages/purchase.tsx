import puImage from '../src/assets/images/purchase.png'

import ProfileLayout from "layouts/profileLayout"
import s from './funnels.module.scss'
import Image from "next/image"
import { Submit } from "@components/Submit"
import { Input } from "ui"

const Security = () => {
    return (
        <>
            <ProfileLayout>
                <div className={s.funnels_content}>
                    <h1><b>Purchase</b></h1>
                    <div className={s.full_centered}>
                        <div>
                            <Image src={puImage} width={372} height={288} alt={'pur'}/>
                            <p>{"You don't have any purchases"}</p>
                        </div>
                    </div>
                    
                </div>
            </ProfileLayout>
        </>
    )
}

export default Security