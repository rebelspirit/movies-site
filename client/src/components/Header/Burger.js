import React from 'react';
import {changeActiveStatus} from "../../actions/client.actions";
import { useDispatch, useSelector } from 'react-redux'
import {useSound} from "../../hooks/sound.hook";

export const Burger = () => {
    const isToggledBurger = useSelector((store) => store.client.isToggleBurger);
    const dispatch = useDispatch();
    const {playSound} = useSound();

    return (
        <div className={isToggledBurger ? 'burger open' : 'burger'}
             onClick={() => dispatch(changeActiveStatus())}
             onMouseDown={() => {isToggledBurger ? playSound('lock') : playSound('unlock')}}
        >
            <button/>
        </div>
    )
};
