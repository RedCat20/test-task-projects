import { IProject } from "../types/project.types";
import { getBaseUrl, instance } from "./axios.instance";
import { IGetRequestConfig } from "../types/request.config.type";


export const ProjectsApi = {

    setup() {
        const baseUrl = getBaseUrl();
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        return { baseUrl, token, config };
    },

    async getProjects(query: string, sort: string, filter: string) {
        const requestConfig: IGetRequestConfig = this.setup();

        if (!requestConfig?.config) {
            throw new Error('User is not authorized ');
        }

        const { data } = await instance.get(
            `${requestConfig.baseUrl}/projects/?query=${query}&sort=${sort}&filter=${filter}`,
            requestConfig.config
        );
        return data;
    },

    async addProject(dto: IProject) {
        console.log('dto: ', dto);

        const requestConfig: IGetRequestConfig = this.setup();

        if (!requestConfig?.config) {
            throw new Error('User is not authorized ');
        }

        try {
            const { data } = await instance.post(`${requestConfig.baseUrl}/projects`, dto, requestConfig.config);
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

    async updateProject(dto: IProject, id: string) {
        const requestConfig: IGetRequestConfig = this.setup();

        if (!requestConfig?.config) {
            throw new Error('User is not authorized ');
        }

        const {data} = await instance.patch(`${requestConfig.baseUrl}/projects/${id}`, dto, requestConfig.config);
        return data;
    },


    async deleteProject(id: string) {
        const requestConfig: IGetRequestConfig = this.setup();

        if (!requestConfig?.config) {
            throw new Error('User is not authorized ');
        }

        const {data} = await instance.delete(`${requestConfig.baseUrl}/projects/${id}`, requestConfig.config);
        return data;
    }
};
