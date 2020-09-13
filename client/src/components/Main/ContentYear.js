import React from "react";

export const ContentYear = (props) => {
    return (
        props.release_date || props.first_air_date ? <div className={"details-description-item"}>
            <p className={"item-name"}>Год:</p>
            {props.type === "movie" ? <p className={"item-text"}>
                <span>{props.release_date}</span>
            </p> : null}
            {props.type === "tv" ? <p className={"item-text"}>
                <span>{props.first_air_date}</span>
            </p> : null}
        </div> : null
    )
};