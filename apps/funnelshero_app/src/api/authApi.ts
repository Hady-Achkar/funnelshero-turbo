import Api from "./index";
import { ILoginBody, IVerifyEmailBody, IRegistrationBody } from "../interfaces";

class AuthApi extends Api {
    constructor() {
        super({
            baseUrl: "/auth",
        });
    }

    login<T>(body: ILoginBody) {
        return this.post<T>({ url: "/sign-in", data: body });
    }

    register<T>(body: IRegistrationBody) {
        return this.post<T>({ url: "/sign-up", data: body });
    }

    verifyEmail<T>(body: IVerifyEmailBody) {
        return this.post<T>({ url: "/sign-in", data: body });
    }
}

const authApi = new AuthApi();

export default authApi;
