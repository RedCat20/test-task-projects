import axios from 'axios';
import {IProject} from "../types/project.types";

const EXPRESS_HOST = process.env.HOST || 'http://localhost';
//const EXPRESS_PORT = process.env.PORT || 4000;
const EXPRESS_PORT = process.env.PORT || 4000;

export const getBaseUrl = () => {
    return`${EXPRESS_HOST}:${EXPRESS_PORT}`;
}

export const instance = axios.create({
    baseURL: `${EXPRESS_HOST}:${EXPRESS_PORT}`
});

instance.defaults.headers.post['Authorization'] = `Bearer ${localStorage.getItem('token')}`
