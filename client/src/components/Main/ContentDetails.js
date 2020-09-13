import React, {useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useDispatch, useSelector} from "react-redux";
import {getContentDetails, clearStoreContentDetails} from '../../actions/client.actions';
import {ShareIcons} from "../ShareIcons";
import {ActorsStuff} from "../ActorsStuff";
import video404 from "../../assets/img/404_video.png";
import DocumentTitle from "react-document-title";
import {ContentTitle} from "./ContentTitle";
import {ContentOriginalTitle} from "./ContentOriginalTitle";
import {ContentYear} from "./ContentYear";
import {ContentCountry} from "./ContentCountry";
import {ContentGenre} from "./ContentGenre";
import {ContentLang} from "./ContentLang";
import {ContentQuality} from "./ContentQuality";
import {ContentDuration} from "./ContentDuration";
import {ContentAdults} from "./ContentAdults";
import {ContentRevenue} from "./ContentRevenue";
import {ContentBudget} from "./ContentBudget";
import {ContentStatus} from "./ContentStatus";
import {ContentEpisodes} from "./ContentEpisodes";
import {ContentOverview} from "./ContentOverview";
import {ContentRaiting} from "./ContentRaiting";
import {RelatedContent} from  "../RelatedContent";
import {useSound} from '../../hooks/sound.hook'

const initialState = (props) => {
    if(props.match.params.type === "films" || props.match.params.type === "cartoons") {return "movie"}
    if(props.match.params.type === "serials" || props.match.params.type === "multi-serials") {return "tv"}
};

export const ContentDetails = (props) => {
    const ContentDetails = useSelector((store) => store.client.ContentDetails);
    const dispatch = useDispatch();
    const {playSound} = useSound();
    const type = initialState(props);
    const id = props.match.params.id;


    useEffect(() => {
        dispatch(getContentDetails(type, id));
        return () => {
            dispatch(clearStoreContentDetails());
        };
    }, [id, type, dispatch]);

    const modifyDocumentTitle = (type, obj) => type === "movie" ? `${obj.movie_title} - ${obj.movie_year.slice(0, 4)} онлайн - gofilm.io` : `${obj.tv_name} - ${obj.tv_year.slice(0, 4)} онлайн - gofilm.io`;

    return ContentDetails.hasOwnProperty('backdrop_path') ? (
        <DocumentTitle title={modifyDocumentTitle(type, {
            movie_title: ContentDetails.title || null,
            movie_year: ContentDetails.release_date || null,
            tv_name: ContentDetails.name || null,
            tv_year: ContentDetails.first_air_date || null
        })}>
        <main>
            {ContentDetails.backdrop_path && <div style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280${ContentDetails.backdrop_path})` }} className={"details-background"}/>}
            <section className={'main-container content-container'}>
                <ContentTitle type={type} title={ContentDetails.title} name={ContentDetails.name}/>
                <ContentOriginalTitle type={type} original_title={ContentDetails.original_title} original_name={ContentDetails.original_name}/>
                <div className={"details-container"}>
                    <div className={"details-left-container"}>
                        <img src={`https://image.tmdb.org/t/p/w780${ContentDetails.poster_path}`} alt="poster"/>
                        <div className={"details-like-container"}>
                            <div className={"like"}
                                onClick={() => playSound('like')}
                            >
                                <FontAwesomeIcon icon={"thumbs-up"} />
                                Понравилось
                            </div>
                            <div className={"dislike"}
                                 onClick={() => playSound('dislike')}
                            >
                                <FontAwesomeIcon icon={"thumbs-down"} />
                                Не понравилось
                            </div>
                        </div>
                        <ContentRaiting popularity={ContentDetails.popularity} vote_average={ContentDetails.vote_average}/>
                        <div className={"details-description-container"}>
                            <ContentYear type={type} release_date={ContentDetails.release_date} first_air_date={ContentDetails.first_air_date}/>
                            <ContentCountry production_countries={ContentDetails.production_countries} origin_country={ContentDetails.origin_country}/>
                            <ContentGenre genres={ContentDetails.genres}/>
                            <ContentLang original_language={ContentDetails.original_language}/>
                            <ContentQuality/>
                            <ContentDuration runtime={ContentDetails.runtime}/>
                            <ContentAdults/>
                            <ContentBudget type={type} budget={ContentDetails.budget}/>
                            <ContentRevenue type={type} revenue={ContentDetails.revenue}/>
                            <ContentEpisodes type={type} number_of_episodes={ContentDetails.number_of_episodes}/>
                            <ContentStatus type={type} in_production={ContentDetails.in_production}/>
                        </div>
                    </div>
                    <div className={"details-right-container"}>
                        <iframe title={"movie"} allowFullScreen scrolling={"no"} src={ContentDetails.iframe_src ? ContentDetails.iframe_src : video404}/>
                        <ContentOverview type={type} overview={ContentDetails.overview} title={ContentDetails.title} name={ContentDetails.name}/>
                        <ShareIcons url={props.match.url} title={ContentDetails.title}/>
                        <RelatedContent id={id} type={type} urlType={props.match.params.type}/>
                        <ActorsStuff id={id} type={type}/>
                    </div>
                </div>
            </section>
        </main>
        </DocumentTitle>
    ) : null
};
