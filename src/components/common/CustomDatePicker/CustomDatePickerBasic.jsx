import React from "react";
import CLabel from "../CLabel";
import cssClasses from "./CustomDatePicker.module.css";

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

const CustomDatePickerBasic = ({
    label,
    value = "",
    onChange,
    disabled = false,
    required = false,
    placeholder = "",
    name = "",
    children,
    handleToggle: _handleToggle,
    error = false,
    errorMessage = null,
    onBlur = () => {},
    type = "date",
    minDate,
    maxDate,
}) => {
    return (
        <div className="flex-1 relative flex-col flex gap-1">
            <CLabel label={label} required={required} />
            <input
                disabled={disabled}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                name={name}
                min={minDate}
                max={maxDate}
                placeholder={placeholder}
                type={getType(type)}
                className={`${cssClasses.inputWrapper} ${error ? cssClasses.selectError : ""}`}
                style={{
                    display: "block",
                }}
            />

            {typeof children === "function" ? children({}) : children}
            {error && <CLabel error label={errorMessage} />}
        </div>
    );
};

export default CustomDatePickerBasic;

function getType(type) {
    switch (type) {
        case "date":
            return "date";
        case "time":
            return "time";
        case "date-time":
            return "datetime-local";
        default:
            return "date";
    }
}
