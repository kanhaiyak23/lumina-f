import React, { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import cssClasses from "./CustomSearch.module.css";

const CustomSearch = ({
    initialValue = "",
    onChange = () => {},
    placeholder = "Search",
    className = "",
    disabled = false,
    debounceDelay = 300, // debounce delay in milliseconds
}) => {
    const [searchTerm, setSearchTerm] = useState(initialValue);

    // Debounce the onChange callback
    useEffect(() => {
        const handler = setTimeout(() => {
            onChange(searchTerm);
        }, debounceDelay);

        // Cleanup the timeout if searchTerm changes before debounceDelay is reached
        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm, onChange, debounceDelay]);

    // Handle input changes and update internal state
    const handleInputChange = e => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className={`${cssClasses.wrapper} ${className}`}>
            <span>
                <BiSearch color="#707070" size={16} />
            </span>
            <input
                disabled={disabled}
                placeholder={placeholder}
                value={searchTerm}
                onChange={handleInputChange}
                className={cssClasses.input}
            />
        </div>
    );
};

export default CustomSearch;
