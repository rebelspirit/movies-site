import React from 'react';
import {useSelector} from "react-redux";
import {Redirect, Route} from "react-router-dom";

export const PrivateRoute = ({ children, ...rest }) => {
    const admin = useSelector((store) => store.server.userData.admin);
    const isAuthenticated = useSelector((store) => store.client.isAuthenticated);

    return (
        admin && isAuthenticated ? <Route
            {...rest}
            render={({ location }) =>
                admin && isAuthenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location }
                        }}
                    />
                )
            }
        /> : null
    );
};