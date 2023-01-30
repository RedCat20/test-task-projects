import { IUser } from "../types/user.types";
import { getBaseUrl, instance } from "./axios.instance";

export const UsersApi = {

    async registerUser(dto: IUser) {
        const baseUrl = getBaseUrl();

        // const { data } = await instance.post(`${baseUrl}/register`, dto);
        // return data;

        try {
            const { data } = await instance.post(`${baseUrl}/register`, dto);
            return data;
        } catch (error: any) {
            if (error.response) {
                throw new Error(error.response.data.error);
                // Request made and server responded
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
        }
    },

    async loginUser(dto: IUser) {
        const baseUrl = getBaseUrl();

        try {
            const { data } = await instance.post(`${baseUrl}/login`, dto);
            return data;
        } catch (error: any) {
            if (error.response) {
                throw new Error(error.response.data.error);
                // Request made and server responded
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
        }
    },

    async getUser() {
        const baseUrl = getBaseUrl();
        const token = localStorage.getItem('token');

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        try {
            const { data } = await instance.get(`${baseUrl}/user`, config);
            return data;
        } catch (error: any) {
            if (error.response) {
                throw new Error(error.response.data.error);
            } else if (error.request) {
                throw new Error(error.request);
            } else {
                throw new Error(error.message);
            }
        }
    },
};
