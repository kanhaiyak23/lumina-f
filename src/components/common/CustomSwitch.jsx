import React, { useEffect, useState } from "react";
const CustomSwitch = ({
    defaultValue,
    onClick = () => {},
    onChange = () => {},
    value = false,
    name = "",
}) => {
    const [state, setState] = useState(false);
    useEffect(() => {
        if (defaultValue != null) setState(defaultValue);
    }, []);

    useEffect(() => {
        setState(value);
    }, [value]);

    const handleToggle = () => {
        setState(prevState => !prevState);
        onChange?.(!value, name);
    };

    return (
        <div onClick={onClick}>
            <label className="inline-flex items-center cursor-pointer" for="switch-component-blue">
                <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={state}
                    onChange={handleToggle}
                    id="switch-component-blue"
                />
                <div
                    className={`relative w-12 h-7 bg-gray-200 rounded-full dark:bg-gray-700 peer-checked:after:-translate-x-[-83%] rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[0.125rem] after:start-[0.125rem] after:end-[0.125rem] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-primary ${
                        state
                            ? "peer-focus:ring-4 peer-focus:ring-primary-light  dark:peer-focus:ring-blue-800"
                            : ""
                    }`}
                ></div>
            </label>
        </div>
    );
};

export default CustomSwitch;
