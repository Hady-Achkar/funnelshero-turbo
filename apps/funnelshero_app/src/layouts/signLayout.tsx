import { SignTopBar } from "@components/SignTopBar"

const SignLayout = ({children}:{children:JSX.Element}) =>{
    return (
        <div>
            <SignTopBar/>
            {children}
        </div>
    )
}

export default SignLayout