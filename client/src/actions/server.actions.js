import {ServerService} from "../service/server.service";
import {SET_ACCOUNT_MODAL, SET_AUTHENTICATED_FALSE, SET_AUTHENTICATED_TRUE} from "./client.actions";

export const IS_LOADING_SERVER_DATA = 'SERVER/IS_LOADING_DATA';

export const START_PARSING = 'STORE/START_PARSING';
export function startParsingContent() {
    return function (dispatch) {
        ServerService.parsingContent()
            .then(data =>
                console.log(data)
            )
    }
}

export const MAKE_REGISTER = 'SERVER/MAKE_REGISTER';
export function sendRegisterDataToServer(data) {
    return function (dispatch) {
        dispatch({type: IS_LOADING_SERVER_DATA});
        ServerService.register(data)
            .then(data =>
                dispatch({
                    type: MAKE_REGISTER,
                    payload: { data }
                })
            )
    }
}
export const SAVE_HISTORY = 'SERVER/SAVE_HISTORY';
export function saveHistoryToServer(data) {
    return function (dispatch) {
        dispatch({type: IS_LOADING_SERVER_DATA});
        ServerService.saveHistory(data)
            .then(data =>
                dispatch({
                    type: SAVE_HISTORY,
                    payload: { data }
                })
            )
    }
}

export const SET_NIGHT_MODE = 'STORE/SET_NIGHT_MODE';
export function setNightMode(data) {
    return function (dispatch) {
        dispatch({type: IS_LOADING_SERVER_DATA});
        ServerService.nightMode(data)
            .then(data =>
                dispatch({
                    type: SET_NIGHT_MODE,
                    payload: { data }
                })
            )
    }
}

export const SET_SOUNDS_EFFECT = 'STORE/SET_SOUNDS_EFFECT';
export function setSoundsEffect(data) {
    return function (dispatch) {
        dispatch({type: IS_LOADING_SERVER_DATA});
        ServerService.sounds(data)
            .then(data =>
                dispatch({
                    type: SET_SOUNDS_EFFECT,
                    payload: { data }
                })
            )
    }
}

export const SAVE_USER_DATA = 'STORE/SAVE_USER_DATA';
export function saveUserData(data = {}) {
    return function (dispatch) {
        dispatch({type: SET_AUTHENTICATED_TRUE});
        dispatch({
            type: SAVE_USER_DATA,
            payload: { data }
        })
    }
}

export const CLEAN_USER_DATA = 'STORE/CLEAN_USER_DATA';
export function cleanUserData(data = {}) {
    return function (dispatch) {
        dispatch({type: SET_AUTHENTICATED_FALSE});
        dispatch({type: SET_ACCOUNT_MODAL});
        dispatch({
            type: CLEAN_USER_DATA,
            payload: { data }
        })
    }
}
