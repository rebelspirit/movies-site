import React, {useEffect, useState, useCallback} from 'react';
import './index.css';
import {Loader} from "../Loader";
import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {getMoviesFromApi, getSerialsFromApi, loadMoreMovies, loadMoreSerials} from "../../actions/client.actions";
import InfiniteScrollComponent from "react-infinite-scroll-component";
import {NavLink} from "react-router-dom";
import {PercentCircle} from "../PercentCircle";

const initialType = (props) => {
    if(props.match.path.slice(1) === "films" || props.match.path.slice(1) === "cartoons") {return "movie"}
    if(props.match.path.slice(1) === "serials" || props.match.path.slice(1) === "multi-serials") {return "tv"}
};

export const NewFilms = (props) => {
    const movies = useSelector((store) => store.client.movies);
    const serials = useSelector((store) => store.client.serials);
    const type = initialType(props);
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);

    useEffect(() => {
        console.log(props);
        // dispatch(getMoviesFromApi(1, "10752"));
        dispatch(getMoviesFromApi());
        dispatch(getSerialsFromApi());
        setPage(2);
    }, [dispatch, type]);

    const loadMore = useCallback(() => {
        if (type && type === "movie") {
            dispatch(loadMoreMovies(page));
            setPage(page  + 1)
        }
        if (type && type === "tv") {
            dispatch(loadMoreSerials(page));
            setPage(page  + 1)
        }
    }, [page, dispatch, type]);

    const replaceUrlTitle = (title) => title ? title.replace(/%/g, "-percent").replace(/ /g, "-").toLowerCase() : null;

    return (
        <main>
            <div className={'main-container'}>
                <div className={'row'}>
                    <div className="movie-type-container">
                        <h2>Популярные</h2>
                        {type && type === "movie" ?
                            <div className={'movie-type'}>
                            <div className="nav-icon">
                                <FontAwesomeIcon icon={"film"} />
                            </div>
                            <h3>Фильмы</h3>
                        </div>
                            :
                        <div className={'movie-type'}>
                            <div className="nav-icon">
                                <FontAwesomeIcon icon={"tv"} />
                            </div>
                            <h3>Сериалы</h3>
                        </div>}
                    </div>
                    <InfiniteScrollComponent
                        dataLength={type && type === "movie" ? movies.length : serials.length} //This is important field to render the next data
                        next={() => {
                            loadMore();
                            console.log(`Current page: ${page}`)
                        }}
                        hasMore={true}
                        loader={<Loader/>}
                        //onScroll={() => console.log("scroll")} // scroll event listener
                        style={{overflow: "unset"}}
                        initialScrollY={0}
                        endMessage={
                            <p style={{textAlign: 'center'}}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                    >
                        <div className={'movies'}>

                            {type && type === "movie" ? Object.values(movies).map((movie, key) =>
                                <section key={key} className={'movies-item'}>
                                    <div className={'item-options-container'}>
                                        <FontAwesomeIcon icon={"ellipsis-v"} />
                                    </div>
                                    <PercentCircle vote={movie.vote_average}/>
                                    <NavLink to={`/films/${replaceUrlTitle(movie.original_title)}/${movie.id}`}>
                                        <img src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} alt="poster"/>
                                        <h6>{movie.title}</h6>
                                        <p>США, {movie.release_date.slice(0, 4)}</p>
                                    </NavLink>
                                </section>
                            ) : null}

                            {type && type === "tv" ? Object.values(serials).map((serial, key) =>
                                <div key={key} className={'movies-item'}>
                                    <div className={'item-options-container'}>
                                        <FontAwesomeIcon icon={"ellipsis-v"} />
                                    </div>
                                    <PercentCircle vote={serial.vote_average}/>
                                    <NavLink to={`/serials/${replaceUrlTitle(serial.original_name)}/${serial.id}`}>
                                        <img className={'waves-image'} src={`https://image.tmdb.org/t/p/w342${serial.poster_path}`} alt="poster"/>
                                        <h6>{serial.name}</h6>
                                        <p>{serial.origin_country}, {serial.first_air_date.slice(0, 4)}</p>
                                    </NavLink>
                                </div>
                            ) : null}

                        </div>
                    </InfiniteScrollComponent>
                </div>
            </div>
        </main>
    )};