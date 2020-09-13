import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {NavLink} from "react-router-dom";
import {useAuth} from "../../hooks/auth.hook";
import { useSelector } from 'react-redux'
import {useDispatch} from "react-redux";
import {setAccountModal} from "../../actions/client.actions";
import {useSound} from "../../hooks/sound.hook";

export const AuthBtn = () => {
    const {ready} = useAuth();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((store) => store.client.isAuthenticated);
    const isAccountModalOpen = useSelector((store) => store.client.isAccountModalOpen);

    const {playSound} = useSound();

    return (
        <>
            {isAuthenticated && ready ?
                <p className={'user-container'}
                   onClick={() => dispatch(setAccountModal())}
                   onMouseDown={() => {isAccountModalOpen ? playSound('lock') : playSound('unlock')}}
                >
                    <FontAwesomeIcon icon={'user'} />
                </p> :
                <NavLink className={'signIn-container'}
                         to={"/auth/sign-in"}
                         onClick={() => playSound('tap')}
                >
                    <FontAwesomeIcon icon={'sign-in-alt'} />
                </NavLink>
            }
        </>
    )
};