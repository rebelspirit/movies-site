import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useSelector} from "react-redux";
import {setNightMode} from "../../actions/server.actions";
import {ToggleSwitch} from "../ToggleSwitch";

export const NightModeBtn = () => {
    const userData = useSelector((store) => store.server.userData);

    return (
        <div className={'item'}>
            <div className={"button-container disable-hover"}>
                <div className={'itemName'}>
                    <div className="nav-icon">
                        <FontAwesomeIcon icon={"moon"} />
                    </div>
                    <h5>Темный режим</h5>
                    <ToggleSwitch data={userData.nightMode} changeFunc={setNightMode({email: userData.email, nightMode: !userData.nightMode})}/>
                </div>
            </div>
        </div>
    )
};