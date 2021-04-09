import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

class ProtectedRoute extends Component {
    render() {
        const {
            component: Component,
            isAuthenticated: isAuthenticated,
            ...rest
        } = this.props;
        return (
            <Route
                {...rest}
                render={(props) =>
                    isAuthenticated ? (
                        <Component {...props} {...rest} />
                    ) : (
                        <Redirect to="/login" />

                    )
                }
            />
        );
    }
}

export default ProtectedRoute;
