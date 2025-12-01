import React from "react";
import cssClasses from "./Text.module.css";

const Text = ({
    variant = "default",
    size = "base",
    component = "p",
    children,
    className = "",
}) => {
    const _variant = getVariant(variant);
    const _size = getSize(size);
    return React.createElement(
        component,
        { className: `${cssClasses.text} ${_variant} ${_size} ${className}` },
        children,
    );
};

export default Text;

function getVariant(variant) {
    switch (variant) {
        case "body1":
            return cssClasses.body1;
        case "body2":
            return cssClasses.body2;

        default:
            return cssClasses.body2;
    }
}
function getSize(size) {
    switch (size) {
        case "base":
            return cssClasses.base;
        case "sm":
            return cssClasses.sm;
        default:
            return cssClasses.base;
    }
}

function getWeight(size) {
    switch (size) {
        case "normal":
            return cssClasses.normal;
        case "medium":
            return cssClasses.medium;
        default:
            return cssClasses.normal;
    }
}
