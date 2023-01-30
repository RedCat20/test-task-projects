interface IConfig {
    headers: {
        Authorization: string
    }
}

export interface IGetRequestConfig {
    baseUrl: string;
    token: string | null;
    config: IConfig | null
}