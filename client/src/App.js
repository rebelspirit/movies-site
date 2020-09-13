import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { library } from '@fortawesome/fontawesome-svg-core'
import {faBaby, faBell, faChevronDown, faChevronRight, faClock, faCog, faCommentAlt, faFilm, faFire, faFlag, faFolder, faHistory, faHome, faList, faPoll, faQuestionCircle, faSearch, faSignInAlt, faStar, faTh, faThumbsDown, faThumbsUp, faTv, faVideo, faUser, faSun, faMoon, faSignOutAlt, faTimes, faExternalLinkAlt, faEllipsisV, faPlay, faVolumeUp} from '@fortawesome/free-solid-svg-icons'
import {Header} from './components/Header'
import {LeftSideBar} from './components/LeftSideBar'
import { getCartoons, getPopularMovies, getPopularSerials, getTvShows } from './actions/client.actions'
import {ScrollToTop} from './components/ScrollToTop'
import {WindowFreeze} from "./components/WindowFreeze";
import {ToastProvider} from 'react-toast-notifications';
import DocumentTitle from "react-document-title";
import {useRoutes} from "./routes";

library.add(faSearch, faTh, faBell, faSignInAlt, faHome, faFire, faChevronRight, faFolder, faHistory, faClock, faThumbsUp, faFilm, faBaby, faTv, faList, faVideo, faCog, faFlag, faQuestionCircle, faCommentAlt, faChevronDown, faThumbsDown, faStar, faPoll, faUser, faSun, faMoon, faSignOutAlt, faTimes, faExternalLinkAlt, faEllipsisV, faPlay, faVolumeUp);

const App = () => {
	const dispatch = useDispatch();
	const routes = useRoutes();

	useEffect(() => {
		dispatch(getPopularMovies());
		dispatch(getPopularSerials());
		dispatch(getCartoons());
		dispatch(getTvShows());
	}, [dispatch]);

	return (
		<DocumentTitle title={"gofilm.io - онлайн кинотеатр"}>
		<ToastProvider>
		<Router>
			<ScrollToTop />
			<div className={'app'}>
				<Header />
				<div className={'container'}>
					<LeftSideBar />
					<WindowFreeze/>
					{routes}
				</div>
			</div>
		</Router>
		</ToastProvider>
		</DocumentTitle>
	)
};

export default App
