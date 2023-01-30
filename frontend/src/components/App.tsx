import { FC, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { LOADED_STATES } from "../data/loaded.states";
import { useAuth } from "../hooks/useAuth";

import styles from './App.module.scss';

import DashboardPage from "../pages/DashboardPage/DashboardPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import LoginPage from "../pages/LoginPage/LoginPage";


const App:FC = () => {
    const authState = useAuth();

    const [isLoaded, setIsLoaded] = useState(false);

    // Get user data - loading visualization
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        },1250);
        return () => clearInterval(timer);
    },[]);

    return (
        <div className={styles.appContainer}>

            {!isLoaded &&
              <div className={styles.loading}>Loading...</div>
            }

            {isLoaded && authState &&
                <Router>
                    <Routes>
                        <Route
                          path="/"
                          element={ authState === LOADED_STATES.LoadedUser ? <DashboardPage/> : <Navigate to="/register" /> }
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
