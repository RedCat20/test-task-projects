import { FC } from 'react';
import { IProjectWithId } from "../../../types/project.types";
import styles from "./ProjectList.module.scss";
import Item from "../Item/Item";

interface Props {
    projects: IProjectWithId[] | null;
    updateProjectHandler: (project: {title: string, description: string}, id: string) => void;
    removeProjectHandler: (id: string) => void;
}

const ProjectList:FC<Props> = ({projects, updateProjectHandler, removeProjectHandler}) => {

    return (
        <div className={styles.list}>

            {!projects && <div>Loading....</div>}

            {projects?.length === 0 && <div>No data with selected params</div>}

            {projects && projects?.length > 0 && projects.map((project: IProjectWithId, idx, array) => {
                return (
                    <Item key={project._id}
                          project={project}
                          projects={projects}
                          updateProjectHandler={updateProjectHandler}
                          removeProjectHandler={removeProjectHandler}
                    />
                )
            })}
        </div>
    );
};

export default ProjectList;