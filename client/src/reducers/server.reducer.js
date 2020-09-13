import {
    IS_LOADING_SERVER_DATA,
    SAVE_HISTORY,
    MAKE_REGISTER,
    SAVE_USER_DATA,
    SET_SOUNDS_EFFECT,
    SET_NIGHT_MODE, CLEAN_USER_DATA
} from "../actions/server.actions";

const initialState = {
    userData: {
        sounds: true,
        nightMode: true
    }
};

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case IS_LOADING_SERVER_DATA:
            return {
                ...state, isLoadingServerData: true
            };
        case MAKE_REGISTER:
            return {
                ...state, userData: payload.data, isLoadingServerData: false
            };
        case SAVE_HISTORY:
            return {
                ...state, userData: {...state.userData, ...payload.data}, isLoadingServerData: false
            };
        case SAVE_USER_DATA:
            return {
                ...state, userData: payload.data
            };
        case SET_SOUNDS_EFFECT:
            return {
                ...state, userData: {...state.userData, sounds: !state.userData.sounds}, isLoadingServerData: false
            };
        case SET_NIGHT_MODE:
            return {
                ...state, userData: {...state.userData, nightMode: !state.userData.nightMode}, isLoadingServerData: false
            };
        case CLEAN_USER_DATA:
            return {
                ...state, userData: {}
            };
        default:
            return state
    }
}