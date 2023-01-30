import { FC } from "react";
import styles from './LoginPage.module.scss';
import Login from "../../components/page-components/Login/Login";

const LoginPage:FC = () => {
    return (
        <div className={styles.root}>
            <Login />
        </div>
    );
};

export default LoginPage;