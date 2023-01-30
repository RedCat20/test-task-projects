export interface IProject {
    title: string;
    description?: string;
    date: string;

    _id?: string;
    [propName: string]: any;
}

export type IProjectWithId = IProject & {_id: string};