import React from "react";

const CustomImageContainer = ({ height, width, src }) => {
    return (
        <div className="flex justify-center items-center h-full w-full">
            <img
                src={src}
                alt=""
                className="object-contain"
                style={{ height: height, width: width }}
            />
        </div>
    );
};

export default CustomImageContainer;
