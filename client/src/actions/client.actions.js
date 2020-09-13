import {MoviesService} from "../service/movies.service";

export const SET_AUTHENTICATED_TRUE = 'STORE/SET_AUTHENTICATED_TRUE';
export const SET_AUTHENTICATED_FALSE = 'STORE/SET_AUTHENTICATED_FALSE';

export const SET_ACCOUNT_MODAL = 'SET_ACCOUNT_MODAL';
export const setAccountModal = () => ({ type:  SET_ACCOUNT_MODAL });

export const CHANGE_ACTIVE_STATUS = 'CHANGE_ACTIVE_STATUS';
export const changeActiveStatus = () => ({ type:  CHANGE_ACTIVE_STATUS });

export const CLOSE_BURGER = 'CLOSE_BURGER';
export const closeBurger = () => ({ type:  CLOSE_BURGER });

export const CLEAR_STORE_CONTENT_DETAILS = 'CLEAR_STORE_CONTENT_DETAILS';
export const clearStoreContentDetails = () => ({ type:  CLEAR_STORE_CONTENT_DETAILS });


export const IS_LOADING_MOVIES = "IS_LOADING_MOVIES";
export const GET_MOVIES = 'GET_MOVIES';
export function getMoviesFromApi(page, category) {
    return function (dispatch) {
        dispatch({type: IS_LOADING_MOVIES});
        MoviesService.getMovies(page, category)
            .then(movies =>
                dispatch({
                    type: GET_MOVIES,
                    payload: { movies }
                })
            )
    }
}

export const LOAD_MORE_MOVIES = 'LOAD_MORE_MOVIES';
export function loadMoreMovies(page, category) {
    return function (dispatch) {
        MoviesService.getMovies(page, category)
            .then(movies =>
                dispatch({
                    type: LOAD_MORE_MOVIES,
                    payload: { movies }
                })
            )
    }
}

export const IS_LOADING_SERIALS = "IS_LOADING_SERIALS";
export const GET_SERIALS = 'GET_SERIALS';
export function getSerialsFromApi(page, category) {
    return function (dispatch) {
        dispatch({type: IS_LOADING_SERIALS});
        MoviesService.getSerials(page, category)
            .then(serials =>
                dispatch({
                    type: GET_SERIALS,
                    payload: { serials }
                })
            )
    }
}

export const LOAD_MORE_SERIALS = 'LOAD_MORE_SERIALS';
export function loadMoreSerials(page, category) {
    return function (dispatch) {
        MoviesService.getSerials(page, category)
            .then(serials =>
                dispatch({
                    type: LOAD_MORE_SERIALS,
                    payload: { serials }
                })
            )
    }
}

export const GLOBAL_MULTI_SEARCH = 'GLOBAL_MULTI_SEARCH';
export function findDataByMultiSearch(query) {
    return function (dispatch) {
        MoviesService.multiSearch(query)
            .then(content =>
                dispatch({
                    type: GLOBAL_MULTI_SEARCH,
                    payload: { content }
                })
            )
    }
}

export const GET_POPULAR_MOVIES = 'GET_POPULAR_MOVIES';
export function getPopularMovies() {
    return function (dispatch) {
        MoviesService.getPopularMovies()
            .then(popularMovies =>
                dispatch({
                    type: GET_POPULAR_MOVIES,
                    payload: { popularMovies }
                })
            )
    }
}

export const GET_POPULAR_SERIALS = 'GET_POPULAR_SERIALS';
export function getPopularSerials() {
    return function (dispatch) {
        MoviesService.getPopularSerials()
            .then(popularSerials =>
                dispatch({
                    type: GET_POPULAR_SERIALS,
                    payload: { popularSerials }
                })
            )
    }
}

export const GET_CARTOONS = 'GET_CARTOONS';
export function getCartoons() {
    return function (dispatch) {
        MoviesService.getCartoons()
            .then(cartoons =>
                dispatch({
                    type: GET_CARTOONS,
                    payload: { cartoons }
                })
            )
    }
}

export const GET_TVSHOWS = 'GET_TVSHOWS';
export function getTvShows() {
    return function (dispatch) {
        MoviesService.getTvShows()
            .then(tvShows =>
                dispatch({
                    type: GET_TVSHOWS,
                    payload: { tvShows }
                })
            )
    }
}

export const GET_CONTENT_DETAILS = 'GET_CONTENT_DETAILS';
export function getContentDetails(type, id) {
    return function (dispatch) {
        MoviesService.getContentDetails(type, id)
            .then(details =>
                dispatch({
                    type: GET_CONTENT_DETAILS,
                    payload: { details }
                })
            )
    }
}

export const GET_RELATED_CONTENT = 'GET_RELATED_CONTENT';
export function getRelaitedContent(type, id) {
    return function (dispatch) {
        MoviesService.getRelaitedContent(type, id)
            .then(relatedContent =>
                dispatch({
                    type: GET_RELATED_CONTENT,
                    payload: { relatedContent }
                })
            )
    }
}

export const GET_ACTORS_STUFF = 'GET_ACTORS_STUFF';
export function getActorsStuff(type, id) {
    return function (dispatch) {
        MoviesService.getActorsStuff(type, id)
            .then(actorsStuff =>
                dispatch({
                    type: GET_ACTORS_STUFF,
                    payload: { actorsStuff }
                })
            )
    }
}

export const GET_TRENDS_MOVIES_ON_DAY = 'GET_TRENDS_MOVIES_ON_DAY';
export function getTrendsMoviesOnDay() {
    return function (dispatch) {
        MoviesService.getTrendsMoviesOnDay()
            .then(trendsMoviesOnDay =>
                dispatch({
                    type: GET_TRENDS_MOVIES_ON_DAY,
                    payload: { trendsMoviesOnDay }
                })
            )
    }
}

export const GET_TRENDS_SERIALS_ON_DAY = 'GET_TRENDS_SERIALS_ON_DAY';
export function getTrendsSerialsOnDay() {
    return function (dispatch) {
        MoviesService.getTrendsSerialsOnDay()
            .then(trendsSerialsOnDay =>
                dispatch({
                    type: GET_TRENDS_SERIALS_ON_DAY,
                    payload: { trendsSerialsOnDay }
                })
            )
    }
}

export const GET_TRENDS_MOVIES_ON_WEEK = 'GET_TRENDS_MOVIES_ON_WEEK';
export function getTrendsMoviesOnWeek() {
    return function (dispatch) {
        MoviesService.getTrendsMoviesOnWeek()
            .then(trendsMoviesOnWeek =>
                dispatch({
                    type: GET_TRENDS_MOVIES_ON_WEEK,
                    payload: { trendsMoviesOnWeek }
                })
            )
    }
}

export const GET_TRENDS_SERIALS_ON_WEEK = 'GET_TRENDS_SERIALS_ON_WEEK';
export function getTrendsSerialsOnWeek() {
    return function (dispatch) {
        MoviesService.getTrendsSerialsOnWeek()
            .then(trendsSerialsOnWeek =>
                dispatch({
                    type: GET_TRENDS_SERIALS_ON_WEEK,
                    payload: { trendsSerialsOnWeek }
                })
            )
    }
}

export const GET_ON_THE_AIR_SERIALS = 'GET_ON_THE_AIR_SERIALS';
export function getOnTheAirSerials() {
    return function (dispatch) {
        MoviesService.getOnTheAirSerials()
            .then(onTheAirSerials =>
                dispatch({
                    type: GET_ON_THE_AIR_SERIALS,
                    payload: { onTheAirSerials }
                })
            )
    }
}
export const GET_ON_THE_AIR_MOVIES = 'GET_ON_THE_AIR_MOVIES';
export function getOnTheAirMovies() {
    return function (dispatch) {
        MoviesService.getOnTheAirMovies()
            .then(onTheAirMovies =>
                dispatch({
                    type: GET_ON_THE_AIR_MOVIES,
                    payload: { onTheAirMovies }
                })
            )
    }
}
