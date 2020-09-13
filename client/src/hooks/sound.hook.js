import {useCallback} from 'react';
import like from '../assets/sounds/state-change_confirm-up.mp3';
import dislike from '../assets/sounds/state-change_confirm-down.mp3';
import rush from "../assets/sounds/navigation_transition-right.mp3";
import lock from '../assets/sounds/ui_lock.mp3';
import unlock from "../assets/sounds/ui_unlock.mp3";
import tap from '../assets/sounds/ui_tap-variant-04.mp3';
import selection from '../assets/sounds/navigation_forward-selection-minimal.mp3';
import selection_out from '../assets/sounds/navigation_backward-selection-minimal.mp3';
import refresh from '../assets/sounds/ui_refresh-feed.mp3';
import error from '../assets/sounds/alert_error.mp3';
import success from '../assets/sounds/ui-notification.mp3';
import {useSelector} from "react-redux";

export const useSound = () => {
    const sounds = useSelector((store) => store.server.userData.sounds);
    const likeAudio = new Audio(like);
    const dislikeAudio = new Audio(dislike);
    const rushAudio = new Audio(rush);
    const lockAudio = new Audio(lock);
    const unlockAudio = new Audio(unlock);
    const tapAudio = new Audio(tap);
    const selectionAudio = new Audio(selection);
    const selectionOutAudio = new Audio(selection_out);
    const refreshAudio = new Audio(refresh);
    const errorAudio = new Audio(error);
    const successAudio = new Audio(success);


    const playSound = useCallback(async type => {
        if (sounds) {
            switch (type) {
                case 'like':
                    await likeAudio.play();
                    break;
                case 'dislike':
                    await dislikeAudio.play();
                    break;
                case 'rush':
                    await rushAudio.play();
                    break;
                case 'lock':
                    await lockAudio.play();
                    break;
                case 'unlock':
                    await unlockAudio.play();
                    break;
                case 'tap':
                    await tapAudio.play();
                    break;
                case 'selection':
                    await selectionAudio.play();
                    break;
                case 'selection_out':
                    await selectionOutAudio.play();
                    break;
                case 'refresh':
                    await refreshAudio.play();
                    break;
                case 'error':
                    await errorAudio.play();
                    break;
                case 'success':
                    await successAudio.play();
                    break;
                default:
                    return null
            }
        }
    }, [sounds, likeAudio, dislikeAudio, rushAudio, lockAudio, unlockAudio, tapAudio, selectionAudio, selectionOutAudio, refreshAudio, errorAudio, successAudio]);

    return {playSound}
};

