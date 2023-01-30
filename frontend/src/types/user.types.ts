export interface IUser {
    email: string;
    password: string;
    token?: string;
    [propName: string]: any;
}
