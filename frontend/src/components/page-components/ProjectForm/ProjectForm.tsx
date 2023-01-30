import React, {FC, useEffect, useState} from 'react';
import styles from "../../ui-items/Modal/Modal.module.scss";
import Input from "../../ui-items/Input/Input";
import TextArea from "../../ui-items/TextArea/TextArea";
import ButtonPrimary from "../../ui-items/Buttons/ButtonPrimary/ButtonPrimary";
import {getCurrentDate} from "../../../helpers/convert.date";
import {IProject} from "../../../types/project.types";

interface Props {
    info?: IProject;
    setShow: (isShow: boolean) => void;
    actionText?: string;
    handler: any;
}

const ProjectForm:FC<Props> = ({   info,
                                   setShow,
                                   actionText,

                                   handler}) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (info) {
            setTitle(info?.title || '');
            setDescription(info?.description || '');
        }
    },[info]);

    const onCrossClickHandler = () => {
        setShow(false);
    }

    const onChangeTitleHandler = (newValue: string) => {
        setTitle(newValue);
    }

    const onChangeDescriptionHandler = (newValue: string) => {
        setDescription(newValue);
    }

    const checkIsValid = () => title?.length > 3;

    const onSendForm = async () => {
        setShow(false);

        const isValidForm = checkIsValid();

        if (!isValidForm) return;

        if (actionText?.toLowerCase() === 'create') {
            handler({ title,  description, date: getCurrentDate() });
        } else if (info?._id && actionText?.toLowerCase() === 'edit') {
            handler({ title,  description, date: info.date }, info._id);
        }
    }

    return (
        <div className={styles.content}>
            <div className={styles.body}>
                <Input
                    value={title}
                    onChangeValueCallback={onChangeTitleHandler}
                    fullWidth
                    title="Title"
                    validator='^(?=.{3,30}$).*'
                    marginBottom={20}
                />

                <TextArea
                    value={description}
                    onChangeValueCallback={onChangeDescriptionHandler}
                    fullWidth
                    title="Description"
                    marginBottom={24}
                />
            </div>

            <div className={styles.bottom}>
                {actionText && <ButtonPrimary
                  disabled={!(title?.length >= 3)}
                  onClickCallback={onSendForm}
                >
                    {actionText}
                </ButtonPrimary>}
            </div>
        </div>
    );
};

export default ProjectForm;