import { FC } from "react";
import styles from './RegisterPage.module.scss';
import Register from "../../components/page-components/Register/Register";

const RegisterPage:FC = () => {
    return (
        <div className={styles.root}>
            <Register />
        </div>
    );
};

export default RegisterPage;