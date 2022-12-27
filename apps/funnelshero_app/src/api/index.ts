import axios, {
    AxiosRequestConfig,
    AxiosRequestHeaders,
    AxiosResponse,
    AxiosPromise,
} from "axios";

class Api {
    private readonly URL: string = "";
    private readonly cleanReq: any;

    constructor({
        baseUrl = "",
        cleanReq = false,
    }: {
        baseUrl: string;
        cleanReq?: boolean;
    }) {
        this.URL = baseUrl;
        this.cleanReq = cleanReq;
    }

    public get<T>({
        url = "",
        headers = {},
    }: AxiosRequestConfig): AxiosPromise<T> {
        return this.configureRequest({ url, headers });
    }

    public post<T>({
        url = "",
        data,
        headers = {},
    }: AxiosRequestConfig): AxiosPromise<T> {
        return this.configureRequest<T>({
            url,
            data,
            method: "post",
            headers,
        });
    }

    private configureRequest<T>({
        url = "",
        method = "get",
        data = {},
        headers = {},
    }: AxiosRequestConfig): AxiosPromise<T> {
        const token: string | null = localStorage.getItem("token");
        const _headers: AxiosRequestHeaders = {
            "Content-Type": "application/json",
            ...headers,
        };

        url = this.URL + url;

        const config: AxiosRequestConfig<any> = {
            method,
            url,
        };

        if (!this.cleanReq) {
            config.baseURL = process.env.APP_URL;
        }

        if (token) _headers.Authorization = token;

        if (data) {
            if (data.hasOwnProperty("email"))
                data.email = data.email.toLowerCase();
            if (data instanceof FormData) {
                _headers["Content-Type"] = "multipart/form-data";
            }
            config.data = data;
        }
        config.headers = _headers;

        return axios(config).then((response: AxiosResponse) => response);
    }
}

export default Api;
