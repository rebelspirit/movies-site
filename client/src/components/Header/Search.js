import React, {useState, useRef} from 'react';
import useOnclickOutside from 'react-cool-onclickoutside';
import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {findDataByMultiSearch} from "../../actions/client.actions";
import {useHistory} from "react-router-dom";
import {saveHistoryToServer} from "../../actions/server.actions";
import {useSound} from "../../hooks/sound.hook";

export const Search = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const ref = useRef();
    const userData = useSelector((store) => store.server.userData);
    const isAuthenticated = useSelector((store) => store.client.isAuthenticated);
    const loading = useSelector((store) => store.server.isLoadingServerData);
    const [isOpen, setIsOpen] = useState(false);
    const {playSound} = useSound();


    useOnclickOutside(ref, () => {
        setIsOpen(false);
    });

    const toggle = () => setIsOpen(!isOpen);

    const sendSearchRequest = (query) => {
        const input = document.querySelector("input");

        const send = (query) => {
            dispatch(findDataByMultiSearch(query));
            history.push("/search");
            playSound('tap');
            input.value = "";
            toggle();
        };

        if (input.value.length !== 0 && input.value.length >= 3) {
            if(isAuthenticated) {
                saveHistory(input.value, userData.history);
            }
            send(input.value)
        }
        if (query) {
            send(query)
        }
    };

    const searchWhenEnterPress = (event) => {
        if(event.charCode === 13) {
            sendSearchRequest();
        }
    };

    const saveHistory = async (query, userHistory) => {

        try {
            if (userHistory.length === 6) {
                userHistory.pop();
                userHistory.unshift(query);
            } else {
                userHistory.unshift(query);
            }

            dispatch(saveHistoryToServer({
                email: userData.email,
                history: userHistory
            }));

        } catch (e) {}
    };

    return (
        <div className={'search-container'}>
            <div className={'search-field'}>
                <input type="text"
                       placeholder={'Введите запрос'}
                       onKeyPress={searchWhenEnterPress}
                       onFocus={toggle}
                />
                <button type={'button'}
                        disabled={loading}
                        onClick={sendSearchRequest}>
                    <FontAwesomeIcon icon={'search'} />
                </button>
            </div>
            <div className={isOpen ? "search-history search-history-active" : "search-history"} ref={ref}>
                {isAuthenticated && userData.history ? Object.values(userData.history).map((query, key) =>
                    <p key={key}
                       className={'search-item'}
                       onClick={() => sendSearchRequest(query)}
                    >
                        {query}
                        <FontAwesomeIcon icon={'external-link-alt'} />
                    </p>
                ) : null}
            </div>
        </div>
    );
};