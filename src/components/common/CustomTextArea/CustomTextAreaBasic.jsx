import React from "react";
import cssClasses from "../FormBase.module.css";
import CLabel from "../CLabel";
import { useField } from "formik";

/**
 * Renders a custom input component with below props.
 *
 * @param {Object} props - The props for the CustomTextInput component.
 * @param {string} [props.id=Date.now()] - The unique identifier for the input.
 * @param {boolean} [props.required=false] - Whether the input is required.
 * @param {string} [props.name=""] - The name of the input.
 * @param {string} [props.label="Input Label"] - The label for the input.
 * @param {string} [props.placeholder=""] - The placeholder text for the input.
 * @param {string} [props.maxLength=""] - The placeholder text for the input.
 * @param {string} [props.minLength=""] - The placeholder text for the input.
 * @param {string} [props.infoMessage=""] - The info message to display below the input.
 * @param {string} [props.successMessage=""] - The success message to display below the input.
 * @param {string} [props.errorMessage=""] - The error message to display below the input.
 * @param {(event: React.ChangeEvent<HTMLInputElement>) => void} [props.onChange=() => {}] - The function to call when the input value changes. Takes a React.ChangeEvent<HTMLInputElement> as an argument and does not return anything.
 * @param {(event: React.FormEventHandler<HTMLInputElement>) => void} [props.onInput=() => {}] - The function to call when the input value changes. Takes a React.ChangeEvent<HTMLInputElement> as an argument and does not return anything.
 * @param {(event: React.FocusEvent<HTMLInputElement>) => void} [props.onBlur=() => {}] - The function to call when the input value changes. Takes a React.ChangeEvent<HTMLInputElement> as an argument and does not return anything.
 * @param {string} [props.value=""] - The value of the input. A string.
 * @param {boolean} [props.disable=false] - Whether the input is disabled.
 * @param {string} [props.type="text"] - The type of the input.
 * @param {string} [props.className=""] - The type of the input.
 * @param {ReactNode} [props.startIcon=null] - The icon to display before the input.
 * @param {ReactNode} [props.endIcon=null] - The icon to display after the input.
 * @return {ReactElement} The rendered custom input component.
 */

function CustomTextAreaBasic({
    required = false,
    name = "",
    label = "",
    placeholder = "",
    onChange = () => {},
    onInput = () => {},
    onBlur = () => {},
    value = "",
    type = "text",
    startIcon = null,
    endIcon = null,
    error = false,
    errorMessage = null,
    disabled = false,
    labelStyle,
    minLength = "",
    maxLength = "",
    className = "",
    rows,
}) {
    return (
        <div className="flex flex-col gap-1">
            <div
                className={`${cssClasses.containerWrapper} ${
                    error ? cssClasses.error : ""
                } ${className}`}
            >
                <CLabel label={label} required={required} />
                <div className="relative">
                    {startIcon && (
                        <div className={`${cssClasses.icon} ${cssClasses.startIcon}`}>
                            {startIcon}
                        </div>
                    )}
                    {endIcon && (
                        <div className={`${cssClasses.icon} ${cssClasses.endIcon}`}>{endIcon}</div>
                    )}
                    <textarea
                        name={name}
                        disabled={disabled}
                        placeholder={placeholder}
                        type={type}
                        value={value}
                        rows={rows ? rows : 4}
                        className={cssClasses.wrapper}
                        onInput={onInput}
                        onChange={onChange}
                        onBlur={onBlur}
                        minLength={minLength}
                        maxLength={maxLength}
                        style={{
                            width: "-webkit-fill-available",
                            paddingLeft: startIcon ? "2.5rem" : "10px",
                            paddingRight: endIcon ? "2.5rem" : "10px",
                        }}
                    />
                </div>
            </div>
            {error && <CLabel error label={errorMessage} />}
        </div>
    );
}

export default CustomTextAreaBasic;

/**
 * *~~~~~~~~~~~~~ accept only 10 characters ~~~~~~~~
 * onInput={(e) => {
 *   e.target.value = e.target.value.slice(0, 10)
 * }}
 */

/**
 * *~~~~~~~~~~~~ accept only numbers ~~~~~~~~~~~~~~
 * onChange={(e) => {
 *  if (!isNaN(Number(e.target.value))) {
 *    setFirstName(e.target.value)
 *   }
 *  }}
 */
