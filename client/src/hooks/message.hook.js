import {useCallback} from 'react';
import { useToasts } from 'react-toast-notifications';

export const useMessage = () => {
    const { addToast } = useToasts();

    return useCallback((text, type) => {
        if (text && type) {
            addToast(text, {
                appearance: type,
                autoDismiss: true,
            });
        }
    }, [addToast])
};