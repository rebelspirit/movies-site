import React, {useEffect, useState} from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useDispatch, useSelector} from "react-redux";
import {
    getOnTheAirMovies,
    getOnTheAirSerials,
    getTrendsMoviesOnDay, getTrendsMoviesOnWeek,
    getTrendsSerialsOnDay,
    getTrendsSerialsOnWeek
} from '../../actions/client.actions';
import {NavLink, useHistory} from "react-router-dom";
import {useSound} from "../../hooks/sound.hook";
import {TrendsButton} from "./TrendsButton";

export const Trends = () => {
    const onTheAirSerials = useSelector((store) => store.client.onTheAirSerials);
    const onTheAirMovies = useSelector((store) => store.client.onTheAirMovies);
    const trendsMoviesOnDay = useSelector((store) => store.client.trendsMoviesOnDay);
    const trendsSerialsOnDay = useSelector((store) => store.client.trendsSerialsOnDay);
    const trendsMoviesOnWeek = useSelector((store) => store.client.trendsMoviesOnWeek);
    const trendsSerialsOnWeek = useSelector((store) => store.client.trendsSerialsOnWeek);
    const dispatch = useDispatch();
    const history = useHistory();
    const [backdrop, setBackdrop] = useState(null);
    const [isSerialsOnTheAir, setIsSerialsOnTheAir] = useState(true);
    const [isTrendSerialsOnTheDay, setIsTrendSerialsOnTheDay] = useState(true);
    const [isTrendMoviesOnTheDay, setIsTrendMoviesOnTheDay] = useState(true);

    const {playSound} = useSound();

    const replaceUrlTitle = (title) => title ? title.replace(/ /g, "-").toLowerCase() : null;

    const pushToContentDetails = (type, item) => {
        if (type) {
            history.push(`/serials/${replaceUrlTitle(item.original_name)}/${item.id}`);
        } else {
            history.push(`/films/${replaceUrlTitle(item.original_title)}/${item.id}`);
        }
    };

    useEffect(() => {
        dispatch(getOnTheAirSerials());
        dispatch(getOnTheAirMovies());
        dispatch(getTrendsSerialsOnDay());
        dispatch(getTrendsMoviesOnDay());
        dispatch(getTrendsSerialsOnWeek());
        dispatch(getTrendsMoviesOnWeek());
    }, [dispatch]);

    useEffect(() => {
        if(isSerialsOnTheAir && onTheAirSerials.length) {
            setBackdrop(onTheAirSerials[0].backdrop_path)
        }
        if (!isSerialsOnTheAir && onTheAirMovies.length) {
            setBackdrop(onTheAirMovies[0].backdrop_path)
        }
    }, [onTheAirSerials, onTheAirMovies, isSerialsOnTheAir]);

    return (
        <main>
            <div className={"trends-container"}>
                {backdrop ? <div className={'trends-background'} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280${backdrop})` }}>
                    <div className={"trends-header"}>
                        <h2>Что популярно</h2>
                        <div className="selector-wrap">
                            <TrendsButton id={1}
                                          firstButton={'По ТВ'}
                                          secondButton={'В кинотеатрах'}
                                          changeContent={setIsSerialsOnTheAir}
                                          content={isSerialsOnTheAir}
                            />
                        </div>
                    </div>
                    <section className={"trends-wrapper"}>
                        {Object.values(isSerialsOnTheAir ? onTheAirSerials : onTheAirMovies).map((item, key) =>
                            item.backdrop_path ? <div className="trends-item"
                                 key={key}
                                 onMouseEnter={() => setBackdrop(item.backdrop_path)}
                                 onTouchStart={() => setBackdrop(item.backdrop_path)}
                            >
                                {item ?
                                    <>
                                        <div className={'item-options-container'}>
                                            <FontAwesomeIcon icon={"ellipsis-v"} />
                                        </div>
                                        <div className={'item-play-container'}
                                            onClick={() => pushToContentDetails(isSerialsOnTheAir, item)}
                                            onMouseDown={() => playSound('rush')}
                                        >
                                            <FontAwesomeIcon icon={"play"} />
                                        </div>
                                    </> : null}
                                <NavLink to={`/${isSerialsOnTheAir ? 'serials' : 'films'}/${replaceUrlTitle(isSerialsOnTheAir ? item.original_name : item.original_title)}/${item.id}`}
                                         onClick={() => playSound('rush')}>
                                    <img src={`https://image.tmdb.org/t/p/w780${item.backdrop_path}`} alt="poster"/>
                                    <h6>{isSerialsOnTheAir ? item.name : item.title}</h6>
                                    <p>{isSerialsOnTheAir ? item.first_air_date.slice(0, 4) : item.release_date.slice(0, 4)}</p>
                                </NavLink>
                            </div> : null
                        )}
                    </section>
                </div> : null}

                {backdrop ? <div className={'trends-background-second'}>
                    <div className={"trends-header second-header"}>
                        <h2>В тренде "Сериалы"</h2>
                        <div className="selector-wrap">
                            <TrendsButton id={2}
                                          firstButton={'Сегодня'}
                                          secondButton={'На этой неделе'}
                                          changeContent={setIsTrendSerialsOnTheDay}
                                          content={isTrendSerialsOnTheDay}
                            />
                        </div>
                    </div>
                    <section className={"trends-wrapper wrapper-second"}>
                        {Object.values(isTrendSerialsOnTheDay ? trendsSerialsOnDay : trendsSerialsOnWeek).map((item, key) =>
                            item.backdrop_path ? <div className="trends-item" key={key}>
                                {item ?
                                    <>
                                        <div className={'item-options-container'}>
                                            <FontAwesomeIcon icon={"ellipsis-v"} />
                                        </div>
                                        <div className={'item-play-container'}
                                             onClick={() => pushToContentDetails(isTrendSerialsOnTheDay, item)}
                                             onMouseDown={() => playSound('rush')}
                                        >
                                            <FontAwesomeIcon icon={"play"} />
                                        </div>
                                    </> : null}
                                <NavLink to={`/serials/${replaceUrlTitle(item.original_name)}/${item.id}`}
                                         onClick={() => playSound('rush')}>
                                    <img src={`https://image.tmdb.org/t/p/w780${item.backdrop_path}`} alt="poster"/>
                                    <h6>{item.name}</h6>
                                    <p>{item.first_air_date.slice(0, 4)}</p>
                                </NavLink>
                            </div> : null
                        )}
                    </section>
                </div> : null }

                {backdrop ? <div className={'trends-background-second'}>
                    <div className={"trends-header second-header"}>
                        <h2>В тренде "Фильмы"</h2>
                        <div className="selector-wrap">
                            <TrendsButton id={3}
                                          firstButton={'Сегодня'}
                                          secondButton={'На этой неделе'}
                                          changeContent={setIsTrendMoviesOnTheDay}
                                          content={isTrendMoviesOnTheDay}
                            />
                        </div>
                    </div>
                    <section className={"trends-wrapper wrapper-second"}>
                        {Object.values(isTrendMoviesOnTheDay ? trendsMoviesOnDay : trendsMoviesOnWeek).map((item, key) =>
                            item.backdrop_path ? <div className="trends-item" key={key}>
                                {item ?
                                    <>
                                        <div className={'item-options-container'}>
                                            <FontAwesomeIcon icon={"ellipsis-v"} />
                                        </div>
                                        <div className={'item-play-container'}
                                             onClick={() => pushToContentDetails(isTrendMoviesOnTheDay, item)}
                                             onMouseDown={() => playSound('rush')}
                                        >
                                            <FontAwesomeIcon icon={"play"} />
                                        </div>
                                    </> : null}
                                <NavLink to={`/films/${replaceUrlTitle(item.original_title)}/${item.id}`}
                                         onClick={() => playSound('rush')}>
                                    <img src={`https://image.tmdb.org/t/p/w780${item.backdrop_path}`} alt="poster"/>
                                    <h6>{item.title}</h6>
                                    <p>{item.release_date.slice(0, 4)}</p>
                                </NavLink>
                            </div> : null
                        )}
                    </section>
                </div> : null }
            </div>
        </main>
    )
};