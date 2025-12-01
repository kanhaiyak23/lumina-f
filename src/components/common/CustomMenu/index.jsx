import React, { useState, useRef, useEffect } from "react";
import cssClasses from "./CustomMenu.module.css";

const CustomMenu = ({
    label = "Click Me",
    disabled = false,
    children,
    handleToggle: _handleToggle,
    contentStyle = {},
    wrapperStyle = {},
    position = "default",
    mutiple = false,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAbove, setIsAbove] = useState(false);
    const selectRef = useRef(null);
    const handleToggle = () => {
        setIsOpen(true);
        _handleToggle?.();
    };

    const handleClickOutside = event => {
        if (selectRef.current && !selectRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    const updatePopoverPosition = () => {
        if (selectRef.current) {
            const rect = selectRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            setIsAbove(spaceBelow < 150);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("resize", updatePopoverPosition);

        if (isOpen) {
            updatePopoverPosition();
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("resize", updatePopoverPosition);
        };
    }, [isOpen]);
    return (
        <div
            className="flex-1 text-nowrap relative flex-col flex gap-1"
            ref={selectRef}
            style={wrapperStyle}
        >
            <div
                className="relative block cursor-pointer"
                onClick={e => {
                    !disabled && handleToggle();
                }}
            >
                {label}

                {disabled && <div className={cssClasses.disabledOverlay}></div>}
            </div>
            {isOpen && (
                <div
                    className={`${cssClasses.popover} w-fit ${
                        position === "left" ? "left-[-7rem]" : null
                    } ${!isAbove ? " " : cssClasses.popoverAbove}`}
                    style={contentStyle}
                >
                    {typeof children === "function"
                        ? children({ isOpen, handleToggle: () => setIsOpen(false) })
                        : children}
                </div>
            )}
        </div>
    );
};

export default CustomMenu;
