import React, { FC } from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";

import styles from './Header.module.scss';
import ButtonPrimary from "../../ui-items/Buttons/ButtonPrimary/ButtonPrimary";

const Header:FC = () => {

    const navigator = useNavigate();

    const onHomeHandler = () => {
        return;
    }

    const onLogoutHandler = () => {
        if (localStorage.getItem('token')) {
            localStorage.removeItem('token');
        }
        navigator('/login');
    }

    return (
        <header className={styles.root}>

            <button className={styles.logo} onClick={onHomeHandler}>
                logo
            </button>

            <ButtonPrimary
                width={181}
                height={47}
                onClickCallback={onLogoutHandler}
            >
                Logout
            </ButtonPrimary>

        </header>
    );
};

export default Header;