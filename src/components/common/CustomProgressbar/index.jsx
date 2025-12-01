import React from "react";
import cssClasses from "./CustomProgressbar.module.css";
const CustomProgressbar = ({ sent, total, steps = 0, error = false, variant }) => {
    return (
        <div className={cssClasses.container}>
            <div className={cssClasses.stepContainer}>
                {new Array(steps === 0 ? 0 : steps + 1).fill(0).map((_, index) => (
                    <div key={index} className={cssClasses.step}></div>
                ))}
            </div>
            <div
                style={{
                    width: `${(sent / total) * 100}%`,
                    transition: "0.5s",
                }}
                className={`${cssClasses.stick} ${getVariant(variant)}`}
            ></div>
        </div>
    );
};

export default CustomProgressbar;

const getVariant = variant => {
    switch (variant) {
        case "success":
            return cssClasses.success;
        case "error":
            return cssClasses.error;
        case "blue-bold":
            return cssClasses["blue-bold"];
        case "completed":
            return cssClasses.completed;
        case "primary":
            return cssClasses.primary;
        default:
            return cssClasses.primary;
    }
};
