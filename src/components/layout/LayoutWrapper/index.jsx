import React, { useState } from "react";
import Appbar from "./Appbar";
import Footer from "./Footer";

const LayoutWrapper = ({ children }) => {
    return (
        <div className="flex flex-1 h-screen w-full text-black">
            <div className="w-full h-full flex flex-col overflow-x-hidden">
                <Appbar />
                <div className="flex-1 flex flex-col">{children}</div>
                <Footer />
            </div>
        </div>
    );
};

export default LayoutWrapper;
