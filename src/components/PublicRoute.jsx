import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

// Redirect user to home page if already login
class PublicRoute extends Component {
    render() {
        const {
            component: Component,
            isAuthenticated,
            ...rest
        } = this.props;
        return (
            <Route
                {...rest}
                render={(props) =>
                    !isAuthenticated ? (
                        <Component {...props} {...rest} />
                    ) : (
                        <Redirect to="/home" />

                    )
                }
            />
        );
    }
}

export default PublicRoute;
