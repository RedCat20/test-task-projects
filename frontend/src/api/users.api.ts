import { IUser } from "../types/user.types";
import { getBaseUrl, instance } from "./axios.instance";

export const UsersApi = {

    async registerUser(dto: IUser) {
        const baseUrl = getBaseUrl();

        try {
            const { data } = await instance.post(`${baseUrl}/register`, dto);
            return data;
        } catch (error: any) {
            if (error.response) {
                throw new Error(error.response.data.error);
            } else if (error.request) {
                console.log('Error', error.request);
                throw new Error('Server error or bad request');
            } else {
                throw new Error(error.message);
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
            } else if (error.request) {
                console.log('Error', error.request);
                throw new Error('Server error or bad request');
            } else {
                throw new Error(error.message);
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
                console.log('Error', error.request);
                throw new Error('Server error or bad request');
            } else {
                throw new Error(error.message);
            }
        }
    },
};
