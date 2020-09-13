import React, {useEffect} from 'react';
import './index.css';
import {useDispatch, useSelector} from "react-redux";
import {getActorsStuff} from "../../actions/client.actions";

export const ActorsStuff = (props) => {
    const actorsStuff = useSelector((store) => store.client.actorsStuff);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getActorsStuff(props.type, props.id));
    }, [props.id, props.type, dispatch]);


    //const container = document.querySelector(".actors-stuff-container");

    return (
        actorsStuff.length ? <section className={"actors-stuff-container"}>
            <h6>Актерский состав:</h6>
            <div className={"actors-stuff"}>
                {Object.values(actorsStuff).map((actor, key) =>
                    actor.profile_path ? <div className={"actor-stuff-item"} key={key}>
                        <img src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`} alt="actor"/>
                        <p className={'actor-name'}>{actor.name}</p>
                        <p className={'actor-character'}>{actor.character}</p>
                    </div> : null
                )}
            </div>
        </section> : null
    )
};