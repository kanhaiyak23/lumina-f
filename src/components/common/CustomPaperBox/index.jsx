import React from "react";
import cssClasses from "./CustomPaperBox.module.css";
const CustomPaperBox = ({ children, className = "", elevation = "none", variant = "default" }) => {
    const _variant = getVariant(variant);
    function getVariant(variant) {
        switch (variant) {
            case "default":
                return cssClasses.default;
            case "primary":
                return cssClasses.primary;
            case "bold":
                return cssClasses.bold;
            default:
                return cssClasses.default;
        }
    }

    return (
        <div className={`shadow-${elevation} ${cssClasses.wrapper} ${_variant} ${className}`}>
            {children}
        </div>
    );
};

export default CustomPaperBox;
