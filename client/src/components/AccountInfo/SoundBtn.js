import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useSelector} from "react-redux";
import {setSoundsEffect} from "../../actions/server.actions";
import {ToggleSwitch} from "../ToggleSwitch";

export const SoundBtn = () => {
    const userData = useSelector((store) => store.server.userData);

    return (
        <div className={'item'}>
            <div className={"button-container disable-hover"}>
                <div className={'itemName'}>
                    <div className="nav-icon">
                        <FontAwesomeIcon icon={"volume-up"} />
                    </div>
                    <h5>Звук</h5>
                    <ToggleSwitch data={userData.sounds} changeFunc={setSoundsEffect({email: userData.email, sounds: !userData.sounds})}/>
                </div>
            </div>
        </div>
    )
};