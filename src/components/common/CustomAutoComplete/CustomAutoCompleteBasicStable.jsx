import React, { useState, useRef, useEffect } from "react";
import CLabel from "../CLabel";
import cssClasses from "./CustomAutoComplete.module.css";
import { ChevronDownIcon, XCircleIcon } from "@heroicons/react/16/solid";

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

const CustomAutoCompleteBasicStable = ({
    label,
    value = "",
    menuList = [],
    disabled = false,
    required = false,
    placeholder = "",
    name = "",
    children,
    handleToggle: _handleToggle,
    error = false,
    errorMessage = null,
    onInput = () => {},
    onChange = () => {},
    onBlur = () => {},
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
            setInputValue("");
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
    const [inputValue, setInputValue] = useState("");
    const InputValueHandler = e => setInputValue(e.target.value);

    const list = menuList.filter(option =>
        option.label.toLocaleLowerCase().match(inputValue.toLocaleLowerCase()),
    );
    return (
        <div className="flex-1 relative flex-col flex gap-1" ref={selectRef}>
            <div className="relative block w-full">
                <div
                    className={`${cssClasses.selectWrapper} ${error ? cssClasses.selectError : ""}`}
                >
                    <CLabel label={label} required={required} />
                    <div className="relative">
                        <input
                            type="input"
                            name={name}
                            disabled={disabled}
                            placeholder={placeholder}
                            value={inputValue || value}
                            onChange={e => {
                                InputValueHandler(e);
                                // onChange(e);
                            }}
                            className={cssClasses.inputWrapper}
                            onInput={onInput}
                            onClick={e => {
                                !disabled && handleToggle();
                            }}
                            onBlur={onBlur}
                            style={{
                                width: "-webkit-fill-available",
                                paddingRight: inputValue ? "4rem" : "2.2rem",
                            }}
                        />
                        <span className={cssClasses.icon}>
                            <ChevronDownIcon />
                        </span>
                        {!!inputValue && (
                            <span
                                className={cssClasses.closeIcon}
                                onClick={() => {
                                    setInputValue("");
                                    onChange?.({
                                        target: { value: "", name: name },
                                    });
                                    setIsOpen(true);
                                }}
                            >
                                <XCircleIcon />
                            </span>
                        )}
                    </div>
                </div>
            </div>
            {isOpen && (
                <div
                    className={`${cssClasses.popover} ${!isAbove ? " " : cssClasses.popoverAbove}`}
                >
                    {list.map((option, index) => (
                        <div
                            key={index}
                            className={cssClasses.option}
                            onClick={() => {
                                setIsOpen(false);
                                onChange?.({
                                    target: { value: option.value, name: name },
                                });
                                setInputValue(option.label);
                            }}
                        >
                            {option.label}
                        </div>
                    ))}
                    {list.length === 0 && (
                        <div
                            className={cssClasses.option}
                            onClick={() => {
                                setIsOpen(false);
                                setInputValue("");
                                onChange?.({
                                    target: { value: "", name: name },
                                });
                            }}
                        >
                            None
                        </div>
                    )}
                </div>
            )}
            {typeof children === "function" ? children({ isOpen }) : children}
            {error && <CLabel error label={errorMessage} />}
        </div>
    );
};

export default CustomAutoCompleteBasicStable;
