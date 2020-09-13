import React from "react";

export const ContentOverview = (props) => {

    return (
        props.overview ? <article className={"content-overview-container"}>
            <h6>Краткое описание
                {props.type === "movie" ? ` - ${props.title}:` : null}
                {props.type === "tv" ? ` - ${props.name}:` : null}
            </h6>
            <p>{props.overview}</p>
        </article> : null
    )
};