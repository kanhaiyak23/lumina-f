import React from "react";
import { Route } from "react-router-dom";
import AppWrapper from "./AppWrapper";

const WrappedRoute = ({ element: Component, lazy, ...rest }) => {
    if (lazy) {
        return (
            <Route
                {...rest}
                lazy={async () => {
                    let { Component } = await lazy();
                    return {
                        Component: props => (
                            <AppWrapper>
                                <Component {...props} />
                            </AppWrapper>
                        ),
                    };
                }}
            />
        );
    }

    return (
        <Route
            {...rest}
            element={
                <AppWrapper>
                    <Component />
                </AppWrapper>
            }
        />
    );
};

export default WrappedRoute;
