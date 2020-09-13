import axios from "axios";

const api = '37381515063aba22627eb415da0adfe3';
const language = 'language=ru';
const region = 'region=RU';

export class MoviesService {
    static getMovies(page = 1, ganre = '') {
        return axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${api}&${language}&${region}&sort_by=popularity.desc&page=${page}&with_genres=${ganre}`)
            .then(response => response.data.results)
    }
    static getSerials(page = 1, ganre = '') {
        return axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${api}&${language}&${region}&sort_by=popularity.desc&page=${page}&with_genres=${ganre}`)
            .then(response => response.data.results)
    }
    static multiSearch(query) {
        return axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${api}&${language}&${region}&query=${query}`)
            .then(response => response.data.results.filter((item) => item.media_type !== "person" && item.poster_path))
    }
    static getPopularMovies() {
        return axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${api}&${language}&${region}`)
            .then(response => response.data.results)
    }
    static getPopularSerials() {
        return axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${api}&${language}&${region}`)
            .then(response => response.data.results)
    }
    static getCartoons() {
        return axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${api}&${language}&${region}&sort_by=popularity.desc&include_adult=false&with_genres=16`)
            .then(response => response.data.results)
    }
    static getTvShows() {
        return axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${api}&${language}&${region}&sort_by=popularity.desc&with_genres=16`)
            .then(response => response.data.results)
    }
    static getContentDetails(type, id) {
        return axios.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=${api}&${language}&${region}`)
            .then(response_db => {
                if(type === "movie") {
                    return axios.get(`https://videocdn.tv/api/movies?api_token=QDH5tZqrotr27szq3U9Yx2lEgunhKbuo&direction=desc&field=global&limit=10&ordering=last_media_accepted&imdb_id=${response_db.data.imdb_id}`)
                        .then(response_cdn => Object.assign(response_db.data, response_cdn.data.data.shift()))
                        .catch(error => console.log(error))
                }
                if(type === "tv") {
                    return axios.get(`https://api.themoviedb.org/3/tv/${response_db.data.id}/external_ids?api_key=${api}&language=en-US`)
                        .then(response_db_external => {
                            return axios.get(`https://videocdn.tv/api/tv-series?api_token=QDH5tZqrotr27szq3U9Yx2lEgunhKbuo&direction=desc&field=global&limit=10&ordering=last_media_accepted&imdb_id=${response_db_external.data.imdb_id}`)
                                .then(response_cdn => Object.assign(response_db.data, response_db_external.data, response_cdn.data.data.shift()))
                                .catch(error => console.log(error))
                        })
                        .catch(error => console.log(error))
                }

            })
            .catch(error => console.log(error))
    }
    static getRelaitedContent(type, id) {
        return axios.get(`https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=${api}&${language}&${region}`)
            .then(response => response.data.results.slice(0, 9))
    }
    static getActorsStuff(type, id) {
        return axios.get(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${api}&${language}&${region}`)
            .then(response => response.data.cast.slice(0, 9))
    }
    static getTrendsSerialsOnDay() {
        return axios.get(`https://api.themoviedb.org/3/trending/tv/day?api_key=${api}&${language}&${region}`)
            .then(response => response.data.results)
    }
    static getTrendsMoviesOnDay() {
        return axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${api}&${language}&${region}`)
            .then(response => response.data.results)
    }
    static getTrendsSerialsOnWeek() {
        return axios.get(`https://api.themoviedb.org/3/trending/tv/week?api_key=${api}&${language}&${region}`)
            .then(response => response.data.results)
    }
    static getTrendsMoviesOnWeek() {
        return axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${api}&${language}&${region}`)
            .then(response => response.data.results)
    }
    static getOnTheAirSerials() {
        return axios.get(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${api}&${language}&${region}&page=1`)
            .then(response => response.data.results)
    }
    static getOnTheAirMovies() {
        return axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${api}&${language}&${region}&page=1`)
            .then(response => response.data.results)
    }

}