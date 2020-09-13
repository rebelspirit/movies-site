import React from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {PercentCircle} from "../PercentCircle";

export const MultiSearch = () => {
    const multiSearch = useSelector((store) => store.client.multiSearch);
    const replaceUrlTitle = (title) => title ? title.replace(/%/g, "-percent").replace(/ /g, "-").toLowerCase() : null;

    return (
        <main>
            <div className={'main-container'}>
                <div className={'row'}>
                    <h2 className={'search-type green'}>
                        <div className="nav-icon">
                            <FontAwesomeIcon icon={"search"} />
                        </div>
                        {multiSearch.length ? `Найдено ${multiSearch.length} совпадений..` : `В каталоге совпадений не найдено`}
                    </h2>
                    <div className={'movies'}>
                        {Object.values(multiSearch).map((content, key) =>
                            <div key={key} className={'movies-item'}>
                                <div className={'item-options-container'}>
                                    <FontAwesomeIcon icon={"ellipsis-v"} />
                                </div>
                                <PercentCircle vote={content.vote_average}/>
                                <NavLink to={content.media_type === "movie" ? `/films/${replaceUrlTitle(content.original_title)}/${content.id}` : `/serials/${replaceUrlTitle(content.original_name)}/${content.id}`}>
                                    {content.media_type !== "person" ? <img src={`https://image.tmdb.org/t/p/w342${content.poster_path}`} alt="poster"/> : <img src={`https://image.tmdb.org/t/p/w342${content.profile_path}`} alt="poster"/>}
                                    <h6>{content.title ? content.title : content.name}</h6>
                                </NavLink>
                                {content.media_type === "movie" && content.release_date ? <p>США, {content.release_date.slice(0, 4)}</p> : null}
                                {content.media_type === "tv" && content.first_air_date ? <p>США, {content.first_air_date.slice(0, 4)}</p> : null}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    )};