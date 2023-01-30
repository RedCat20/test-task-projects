import { useEffect, useState } from "react";
import { UsersApi } from "../api/users.api";
import { LOADED_STATES } from "../data/loaded.states";

export const useAuth = () => {

    const [loadedState, setLoadedState] = useState(LOADED_STATES.Initial);

    // Get user data - for checking congruent route
    const getUser = async () => {
        try {
            const user = await UsersApi.getUser();
            if (user) {
                setLoadedState(LOADED_STATES.LoadedUser);
            } else {
                setLoadedState(LOADED_STATES.WithoutUser);
            }
        } catch (err: any) {
            setLoadedState(LOADED_STATES.WithoutUser);
        }
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getUser().then(r => r);
        } else {
            setLoadedState(LOADED_STATES.WithoutUser);
        }
    },[localStorage]);

    return loadedState;
}