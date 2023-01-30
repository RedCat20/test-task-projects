import styles from './RegisterPage.module.scss';
import { FC } from "react";
import Register from "../../components/page-components/Register/Register";

const RegisterPage:FC = () => {
    return (
        <div className={styles.root}>
            <Register />
        </div>
    );
};

export default RegisterPage;