import ProfileLayout from "layouts/profileLayout"
import s from './funnels.module.scss'


const Notifications = () => {
    return (
        <>
            <ProfileLayout>
                <div className={s.funnels_content}>
                    <h1><b>Notifications</b></h1>
                    <div>
                        <div className={s.notification_card}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                        </div>

                        <div className={s.notification_card}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                        </div>

                        <div className={s.notification_card}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                        </div>

                        <div className={s.notification_card}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                        </div>

                        <div className={s.notification_card}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                        </div>
                    </div>
                    
                </div>
            </ProfileLayout>
        </>
    )
}

export default Notifications