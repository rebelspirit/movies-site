import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useSound} from "../../hooks/sound.hook";

export const MoviePosition = () => {
    const {playSound} = useSound();

    return (
        <div className={'movie-container'}
             onClick={() => playSound('tap')}
        >
            <FontAwesomeIcon icon={'th'} />
        </div>
    )
}
