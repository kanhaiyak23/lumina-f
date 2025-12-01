import React from "react";
import LayoutWrapper from "./components/layout/LayoutWrapper";
import { Outlet } from "react-router-dom";

const AppWrapperWithoutLayout = () => {
    return (
        <LayoutWrapper hideSidebar>
            <Outlet />
        </LayoutWrapper>
    );
};

export default AppWrapperWithoutLayout;
