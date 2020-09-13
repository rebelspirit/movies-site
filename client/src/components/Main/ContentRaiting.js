import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const ContentRaiting = (props) => {
    return (
        <div className={"details-rating-container"}>
            <h6>Рейтинг:</h6>
            <div className={"popularity"}>
                <FontAwesomeIcon icon={"star"} />
                {props.popularity}
            </div>
            <div className={"vote-average"}>
                <FontAwesomeIcon icon={"poll"} />
                {props.vote_average}
            </div>
        </div>
    )
};