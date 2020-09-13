import React from 'react';
import './index.css';
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { useSelector } from 'react-redux'
import {PercentCircle} from "../PercentCircle";
import {useSound} from "../../hooks/sound.hook";

export const Main = () => {
    const popularMovies = useSelector((store) => store.client.popularMovies);
    const popularSerials = useSelector((store) => store.client.popularSerials);
    const cartoons = useSelector((store) => store.client.cartoons);
    const tvShows = useSelector((store) => store.client.tvShows);

    const {playSound} = useSound();

    const replaceUrlTitle = (title) => title ? title.replace(/%/g, "-percent").replace(/ /g, "-").toLowerCase() : null;

    return (
        <main>
            <div className={'main-container'}>
                {/*{popularMovies.length ? <div className={'row'}>*/}
                {/*    <NavLink to={"/films"} className={'movie-type blue'}>*/}
                {/*        <div className="nav-icon">*/}
                {/*            <FontAwesomeIcon icon={"film"} />*/}
                {/*        </div>*/}
                {/*        Фильмы*/}
                {/*    </NavLink>*/}
                {popularMovies.length ? <div className={'row'}>
                    <div className="movie-type-container">
                        <h2>Популярные</h2>
                        <NavLink to={"/films"} className={'movie-type'}>
                            <div className="nav-icon">
                                <FontAwesomeIcon icon={"film"} />
                            </div>
                            <h3>Фильмы</h3>
                        </NavLink>
                    </div>
                    <div className={'movies movies-mobile-mainpage'}>
                        {Object.values(popularMovies).slice(0, 16).map((movie, key) =>
                            <div key={key} className={'movies-item'}>
                                <div className={'item-options-container'}>
                                    <FontAwesomeIcon icon={"ellipsis-v"} />
                                </div>
                                <PercentCircle vote={movie.vote_average}/>
                                <NavLink to={`/films/${replaceUrlTitle(movie.original_title)}/${movie.id}`}
                                         onClick={() => playSound('rush')}
                                >
                                    <img className={'waves-image'} src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} alt="poster"/>
                                    <h6>{movie.title}</h6>
                                    <p>США, {movie.release_date.slice(0, 4)}</p>
                                </NavLink>
                            </div>
                        )}
                    </div>
                </div> : null}
                {/*{popularSerials.length ? <div className={'row'}>*/}
                {/*    <NavLink to={"/serials"} className={'movie-type green'}>*/}
                {/*        <div className="nav-icon">*/}
                {/*            <FontAwesomeIcon icon={"tv"} />*/}
                {/*        </div>*/}
                {/*        Сериалы*/}
                {/*    </NavLink>*/}
                {popularSerials.length ? <div className={'row'}>
                    <div className="movie-type-container">
                        <h2>Популярные</h2>
                        <NavLink to={"/serials"} className={'movie-type'}>
                            <div className="nav-icon">
                                <FontAwesomeIcon icon={"tv"} />
                            </div>
                            <h3>Сериалы</h3>
                        </NavLink>
                    </div>
                    <div className={'movies movies-mobile-mainpage'}>
                        {Object.values(popularSerials).slice(0, 16).map((serial, key) =>
                            <div key={key} className={'movies-item'}>
                                <div className={'item-options-container'}>
                                    <FontAwesomeIcon icon={"ellipsis-v"} />
                                </div>
                                <PercentCircle vote={serial.vote_average}/>
                                <NavLink to={`/serials/${replaceUrlTitle(serial.original_name)}/${serial.id}`}
                                         onClick={() => playSound('rush')}
                                >
                                    <img className={'waves-image'} src={`https://image.tmdb.org/t/p/w342${serial.poster_path}`} alt="poster"/>
                                    <h6>{serial.name}</h6>
                                    <p>{serial.origin_country}, {serial.first_air_date.slice(0, 4)}</p>
                                </NavLink>
                            </div>
                        )}
                    </div>
                </div> : null}
                {/*{cartoons.length ? <div className={'row'}>*/}
                {/*    <NavLink to={"/films/cartoons"} className={'movie-type blue'}>*/}
                {/*        <div className="nav-icon">*/}
                {/*            <FontAwesomeIcon icon={"baby"} />*/}
                {/*        </div>*/}
                {/*        Мультфильмы*/}
                {/*    </NavLink>*/}
                {cartoons.length ? <div className={'row'}>
                    <div className="movie-type-container movie-type-container-large">
                        <h2>Популярные</h2>
                        <NavLink to={"/films/childly"} className={'movie-type movie-type-large'}>
                            <div className="nav-icon">
                                <FontAwesomeIcon icon={"baby"} />
                            </div>
                            <h3>Мультфильмы</h3>
                        </NavLink>
                    </div>
                    <div className={'movies movies-mobile-mainpage'}>
                        {Object.values(cartoons).slice(0, 16).map((cartoons, key) =>
                            <div key={key} className={'movies-item'}>
                                <div className={'item-options-container'}>
                                    <FontAwesomeIcon icon={"ellipsis-v"} />
                                </div>
                                <PercentCircle vote={cartoons.vote_average}/>
                                <NavLink to={`/cartoons/${replaceUrlTitle(cartoons.original_title)}/${cartoons.id}`}
                                         onClick={() => playSound('rush')}
                                >
                                    <img className={'waves-image'} src={`https://image.tmdb.org/t/p/w342${cartoons.poster_path}`} alt="poster"/>
                                    <h6>{cartoons.title}</h6>
                                    <p>США, {cartoons.release_date.slice(0, 4)}</p>
                                </NavLink>
                            </div>
                        )}
                    </div>
                </div> : null}
                {/*{tvShows.length ? <div className={'row'}>*/}
                {/*    <NavLink to={"/serials/cartoons"} className={'movie-type green'}>*/}
                {/*        <div className="nav-icon">*/}
                {/*            <FontAwesomeIcon icon={"video"} />*/}
                {/*        </div>*/}
                {/*        Мультсериалы*/}
                {/*    </NavLink>*/}
                {tvShows.length ? <div className={'row'}>
                    <div className="movie-type-container movie-type-container-large">
                        <h2>Популярные</h2>
                        <NavLink to={"/serials"} className={'movie-type movie-type-large'}>
                            <div className="nav-icon">
                                <FontAwesomeIcon icon={"video"} />
                            </div>
                            <h3>Мультсериалы</h3>
                        </NavLink>
                    </div>
                    <div className={'movies movies-mobile-mainpage'}>
                        {Object.values(tvShows).slice(0, 16).map((multiSerials, key) =>
                            <div key={key} className={'movies-item'}>
                                <div className={'item-options-container'}>
                                    <FontAwesomeIcon icon={"ellipsis-v"} />
                                </div>
                                <PercentCircle vote={multiSerials.vote_average}/>
                                <NavLink to={`/multi-serials/${replaceUrlTitle(multiSerials.original_name)}/${multiSerials.id}`}
                                         onClick={() => playSound('rush')}
                                >
                                    <img className={'waves-image'} src={`https://image.tmdb.org/t/p/w342${multiSerials.poster_path}`} alt="poster"/>
                                    <h6>{multiSerials.name}</h6>
                                    <p>США, {multiSerials.first_air_date.slice(0, 4)}</p>
                                </NavLink>
                            </div>
                        )}
                    </div>
                </div> : null}
            </div>
        </main>
    )
};
