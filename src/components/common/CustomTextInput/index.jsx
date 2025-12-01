import React from "react";
import cssClasses from "./CustomTextInput.module.css";
import { useField } from "formik";
import CLabel from "../CLabel";
import CustomTextInputBasic from "./CustomTextInputBasic";

/**
 * Renders a custom input component with below props.
 *
 * @param {Object} props - The props for the CustomTextInput component.
 * @param {string} [props.id=Date.now()] - The unique identifier for the input.
 * @param {boolean} [props.required=false] - Whether the input is required.
 * @param {string} [props.name=""] - The name of the input.
 * @param {string} [props.label="Input Label"] - The label for the input.
 * @param {string} [props.placeholder=""] - The placeholder text for the input.
 * @param {string} [props.infoMessage=""] - The info message to display below the input.
 * @param {string} [props.successMessage=""] - The success message to display below the input.
 * @param {string} [props.errorMessage=null] - The error message to display below the input.
 * @param {string} [props.value=""] - The value of the input. A string.
 * @param {boolean} [props.disable=false] - Whether the input is disabled.
 * @param {string} [props.type="text"] - The type of the input.
 * @param {ReactNode} [props.startIcon=null] - The icon to display before the input.
 * @param {ReactNode} [props.endIcon=null] - The icon to display after the input.
 * @param {(event: React.ChangeEvent<HTMLInputElement>) => void} [props.onChange=() => {}] - The function to call when the input value changes. Takes a React.ChangeEvent<HTMLInputElement> as an argument and does not return anything.
 * @param {(event: React.FormEventHandler<HTMLInputElement>) => void} [props.onInput=() => {}] - The function to call when the input value changes. Takes a React.ChangeEvent<HTMLInputElement> as an argument and does not return anything.
 * @param {(event: React.FocusEvent<HTMLInputElement>) => void} [props.onBlur=() => {}] - The function to call when the input value changes. Takes a React.ChangeEvent<HTMLInputElement> as an argument and does not return anything.
 * @return {ReactElement} The rendered custom input component.
 */

function CustomTextInput({
    required = false,
    name = "",
    label = "",
    placeholder = "",
    disabled = false,
    type = "text",
    startIcon = null,
    endIcon = null,
    labelStyle,
    errorMessage,
    onChange = () => {},
    minLength = null,
    maxLength = null,
    autoComplete = "",
}) {
    const [field, meta] = useField(name);
    const isError = meta.touched && meta.error;
    return (
        <CustomTextInputBasic
            {...field}
            onChange={e => {
                field.onChange(e);
                onChange?.(e);
            }}
            required={required}
            labelStyle={labelStyle}
            name={name}
            label={label}
            placeholder={placeholder}
            minLength={minLength}
            maxLength={maxLength}
            disabled={disabled}
            type={type}
            startIcon={startIcon}
            endIcon={endIcon}
            error={isError}
            errorMessage={isError ? meta.error || errorMessage : null}
            autoComplete={autoComplete}
        />
    );
}

export default CustomTextInput;

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
