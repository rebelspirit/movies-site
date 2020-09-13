import React from 'react';
import './index.css';
import {NavLink} from "react-router-dom";
import PageNotFound404 from "../../assets/img/404_pageNotFound.svg"

export const PageNotFound = () => (
    <div className={"pageNotFound"} style={{backgroundImage: `url(${PageNotFound404})`}}>
        <div className={"pageNotFound-content"}>
            <h2><span>404</span>
                <br/>
                This page is under construction</h2>
            <NavLink to={"/"}>Go back</NavLink>
        </div>
    </div>
);