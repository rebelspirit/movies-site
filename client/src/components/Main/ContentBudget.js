import React from "react";

export const ContentBudget = (props) => {
    return (
        props.type === "movie" ? <div className={"details-description-item"}>
            <p className={"item-name"}>Бюджет:</p>
            <p className={"item-text"}>
                <span>{props.budget} $</span>
            </p>
        </div> : null
    )
};