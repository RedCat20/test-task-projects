import { FC, useCallback, useEffect, useState } from 'react';
import { Navigate, useSearchParams } from "react-router-dom";
import { IProject, IProjectDto, IProjectWithId } from "../../types/project.types";
import { LOADED_STATES } from "../../data/loaded.states";
import { convertDateToString } from "../../helpers/convert.date";
import { useAuth } from "../../hooks/useAuth";
import { ProjectsApi } from "../../api/projects.api";

import styles from './DashboardPage.module.scss';

import Header from "../../components/layout/Header/Header";
import ProjectList from "../../components/page-components/ProjectList/ProjectList";
import ListPanel from "../../components/page-components/ListPanel/ListPanel";


interface Props { }

const DashboardPage:FC<Props> = () => {

    const authState = useAuth();
    let [searchParams, setSearchParams] = useSearchParams();

    const [projects, setProjects] = useState<IProjectWithId[] | null>(null);

    const getProjects = useCallback(async () => {
        const query = searchParams.get('query') || '';
        const sort = searchParams.get('sort') || '';
        const filter = searchParams.get('filter') || '';

        const items = await ProjectsApi.getProjects(query, sort, filter);
        setProjects(items);
    },[searchParams]);

    useEffect(() => {
        getProjects().then(r => r);
    },[searchParams]);

    //// Protected page

    if (authState === LOADED_STATES.WithoutUser) {
        return <Navigate to="/login" />
    }

    const addProjectHandler = async ({title, description, date}: IProjectDto) => {
        const newProject = await ProjectsApi.addProject({
            title,
            description,
            date: date || convertDateToString(new Date(Date.now()))
        });
        if (projects) {
            setProjects([...projects, newProject]);
        }
    }

    const updateProjectHandler = async ( {title, description, date}: IProjectDto, id?: string | undefined) => {
        const updatedProject = await ProjectsApi.updateProject(
            {
                title,
                description,
                date: convertDateToString(new Date(Date.now()))
            },
            id || ''
        );
        if (projects) {
            setProjects([...projects].map((project: IProjectWithId) => project._id === id ? updatedProject : project));
        }
    }

    const removeProjectHandler = async (id: string) => {
        await ProjectsApi.deleteProject(id);
        if (projects) {
            setProjects(projects.filter((item: IProject) => item._id !== id));
        }
    }

    return (
        <div className={styles.root}>
            <Header />

            <main className={styles.main}>
                <ListPanel addProjectHandler={addProjectHandler} />
                <ProjectList
                    projects={projects}
                    updateProjectHandler={updateProjectHandler}
                    removeProjectHandler={removeProjectHandler}
                />
            </main>
        </div>
    );
};

export default DashboardPage;