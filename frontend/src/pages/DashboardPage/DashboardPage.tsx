import { FC, useCallback, useEffect, useState } from 'react';
import { ProjectsApi } from "../../api/projects.api";
import { IProject, IProjectWithId } from "../../types/project.types";

import styles from './DashboardPage.module.scss';

import Header from "../../components/layout/Header/Header";
import ProjectList from "../../components/page-components/ProjectList/ProjectList";
import ListPanel from "../../components/page-components/ListPanel/ListPanel";
import { convertDateToString } from "../../helpers/convert.date";
import { useAuth } from "../../hooks/useAuth";
import { Navigate, useSearchParams } from "react-router-dom";
import { LOADED_STATES } from "../../data/loaded.states";
import { UsersApi } from "../../api/users.api";


interface Props { }

const DashboardPage:FC<Props> = () => {

    const isAuth = useAuth();
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

    const [loadedState, setLoadedState] = useState(LOADED_STATES.Initial);

    // Get user data - for checking congruent route
    const getUser = async () => {
        console.log('dfsfdsdfsfddsf')
        try {
            const user = await UsersApi.getUser();
            if (user) {
                setLoadedState(LOADED_STATES.LoadedUser);
            } else {
                setLoadedState(LOADED_STATES.WithoutUser);
            }
        } catch (err: any) {
            setLoadedState(LOADED_STATES.WithoutUser);
        }
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getUser().then(r => r);
        } else {
            setLoadedState(LOADED_STATES.WithoutUser);
        }
    },[localStorage]);

    //// Protected page

    if (loadedState === LOADED_STATES.WithoutUser) {
        return <Navigate to="/login" />
    }

    const addProjectHandler = async ({title, description, date}: {title: string, description: string, date: string}) => {

        console.log({title, description, date})

        const newProject = await ProjectsApi.addProject({
            title,
            description,
            date
        });

        if (projects) {
            setProjects([...projects, newProject]);
        }
    }

    const updateProjectHandler = async ({title, description}: {title: string, description: string}, projectId: string) => {
        const updatedProject = await ProjectsApi.updateProject(
            {
                title,
                description,
                date: convertDateToString(new Date(Date.now()))
            },
            projectId
        );

        if (projects) {
            setProjects([...projects].map((project: IProjectWithId) => project._id === projectId ? updatedProject : project));
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