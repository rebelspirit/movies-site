import React from 'react'
import './index.css'
import {useDispatch} from "react-redux";

export const ToggleSwitch = (props) => {
    const dispatch = useDispatch();

    return (
        <label className="switch">
            <input type="checkbox" checked={props.data} onChange={()=> dispatch(props.changeFunc)}/>
                <span className="slider round"/>
        </label>
    )
};