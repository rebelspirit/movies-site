import React, {useEffect, useState} from 'react'
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {NavLink, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import {closeBurger} from "../../actions/client.actions";
import {getMoviesFromApi, getSerialsFromApi} from "../../actions/client.actions";
import {useSound} from "../../hooks/sound.hook";

export const LeftSideBar = () => {
    const isToggledBurger = useSelector((store) => store.client.isToggleBurger);
    const dispatch = useDispatch();
    const history = useHistory();
    const [isChevronOpen, setChevronOpen] = useState(
        {0: false, 1: false}
);

    const {playSound} = useSound();

    useEffect(() => {
        cleanStyleOfSublinks();
    }, [isToggledBurger]);

    const menu = {
        main: {
            home: {
                name: "Главная",
                icon: "home",
                link: "/",
                sublinks: {}
            },
            trends: {
                name: "В тренде",
                icon: "fire",
                link: "/trends",
                sublinks: {}
            },

        },
        movies: {
            films: {
                name: "Фильмы",
                icon: "film",
                link: "/films",
                type: "movies",
                sublinks: {
                    drama: {
                        name: "Драма",
                        link: "/drama",
                        id: "18"
                    },
                    military: {
                        name: "Военный",
                        link: "/military",
                        id: "10752"
                    },
                    crime: {
                        name: "Криминал",
                        link: "/crime",
                        id: "80"
                    },
                    adventure: {
                        name: "Приключения",
                        link: "/adventure",
                        id: "12"
                    },
                    thriller: {
                        name: "Триллер",
                        link: "/thriller",
                        id: "53"
                    },
                    detective: {
                        name: "Детектив",
                        link: "/detective",
                        id: "9648"
                    },
                    history: {
                        name: "История",
                        link: "/history",
                        id: "36"
                    },
                    melodrama: {
                        name: "Мелодрама",
                        link: "/melodrama",
                        id: "10749"
                    },
                    horrors: {
                        name: "Ужасы",
                        link: "/horrors",
                        id: "27"
                    },
                    childly: {
                        name: "Детский",
                        link: "/childly",
                        id: "16"
                    },
                    comedy: {
                        name: "Комедия",
                        link: "/comedy",
                        id: "35"
                    },
                    music: {
                        name: "Музыка",
                        link: "/music",
                        id: "10402"
                    },
                    family: {
                        name: "Семейный",
                        link: "/family",
                        id: "10751"
                    },
                    syfy: {
                        name: "Фантастика",
                        link: "/syfy",
                        id: "878"
                    },
                    fight_movie: {
                        name: "Боевик",
                        link: "/thriller",
                        id: "28"
                    },
                    western: {
                        name: "Вестерн",
                        link: "/western",
                        id: "37"
                    },
                    documentary: {
                        name: "Документальный",
                        link: "/documentary",
                        id: "99"
                    },
                    fantasy: {
                        name: "Фэнтези",
                        link: "/fantasy",
                        id: "14"
                    },
                }
            },
            serials: {
                name: "Сериалы",
                icon: "tv",
                link: "/serials",
                type: "serials",
                sublinks: {
                    adventure: {
                        name: "Приключения",
                        link: "/adventure",
                        id: "10759",
                    },
                    cartoons: {
                        name: "Мультфильм",
                        id: "16"
                    },
                    comedy: {
                        name: "Комедия",
                        id: "35"
                    },
                    crime: {
                        name: "Криминал",
                        id: "80"
                    },
                    documentary: {
                        name: "Документальный",
                        id: "99"
                    },
                    drama: {
                        name: "Драма",
                        id: "18"
                    },
                    family: {
                        name: "Семейный",
                        id: "10751"
                    },
                    childly: {
                        name: "Детский",
                        id: "10762"
                    },
                    detective: {
                        name: "Детектив",
                        id: "9648"
                    },
                    news: {
                        name: "Новости",
                        id: "10763"
                    },
                    tvShow: {
                        name: "Реалити-шоу",
                        id: "10764"
                    },
                    fantasy: {
                        name: "Фэнтези",
                        id: "10765"
                    },
                    opera: {
                        name: "Опера",
                        id: "10766"
                    },
                    war: {
                        name: "Военный",
                        id: "10768"
                    },
                    western: {
                        name: "Вестерн",
                        id: "37"
                    },
                }
            },
            cartoons: {
                name: "Мультфильмы",
                icon: "baby",
                link: "/cartoons",
                sublinks: {},
            },
            tvshows: {
                name: "Мультсериалы",
                icon: "video",
                link: "/multi-serials",
                sublinks: {},
            },
            collections: {
                name: "Коллекции",
                icon: "list",
                link: "/collections",
                sublinks: {},
            },
        },
        user: {
            library: {
                name: "Библиотека",
                icon: "folder",
                link: "/library",
                sublinks: {}
            },
            history: {
                name: "История",
                icon: "history",
                link: "/history",
                sublinks: {}
            },
            watchLater: {
                name: "Посмотреть позже",
                icon: "clock",
                link: "/watchlater",
                sublinks: {}
            },
            liked: {
                name: "Понравившиеся",
                icon: "thumbs-up",
                link: "/liked",
                sublinks: {}
            }
        },
        other: {
            settings: {
                name: "Настройски",
                icon: "cog",
                link: "/settings",
                sublinks: {}
            },
            complaints: {
                name: "Жалобы",
                icon: "flag",
                link: "/complaints",
                sublinks: {}
            },
            reference: {
                name: "Справка",
                icon: "question-circle",
                link: "/reference",
                sublinks: {}
            },
            feedback: {
                name: "Отправить отзыв",
                icon: "comment-alt",
                link: "/feedback",
                sublinks: {}
            }
        }
    };

    const cleanStyleOfSublinks = () => {
        const sublinks = document.querySelectorAll('.sublinks');
        const arrow = document.querySelectorAll('.nav-icon-right');

        sublinks.forEach((item) => {
            item.classList.remove('sublinks-item-active');
        });
        arrow.forEach((item) => {
            item.classList.remove('arrow-rotate');
        });
    };

    const openSublinksMenu = (type) => {
        const sublinks = document.querySelectorAll('.sublinks');
        const arrow = document.querySelectorAll('.nav-icon-right');

        sublinks.forEach((item) => {
            if(item.getAttribute('content-type') === type) {
                item.classList.toggle('sublinks-item-active');
            }
        });

        arrow.forEach((item) => {
            if(item.getAttribute('content-type') === type) {
                item.classList.toggle('arrow-rotate');
            }
        });

    };

    const pushToCheckedCategory = (page, id, type, sublink) => {
        if (type === "movies"){
            dispatch(getMoviesFromApi(page, id));
            history.push(`/films${sublink}`);
        }
        if (type === "serials"){
            dispatch(getSerialsFromApi(page, id));
            history.push(`/serials${sublink}`);
        }
        dispatch(closeBurger())
    };

    return (
        <aside style={isToggledBurger ? {maxWidth: "240px"} : null}>
            {Object.values(menu).map((menu, key) =>
                <nav key={key} className={'navigation'}>
                    {Object.values(menu).map((item, key) =>
                        <ul key={key} className={'item'}>
                            <div className={"button-container"}>
                                <NavLink to={item.link}
                                         className={'itemName'}
                                         onClick={() => dispatch(closeBurger())}
                                         onMouseDown={() => playSound('tap')}
                                >
                                    <div className="nav-icon">
                                        <FontAwesomeIcon icon={item.icon} />
                                    </div>
                                    <h5 style={isToggledBurger ? {display: "block"} : {display: "none"}}>{item.name}</h5>
                                </NavLink>
                                {Object.keys(item.sublinks).length > 0 ?
                                    <div className="nav-icon-right"
                                         style={isToggledBurger ? {display: "flex"} : {display: "none"}}
                                         onClick={() => openSublinksMenu(item.type)}
                                         onMouseDown={() => {
                                             setChevronOpen({...isChevronOpen, [key] : !isChevronOpen[key]});
                                             isChevronOpen[key] ? playSound('selection_out') : playSound('selection')
                                         }}
                                         content-type={item.type}>
                                        <FontAwesomeIcon icon={"chevron-down"}/>
                                    </div> : null}
                            </div>
                            {Object.values(item.sublinks).map((sub, key) =>
                                <li
                                    className={"sublinks"}
                                    key={key}
                                    content-type={item.type}
                                    onClick={() => pushToCheckedCategory(1, sub.id, item.type, sub.link)}
                                    onMouseDown={() => playSound('tap')}
                                >
                                    <div className="sublinks-item" style={isToggledBurger ? {display: "block"} : {display: "none"}}>
                                        <p>{sub.name}</p>
                                    </div>
                                </li>
                            )}
                        </ul>)}
                </nav>)}
        </aside>
    )
};