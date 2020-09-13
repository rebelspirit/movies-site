import React from 'react';
import './index.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useAuth} from "../../hooks/auth.hook";
import {useDispatch, useSelector} from "react-redux";
import {setAccountModal} from "../../actions/client.actions";
import {useSound} from "../../hooks/sound.hook";
import {SoundBtn} from "./SoundBtn";
import {NightModeBtn} from "./NightModeBtn";
import {LogoutBtn} from "./LogoutBtn";


export const AccountInfo = () => {
    const {ready} = useAuth();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((store) => store.client.isAuthenticated);
    const isAccountModalOpen = useSelector((store) => store.client.isAccountModalOpen);
    const userData = useSelector((store) => store.server.userData);

    const {playSound} = useSound();

    return (
        <>
            {isAuthenticated && ready && isAccountModalOpen ?
                <div className={'account-container'}>
                    <div className={'account-header'}>
                        <div className={'account-avatar'}>
                            <FontAwesomeIcon icon={'user'} />
                        </div>
                        <div className={'account-info'}>
                            <p className={'account-username'}>{userData.username ? userData.username : null}</p>
                            <p className={'account-email'}>{userData.email ? userData.email : null}</p>
                        </div>
                        <div className={'account-close'}
                             onMouseDown={() => {isAccountModalOpen ? playSound('lock') : playSound('unlock')}}
                             onClick={() => dispatch(setAccountModal())}
                        >
                            <FontAwesomeIcon icon={'times'}/>
                        </div>
                    </div>
                    <nav className={'navigation'}>
                        <SoundBtn/>
                        <NightModeBtn/>
                        <LogoutBtn/>
                    </nav>
                </div> : null
            }
        </>
    )
};