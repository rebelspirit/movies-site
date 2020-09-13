import {
    CHANGE_ACTIVE_STATUS,
    CLOSE_BURGER,
    GET_MOVIES,
    LOAD_MORE_MOVIES,
    GET_SERIALS,
    LOAD_MORE_SERIALS,
    GLOBAL_MULTI_SEARCH,
    IS_LOADING_MOVIES,
    IS_LOADING_SERIALS,
    GET_POPULAR_MOVIES,
    GET_POPULAR_SERIALS,
    GET_CARTOONS,
    GET_TVSHOWS,
    GET_CONTENT_DETAILS,
    CLEAR_STORE_CONTENT_DETAILS,
    GET_RELATED_CONTENT,
    GET_ACTORS_STUFF,
    GET_TRENDS_MOVIES_ON_DAY,
    GET_TRENDS_SERIALS_ON_DAY,
    GET_TRENDS_MOVIES_ON_WEEK,
    GET_TRENDS_SERIALS_ON_WEEK,
    GET_ON_THE_AIR_SERIALS,
    GET_ON_THE_AIR_MOVIES,
    SET_AUTHENTICATED_TRUE,
    SET_AUTHENTICATED_FALSE,
    SET_ACCOUNT_MODAL,
} from "../actions/client.actions";

const initialState = {
    movies: [],
    serials: [],
    popularMovies: [],
    popularSerials: [],
    cartoons: [],
    tvShows: [],
    multiSearch: [],
    relatedContent: [],
    actorsStuff: [],
    trendsMoviesOnDay: [],
    trendsSerialsOnDay: [],
    trendsMoviesOnWeek: [],
    trendsSerialsOnWeek: [],
    onTheAirSerials: [],
    onTheAirMovies: [],
    ContentDetails: {},
    isLoadingServerData: false,
    isAuthenticated: false,
    isLoadingMovies: false,
    isLoadingSerials: false,
    isToggleBurger: false,
    isAccountModalOpen: false
};

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case SET_ACCOUNT_MODAL:
            return {
                ...state, isAccountModalOpen: !state.isAccountModalOpen
            };
        case SET_AUTHENTICATED_TRUE:
            return {
                ...state, isAuthenticated: true
            };
        case SET_AUTHENTICATED_FALSE:
            return {
                ...state, isAuthenticated: false
            };
        case CLOSE_BURGER:
            return {
                ...state, isToggleBurger: false
            };
        case CHANGE_ACTIVE_STATUS:
            return {
                ...state, isToggleBurger: !state.isToggleBurger
            };
        case IS_LOADING_MOVIES:
            return {
                ...state, isLoadingMovies: true
            };
        case GET_MOVIES:
            return {
                ...state, movies: payload.movies, isLoadingMovies: false
            };
        case LOAD_MORE_MOVIES:
            return {
                ...state, movies: [ ...state.movies, ...payload.movies ]
            };
        case IS_LOADING_SERIALS:
            return {
                ...state, isLoadingSerials: true
            };
        case GET_SERIALS:
            return {
                ...state, serials: payload.serials, isLoadingSerials: false
            };
        case LOAD_MORE_SERIALS:
            return {
                ...state, serials: [ ...state.serials, ...payload.serials ]
            };
        case GLOBAL_MULTI_SEARCH:
            return {
                ...state, multiSearch: payload.content
            };
        case GET_POPULAR_MOVIES:
            return {
                ...state, popularMovies: payload.popularMovies
            };
        case GET_POPULAR_SERIALS:
            return {
                ...state, popularSerials: payload.popularSerials
            };
        case GET_CARTOONS:
            return {
                ...state, cartoons: payload.cartoons
            };
        case GET_TVSHOWS:
            return {
                ...state, tvShows: payload.tvShows
            };
        case GET_CONTENT_DETAILS:
            return {
                ...state, ContentDetails: payload.details
            };
        case CLEAR_STORE_CONTENT_DETAILS:
            return {
                ...state, ContentDetails: {}
            };
        case GET_RELATED_CONTENT:
            return {
                ...state, relatedContent: payload.relatedContent
            };
        case GET_ACTORS_STUFF:
            return {
                ...state, actorsStuff: payload.actorsStuff
            };
        case GET_TRENDS_MOVIES_ON_DAY:
            return {
                ...state, trendsMoviesOnDay: payload.trendsMoviesOnDay
            };
        case GET_TRENDS_SERIALS_ON_DAY:
            return {
                ...state, trendsSerialsOnDay: payload.trendsSerialsOnDay
            };
        case GET_TRENDS_MOVIES_ON_WEEK:
            return {
                ...state, trendsMoviesOnWeek: payload.trendsMoviesOnWeek
            };
        case GET_TRENDS_SERIALS_ON_WEEK:
            return {
                ...state, trendsSerialsOnWeek: payload.trendsSerialsOnWeek
            };
        case GET_ON_THE_AIR_SERIALS:
            return {
                ...state, onTheAirSerials: payload.onTheAirSerials
            };
        case GET_ON_THE_AIR_MOVIES:
            return {
                ...state, onTheAirMovies: payload.onTheAirMovies
            };
        default:
            return state
    }
}