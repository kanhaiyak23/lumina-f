import React, { useState } from "react";

const CustomRange = ({ value = 0, setValue = () => {}, className = "", max = {}, min = {} }) => {
    return (
        <div className="flex flex-col items-center justify-center ">
            <input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={e => setValue(e.target.value)}
                className={`max-w-md h-2 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 focus:outline-none bg-primary-light ${className}`}
            />
            <span className="mt-4 text-lg font-semibold">{value}</span>
        </div>
    );
};

export default CustomRange;
