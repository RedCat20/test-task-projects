import { FC, ReactNode } from 'react';
import { createPortal } from "react-dom";

import styles from './Modal.module.scss';
import crossIcon from '../../../assets/images/cross.svg';

interface Props {
    children: ReactNode;
    setShow: (isShow: boolean) => void;
}

const Modal:FC<Props> = ({children, setShow}) => {

    const onCrossClickHandler = () => {
        setShow(false);
    }

    return createPortal(
        <div className={styles.wrapper}>

            <div className={styles.modal}>

                <div className={styles.top}>
                    <button onClick={onCrossClickHandler}>
                        <img src={crossIcon} alt="Close cross" />
                    </button>
                </div>

                {children}

            </div>

        </div>,
        document.body
    );
};

export default Modal;