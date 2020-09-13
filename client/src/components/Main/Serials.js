import React, {Component} from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InfiniteScroll from 'react-infinite-scroller';
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import {Loader} from "../Loader";
import {bindActionCreators} from "redux";
import {getSerialsFromApi, loadMoreSerials} from "../../actions/client.actions";
import {PercentCircle} from "../PercentCircle";

class Serials extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: null,
            isOpenCategory: false,
            currentCategory: "",
            openWidth: {
                paddingLeft: "240px"
            },
            closedWidth: {
                paddingLeft: "60px"
            },
            serialsNavigation: {
                firstColumn: {
                    adventure: {
                        name: "Приключения",
                        id: "10759"
                    },
                    cartoons: {
                        name: "Мультфильм",
                        id: "16"
                    },
                    comedy: {
                        name: "Комедия",
                        id: "35"
                    },
                },
                secondColumn: {
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
                },
                thirdColumn: {
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
                },
                fourthColumn: {
                    news: {
                        name: "Новости",
                        id: "10763"
                    },
                    twshow: {
                        name: "Реалити-шоу",
                        id: "10764"
                    },
                    fantasy: {
                        name: "Фэнтези",
                        id: "10765"
                    },
                },
                fivesColumn: {
                    opera: {
                        name: "Опера",
                        id: "10766"
                    },
                    war: {
                        name: "Война",
                        id: "10768"
                    },
                    western: {
                        name: "Вестерн",
                        id: "37"
                    },
                }
            }
        };
    };

    setCategory = (id) => {
        this.setState({
            currentCategory: id,
            page: 1,
        }, () => this.props.getSerialsFromApi(1, this.state.currentCategory));
        this.openCategory();
    };

    openCategory = () => {
        this.setState({isOpenCategory: !this.state.isOpenCategory})
    };

    render() {
        return (
            <main>
                <div className={'main-container'}>
                    <h2 className={'movie-type green'} onClick={this.openCategory}>
                        <div className="nav-icon">
                            <FontAwesomeIcon icon={"tv"} />
                        </div>
                        Сериалы
                        <div className={this.state.isOpenCategory ? 'arrow-right arrow-right-rotate' : 'arrow-right'}>
                            <FontAwesomeIcon icon={"chevron-down"} />
                        </div>
                    </h2>
                    <div className={'row'}>
                        <div className={this.state.isOpenCategory ? 'category category-open' : 'category'}>
                            {Object.values(this.state.serialsNavigation).map((col, key) =>
                                <div className={"category-container green"} key={key}>
                                    {Object.values(col).map((submenu, key) =>
                                        <p key={key} onClick={() => this.setCategory(submenu.id)}>{submenu.name}</p>
                                    )}
                                </div>
                            )}
                        </div>
                        <InfiniteScroll
                            pageStart={this.state.page}
                            loadMore={() => {
                                this.setState((prevState) => {
                                    prevState.page++
                                }, () => this.props.loadMoreSerials(this.state.page, this.state.currentCategory))
                            }}
                            hasMore={true}
                            loader={<Loader key={0}/>}
                            useWindow={true}
                            threshold={500}
                        >
                        <div className={'movies'}>
                            {Object.values(this.props.serials).map((serial, key) =>
                                serial.poster_path && serial.name ? <div key={key} className={'movies-item'}>
                                    <div className={'item-options-container'}>
                                        <FontAwesomeIcon icon={"ellipsis-v"} />
                                    </div>
                                    <PercentCircle vote={serial.vote_average}/>
                                    <NavLink to={`/serials/${replaceUrlTitle(serial.original_name)}/${serial.id}`}>
                                        <img src={`https://image.tmdb.org/t/p/w342${serial.poster_path}`} alt="poster"/>
                                        <h6>{serial.name}</h6>
                                    </NavLink>
                                    <p>{serial.origin_country}, {serial.first_air_date.slice(0, 4)}</p>
                                </div> : null
                            )}
                        </div>
                        </InfiniteScroll>
                    </div>
                </div>
            </main>
        )};
}
const replaceUrlTitle = (title) => title ? title.replace(/%/g, "-percent").replace(/ /g, "-").toLowerCase() : null;

const mapStateToProps = (state, props) => ({
    isToggleBurger: state.client.isToggleBurger,
    serials: state.client.serials,
});

const mapDispatchToProps = (dispatch) => ({
    getSerialsFromApi: bindActionCreators(getSerialsFromApi, dispatch),
    loadMoreSerials: bindActionCreators(loadMoreSerials, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Serials);