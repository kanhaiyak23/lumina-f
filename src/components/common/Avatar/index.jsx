import React from "react";
import cssClasses from "./Avatar.module.css";
const Avatar = ({ src, name, size = "md" }) => {
    const _size = getSize(size);
    return (
        <div className={`${cssClasses.container} ${_size}`}>
            {src ? (
                <img src={src} alt="" className={cssClasses.img} />
            ) : (
                <p className={cssClasses.title}>{name}</p>
            )}
        </div>
    );
};

export default Avatar;

function getSize(variant) {
    switch (variant) {
        case "md":
            return cssClasses.md;
        case "sm":
            return cssClasses.sm;
    }
}
