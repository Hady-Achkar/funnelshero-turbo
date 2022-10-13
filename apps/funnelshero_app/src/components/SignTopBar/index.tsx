import Image from 'next/image'
import Link from 'next/link'
import s from './signTopBar.module.scss'

export const SignTopBar = () => {
    return (
        <div className={s.top_container}>
            <div className={s.top_container_logo}>
                <Image
                    src={"/logo.png"}
                    layout={"fixed"}
                    alt="logo"
                    width="50"
                    height="50"
                />
            </div>
            <div className={s.top_container_nav_bar}>
                <Link href={'/'}>
                    <a>Home</a>
                </Link>
                <Link href={'/'}>
                    <a>Pricing</a></Link>
                <Link href={'/'}>
                    <a>About</a>
                </Link>
            </div>
        </div>
    )
}