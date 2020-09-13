import React from "react";

export const ContentCountry = (props) => {
    return (
        <div className={"details-description-item"}>
            <p className={"item-name"}>Страна:</p>
            {props.production_countries ? <p className={"item-text"}>
                {Object.values(props.production_countries).map((country, key) => <span key={key}>
                    {country.name}
                </span>)}
            </p> : null}
            {props.origin_country ? <p className={"item-text"}>
                {props.origin_country.map((country, key) => <span key={key}>
                    {country}
                </span>)}
            </p> : null}
        </div>
    )
};