import React, {useEffect} from 'react';
import './index.css';
import {useDispatch, useSelector} from "react-redux";
import {getRelaitedContent} from "../../actions/client.actions";
import {NavLink} from "react-router-dom";
import {useSound} from "../../hooks/sound.hook";

export const RelatedContent = (props) => {
    const relatedContent = useSelector((store) => store.client.relatedContent);
    const dispatch = useDispatch();
    const {playSound} = useSound();

    useEffect(() => {
        dispatch(getRelaitedContent(props.type, props.id));
    }, [props.id, props.type, dispatch]);

    const replaceUrlTitle = (title) => title ? title.replace(/ /g, "-").toLowerCase() : null;

    return (
        relatedContent.length ? <section className={"related-content-container"}>
            <h6>Похожий материал:</h6>
            <div className={"related-content"}>
                {Object.values(relatedContent).map((content, key) =>
                    content.poster_path ? <div className={"related-content-item"} key={key}>
                        {props.type === "movie" ? <NavLink to={`/${props.urlType}/${replaceUrlTitle(content.original_title)}/${content.id}`} onClick={() => playSound('rush')}>
                            <img src={`https://image.tmdb.org/t/p/w342${content.poster_path}`} alt="poster"/>
                            <p>{content.title}</p>
                        </NavLink> : null}
                        {props.type === "tv" ? <NavLink to={`/${props.urlType}/${replaceUrlTitle(content.original_name)}/${content.id}`} onClick={() => playSound('rush')}>
                            <img src={`https://image.tmdb.org/t/p/w342${content.poster_path}`} alt="poster"/>
                            <p>{content.name}</p>
                        </NavLink> : null}
                    </div> : null
                )}
            </div>
        </section> : null
    )
};
