import {useEffect, useState} from "react";
import {UsersApi} from "../api/users.api";


export const useAuth = () => {

    const [isAuth, setIsAuth] = useState(false);

    // useEffect(() => {
    //     if (localStorage.getItem('token')) {
    //         // UsersApi.getUserInfo()
    //         setIsAuth(2);
    //     } else {
    //         setIsAuth(1);
    //     }
    // },[localStorage, localStorage.getItem('token')]);

    const checkAuth = async () => {
        const user = await UsersApi.getUser();
        setIsAuth(user);
        console.log('user', user);
    }

    useEffect(() => {
        checkAuth().then(r => r);
    },[]);

    return isAuth;
}