import React from "react";

export const ContentGenre = (props) => {
    return (
        <div className={"details-description-item"}>
            <p className={"item-name"}>Жанр:</p>
            <p className={"item-text"}>
                {Object.values(props.genres).map((genre, key) => <span key={key} className={"touchable"}>
                    {genre.name}
                </span>)}
            </p>
        </div>
    )
};