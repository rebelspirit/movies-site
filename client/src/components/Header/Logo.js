import React from 'react'
import {NavLink} from "react-router-dom";
import {useSound} from "../../hooks/sound.hook";

export const Logo = () => {
    const {playSound} = useSound();

    return (
        <NavLink to={"/"}
                 className={'logo'}
                 onClick={() => playSound('refresh')}
        >
            <span className="go">go</span>
            <span className="film">film</span>
            <span className="io">.io</span>
        </NavLink>
    );
};