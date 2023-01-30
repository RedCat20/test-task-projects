import { FC, useState } from 'react';
import { IProjectWithId } from "../../../types/project.types";

import styles from "./Item.module.scss";

import Modal from "../../ui-items/Modal/Modal";
import ProjectForm from "../ProjectForm/ProjectForm";

interface Props {
    project: IProjectWithId;
    projects: IProjectWithId[];
    updateProjectHandler: (project: {title: string, description: string}, id: string) => void;
    removeProjectHandler: (id: string) => void;
}

const Item:FC<Props> = ({project, updateProjectHandler, removeProjectHandler}) => {

    const [isShow, setIsShow] = useState(false);

    return (
        <>
            <div
                key={project._id}
                className={styles.item}
                onClick={() => setIsShow(!isShow)}
            >
                <div>{project.title}</div>
                <div>{project.date}</div>
                <div
                    className={styles.remove}
                    onClick={(e) => e.stopPropagation() }
                >
                    <span
                        className={styles.removeText}
                        onClick={() => removeProjectHandler(project._id)}
                    >
                        Delete
                    </span>
                </div>
            </div>

            {isShow && <Modal setShow={setIsShow}>
              <ProjectForm info={project} setShow={setIsShow} actionText="Edit" handler={updateProjectHandler} />
            </Modal>}
        </>
    );
};

export default Item;