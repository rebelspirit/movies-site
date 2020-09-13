import {SAVE_HISTORY, CLEAN_USER_DATA, SET_SOUNDS_EFFECT, SET_NIGHT_MODE} from "../actions/server.actions";

export function saveToLocalStorageMiddleware({getState}) {
    return function(next) {
        return function(action) {
            const store = getState();
            if (action.type === SAVE_HISTORY) {
                localStorage.setItem('userData', JSON.stringify(store.server.userData));
            } else if (action.type === CLEAN_USER_DATA) {
                localStorage.setItem('userData', JSON.stringify(null));
            } else if (action.type === SET_SOUNDS_EFFECT) {
                localStorage.setItem('userData', JSON.stringify({...store.server.userData, sounds: !store.server.userData.sounds}));
            } else if (action.type === SET_NIGHT_MODE) {
                localStorage.setItem('userData', JSON.stringify({...store.server.userData, nightMode: !store.server.userData.nightMode}));
            }

            return next(action);
        }
    }
}