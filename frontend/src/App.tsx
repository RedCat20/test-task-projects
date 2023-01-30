import { FC, useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import { UsersApi } from "./api/users.api";
import { LOADED_STATES } from "./data/loaded.states";

import styles from './App.module.scss';

import DashboardPage from "./pages/DashboardPage/DashboardPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";


const App:FC = () => {

    const [user, setUser] = useState(null);
    const [loadedState, setLoadedState] = useState(LOADED_STATES.Initial);
    const [isLoaded, setIsLoaded] = useState(false);

    // Get user data - for checking congruent route
    const getUser = async () => {
        try {
            const user = await UsersApi.getUser();
            if (user) {
                setLoadedState(LOADED_STATES.LoadedUser);
                setUser(user);
            } else {
                setLoadedState(LOADED_STATES.WithoutUser);
            }
        } catch (err: any) {
            setLoadedState(LOADED_STATES.WithoutUser);
        }
    }

    // Get user data - loading visualization
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        },1250);
        return () => clearInterval(timer);
    },[]);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getUser().then(r => r);
        } else {
            setLoadedState(LOADED_STATES.WithoutUser);
        }
    },[localStorage]);

    return (
        <div className={styles.appContainer}>

            {!isLoaded &&
              <div className={styles.loading}>Loading...</div>
            }

            {isLoaded && loadedState &&
                <Router>
                    <Routes>
                        <Route
                          path="/"
                          element={ user && loadedState === LOADED_STATES.LoadedUser ? <DashboardPage/> : <RegisterPage /> }
                        />

                        <Route
                          path="/login"
                          element={ <LoginPage/> }
                        />

                        <Route
                          path="/register"
                          element={ <RegisterPage/> }
                        />

                        <Route
                          path="/dashboard"
                          element={ <DashboardPage/> }
                        />
                    </Routes>
                </Router>
            }
        </div>
    );
}

export default App;
