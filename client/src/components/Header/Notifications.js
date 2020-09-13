import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useSound} from "../../hooks/sound.hook";

export const Notifications = () => {
    const {playSound} = useSound();

    return (
        <div className={'notification-container'}
             onClick={() => playSound('tap')}
        >
            <FontAwesomeIcon icon={'bell'} />
        </div>
    )
};
