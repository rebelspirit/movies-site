import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import './index.css';
import {SignIn} from "./SignIn";
import {SignUp} from "./SignUp";

export const Auth = () => {
    return (
        <main>
            <section className={"auth-container"}>
                <h2 className={"logo-container"}>
                    <div className={"auth-logo"}/>
                    Welcome to, <br/> our movies database
                </h2>
                <Switch>
                    <Route path={"/auth/sign-in"} exact>
                        <SignIn/>
                    </Route>
                    <Route path={"/auth/sign-up"}>
                        <SignUp/>
                    </Route>
                    <Redirect to={"/"}/>
                </Switch>
            </section>
        </main>
    )
};