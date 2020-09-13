import React from 'react'
import {Route, Switch} from "react-router-dom";
import {Main} from "../components/Main";
import {Trends} from "../components/Trends";
import Films from "../components/Main/Films";
import Serials from "../components/Main/Serials";
import {NewFilms} from "../components/Main/newFilms";
import {PageNotFound} from "../components/PageNotFound";
import {ContentDetails} from "../components/Main/ContentDetails";
import {MultiSearch} from "../components/Main/MultiSearch";
import {Auth} from "../components/Auth";
import {AdminDashboard} from "../components/Admin";
import {PrivateRoute} from "./PrivateRoute";

export const useRoutes = () => {

    return (
        <Switch>
                <Route exact path="/" component={Main} />
                <Route exact path="/trends" component={Trends} />
                {/*<Route exact path="/films" component={Films} />*/}
                <Route exact path="/films" component={NewFilms} />
                <Route exact path="/serials" component={NewFilms} />
                {/*<Route path="/:type/:category" component={NewFilms} />*/}
                {/*<Route path="/films/drama" component={NewFilms} />*/}
                {/*<Route path="/films/military" component={NewFilms} />*/}
                {/*<Route path="/films/crime" component={NewFilms} />*/}
                {/*<Route path="/films/adventure" component={NewFilms} />*/}
                {/*<Route path="/films/thriller" component={NewFilms} />*/}
                {/*<Route path="/films/detective" component={NewFilms} />*/}
                {/*<Route path="/films/history" component={NewFilms} />*/}
                {/*<Route path="/films/melodrama" component={NewFilms} />*/}
                {/*<Route path="/films/horrors" component={NewFilms} />*/}
                {/*<Route path="/films/cartoons" component={NewFilms} />*/}
                {/*<Route path="/films/comedy" component={NewFilms} />*/}
                {/*<Route path="/films/music" component={NewFilms} />*/}
                {/*<Route path="/films/family" component={NewFilms} />*/}
                {/*<Route path="/films/syfy" component={NewFilms} />*/}
                {/*<Route path="/films/thriller" component={NewFilms} />*/}
                {/*<Route path="/films/western" component={NewFilms} />*/}
                {/*<Route path="/films/documentary" component={NewFilms} />*/}
                {/*<Route path="/films/fantasy" component={NewFilms} />*/}
                {/*<Route exact path="/films/cartoons" component={NewFilms}/>*/}
                {/*<Route exact path="/serials" component={NewFilms} />*/}
                <Route exact path="/tvshows" component={PageNotFound}/>
                <Route path="/:type/:title/:id" component={ContentDetails}/>
                <Route path="/search/" component={MultiSearch} />
                <Route path="/auth" component={Auth} />
                <PrivateRoute path="/admin">
                        <AdminDashboard />
                </PrivateRoute>
                <Route path="*" component={PageNotFound} />
        </Switch>
    )
};