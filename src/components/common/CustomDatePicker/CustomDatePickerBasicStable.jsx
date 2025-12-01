import React, { useState, useRef, useEffect } from "react";
import CLabel from "../CLabel";
import cssClasses from "./CustomDatePicker.module.css";
import { CalendarDaysIcon } from "@heroicons/react/16/solid";
import { Datepicker } from "flowbite-react";
import moment from "moment";

/**
 * Renders a custom input component with below props.
 *
 * @param {Object} props - The props for the CustomInput component.
 * @param {boolean} [props.required=false] - Whether the input is required.
 * @param {string} [props.name=""] - The name of the input.
 * @param {string} [props.label="Input Label"] - The label for the input.
 * @param {string} [props.placeholder=""] - The placeholder text for the input.
 * @param {string} [props.menuList=[]] - The placeholder text for the input.
 * @param {(event: React.ChangeEvent<HTMLInputElement>) => void} [props.onChange=() => {}] - The function to call when the input value changes. Takes a React.ChangeEvent<HTMLInputElement> as an argument and does not return anything.
 * @param {(event: React.FocusEvent<HTMLInputElement>) => void} [props.onBlur=() => {}] - The function to call when the input value changes. Takes a React.ChangeEvent<HTMLInputElement> as an argument and does not return anything.
 * @param {string} [props.value=""] - The value of the input. A string.
 * @param {boolean} [props.disabled=false] - Whether the input is disabled.
 * @return {ReactElement} The rendered custom input component.
 */

const CustomDatePickerBasicStable = ({
    label,
    value = "",
    onChange,
    menuList = [],
    disabled = false,
    required = false,
    placeholder = "",
    name = "",
    children,
    handleToggle: _handleToggle,
    error = false,
    errorMessage = null,
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
        <div className="flex-1 relative flex-col flex gap-1" ref={selectRef}>
            <div className="relative block w-full">
                <div
                    className={`${cssClasses.selectWrapper} ${error ? cssClasses.selectError : ""}`}
                >
                    <CLabel label={label} required={required} />
                    <div
                        className={cssClasses.inputWrapper}
                        onClick={e => {
                            !disabled && handleToggle();
                        }}
                    >
                        {disabled && <div className={cssClasses.disabledOverlay}></div>}
                        <span className={cssClasses.input}>{value || placeholder}</span>
                        <span className={cssClasses.icon}>
                            <CalendarDaysIcon />
                        </span>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div
                    className={`${cssClasses.popover} ${!isAbove ? " " : cssClasses.popoverAbove}`}
                >
                    <Datepicker
                        value={value}
                        onSelectedDateChanged={value => {
                            onChange?.({
                                target: {
                                    value: moment(value).format("DD/MM/YYYY"),
                                    name: name,
                                },
                            });
                            setIsOpen(false);
                        }}
                        inline
                    />
                </div>
            )}
            {typeof children === "function" ? children({ isOpen }) : children}
            {error && <CLabel error label={errorMessage} />}
        </div>
    );
};

export default CustomDatePickerBasicStable;
