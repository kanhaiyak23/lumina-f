import React from "react";
import { Outlet } from "react-router-dom";

//* Import Components
import LayoutWrapper from "./components/layout/LayoutWrapper";

const AppWrapper = () => {
    return (
        <LayoutWrapper>
            <Outlet />
        </LayoutWrapper>
    );
};

export default AppWrapper;
