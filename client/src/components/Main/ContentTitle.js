import React from "react";

export const ContentTitle = (props) => {
    return (
        <h1 className={props.type === "movie" ? "details-title blue" : "details-title green"}>
            {props.type === "movie" ? props.title : null}
            {props.type === "tv" ? props.name : null}
        </h1>
    )
};