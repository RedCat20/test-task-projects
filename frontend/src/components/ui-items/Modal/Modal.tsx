import {FC, ReactNode, useEffect, useState} from 'react';
import { createPortal } from "react-dom";
import styles from './Modal.module.scss';
import crossIcon from '../../../assets/images/cross.svg';
import Input from "../Input/Input";
import ButtonPrimary from "../Buttons/ButtonPrimary/ButtonPrimary";
import { IProject } from "../../../types/project.types";
import TextArea from "../TextArea/TextArea";
import { getCurrentDate } from "../../../helpers/convert.date";

interface Props {
    children: ReactNode;
    setShow: (isShow: boolean) => void;
}

const Modal:FC<Props> = ({children, setShow}) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    // useEffect(() => {
    //     if (info) {
    //         setTitle(info?.title || '');
    //         setDescription(info?.description || '');
    //     }
    // },[info]);

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

    // const onSendForm = async () => {
    //     setShow(false);
    //
    //     const isValidForm = checkIsValid();
    //
    //     if (!isValidForm) return;
    //
    //     if (actionText?.toLowerCase() === 'create') {
    //         handler({ title,  description, date: getCurrentDate() });
    //     } else if (info?._id && actionText?.toLowerCase() === 'edit') {
    //         handler({ title,  description, date: info.date }, info._id);
    //     }
    // }

    return createPortal(
        <div className={styles.wrapper}>

            <div className={styles.modal}>

                <div className={styles.top}>
                    <button onClick={onCrossClickHandler}>
                        <img src={crossIcon} alt="Close cross" />
                    </button>
                </div>

                {children}

                {/*<div className={styles.content}>*/}
                {/*    <div className={styles.body}>*/}
                {/*        <Input*/}
                {/*            value={title}*/}
                {/*            onChangeValueCallback={onChangeTitleHandler}*/}
                {/*            fullWidth*/}
                {/*            title="Title"*/}
                {/*            validator='^(?=.{3,30}$).*'*/}
                {/*            marginBottom={20}*/}
                {/*        />*/}

                {/*        <TextArea*/}
                {/*            value={description}*/}
                {/*            onChangeValueCallback={onChangeDescriptionHandler}*/}
                {/*            fullWidth*/}
                {/*            title="Description"*/}
                {/*            marginBottom={24}*/}
                {/*        />*/}
                {/*    </div>*/}

                {/*    <div className={styles.bottom}>*/}
                {/*        {actionText && <ButtonPrimary*/}
                {/*          disabled={!(title?.length >= 3)}*/}
                {/*          onClickCallback={onSendForm}*/}
                {/*        >*/}
                {/*            {actionText}*/}
                {/*        </ButtonPrimary>}*/}
                {/*    </div>*/}
                {/*</div>*/}

            </div>

        </div>,
        document.body
    );
};

export default Modal;