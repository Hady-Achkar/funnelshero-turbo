import axios, {
    AxiosRequestConfig,
    AxiosResponse,
    AxiosRequestHeaders,
} from "axios";

interface IConfigureRequest {
    url?: string;
    method?: string;
    body?: any;
}

class Api {
    private readonly URL: string;
    private cleanReq: boolean = false;

    constructor(private _baseUrl: string, private _cleanReq: boolean = false) {
        this.URL = _baseUrl;
        this.cleanReq = _cleanReq;
    }

    public get<T>(url: string = ""): Promise<AxiosResponse | T> {
        return this.configureRequest({ url });
    }

    public post<T>(url: string = "", body: any): Promise<AxiosResponse | T> {
        return this.configureRequest({ url, body, method: "post" });
    }

    private configureRequest({
        url = "",
        method = "get",
        body,
    }: IConfigureRequest): Promise<AxiosResponse> {
        const headers: AxiosRequestHeaders = {};

        const token: string | null =
            localStorage.getItem("token") || sessionStorage.getItem("token");

        url = this.cleanReq
            ? this.URL + url
            : process.env.APP_URL + this.URL + url;

        const config: AxiosRequestConfig = {
            method,
            url,
        };

        if (token) headers["Authorization"] = token;

        if (body) {
            if (body.hasOwnProperty("email"))
                body.email = body.email.toLowerCase();
            if (body instanceof FormData) {
                headers["Content-Type"] = "multipart/form-data";
            } else {
                headers["Content-Type"] = "application/json";
            }
            config.data = body;
        }
        config.headers = headers as AxiosRequestHeaders;

        return axios(config).then((response: AxiosResponse) => response);
    }
}

export default Api;
