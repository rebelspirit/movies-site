import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {saveUserData, cleanUserData} from "../actions/server.actions"
import {useLocalStorage} from "./localStorage.hook";

export const useAuth = () => {
    const dispatch = useDispatch();
    const userData = useSelector((store) => store.server.userData);
    const [ready, setReady] = useState(false);
    const [localStorage, setLocalStorage] = useLocalStorage('userData');

    const login = useCallback((data) => {

        dispatch(saveUserData(data));

        setLocalStorage({
            token: data.token,
            id: data.id,
            email: data.email,
            username: data.username,
            admin: data.admin,
            sounds: data.sounds,
            nightMode: data.nightMode,
            history: data.history
        });

        console.log("Login => User data: ", data);
        setReady(true);
    }, [dispatch, setLocalStorage]);

    const reLogin = useCallback( (data) => {
        dispatch(saveUserData(data));

        console.log(`Re-Login => Authentication token status: ${!!data.token}`);
    }, [dispatch]);

    const logout = useCallback(() => {
        dispatch(cleanUserData());

        console.log(`Logout => Authentication token status: ${!userData.token}`);
        setReady(true);
    }, [userData.token, dispatch]);

    const LocalStorageData = useCallback(async () => await localStorage, [localStorage]);

    const checkDataAndReLogin = useCallback(async () => {
        const response = await LocalStorageData();

        if (response && response.token) {
            await reLogin(response);
        } else {
            console.log(`Re-Login => Local storage is empty: ${!response}`);
        }
    }, [reLogin, LocalStorageData]);

    useEffect( () => {
        checkDataAndReLogin();
        setReady(true);
    }, [checkDataAndReLogin]);
    
    return {login, logout, ready}
};