import React from "react";

export const ContentDuration = (props) => {
    return (
        <div className={"details-description-item"}>
            <p className={"item-name"}>Время:</p>
            <p className={"item-text"}>
                <span>{props.runtime} минут(ы)</span>
            </p>
        </div>
    )
};