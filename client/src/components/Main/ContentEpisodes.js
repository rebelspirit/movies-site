import React from "react";

export const ContentEpisodes = (props) => {
    return (
        props.type === "tv" ? <div className={"details-description-item"}>
            <p className={"item-name"}>Серий:</p>
            <p className={"item-text"}>
                <span>{props.number_of_episodes}</span>
            </p>
        </div> : null
    )
};