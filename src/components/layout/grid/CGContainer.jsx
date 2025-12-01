import React from "react";
const CGContainer = ({ children, gap = 16, className, style }) => {
    return (
        <div
            className={`grid grid-cols-12 ` + className}
            style={{
                gap: gap + "px",
                ...style,
            }}
        >
            {children}
        </div>
    );
};

export default CGContainer;
