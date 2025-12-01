import React from "react";
import cssClasses from "./RespIcon.module.css";

const RespIcon = ({ icon, badge, size = "md", className, isSvg = false }) => {
    const getSize = size => {
        switch (size) {
            case "md":
                return cssClasses.md;
            case "sm":
                return cssClasses.sm;
            case "lg":
                return cssClasses.lg;
            default:
                return cssClasses.md;
        }
    };
    const _size = getSize(size);
    return (
        <div className={`${cssClasses.icon} ${_size} ${className}`}>
            {isSvg ? <img src={icon} alt="" /> : icon}
            {badge && <div className={cssClasses.badge}>{badge}</div>}
        </div>
    );
};

export default RespIcon;
