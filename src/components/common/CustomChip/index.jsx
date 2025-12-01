import React from "react";
import cssClasses from "./CustomChip.module.css";
const CustomChip = ({ icon, label, variant, size = "md" }) => {
    return (
        <div className={`${cssClasses.chip} ${getVariant(variant)}`}>
            {icon && <span className={cssClasses.icon}>{icon}</span>}
            <span className={`${cssClasses.label} ${getSize(size)}`}>{label}</span>
        </div>
    );
};

export default CustomChip;

const getVariant = variant => {
    switch (variant) {
        case "success":
            return cssClasses.success;

        case "warning":
            return cssClasses.warning;
        case "error":
            return cssClasses.error;
        case "default":
            return cssClasses.default;
        case "blue":
            return cssClasses.blue;
        case "blue-bold":
            return cssClasses["blue-bold"];
        case "purple":
            return cssClasses.purple;
        case "completed":
            return cssClasses.completed;
        case "primary":
            return cssClasses.primary;
        case "pending":
            return cssClasses.pending;
        default:
            return cssClasses.default;
    }
};
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
