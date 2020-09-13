import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useAuth} from "../../hooks/auth.hook";

export const LogoutBtn = () => {
    const {logout} = useAuth();

    return (
        <div className={'item'}>
            <div className={"button-container"}>
                <div className={'itemName'} onClick={logout}>
                    <div className="nav-icon">
                        <FontAwesomeIcon icon={"sign-out-alt"} />
                    </div>
                    <h5>Выход</h5>
                </div>
            </div>
        </div>
    )
};