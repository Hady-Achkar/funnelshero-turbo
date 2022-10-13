import Api from "./index";

class AuthApi extends Api {
    constructor() {
        super(`/auth`);
    }

    public login() {
        return this.get(`/1`);
    }
}

const authApi = new AuthApi();

export default authApi;
