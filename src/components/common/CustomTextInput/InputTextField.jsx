import React from "react";
import cssClasses from "./CustomTextInput.module.css";
import CLabel from "../CLabel";
import { useField } from "formik";
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
 * @param {boolean} [props.error=false] - Whether the input is disabled.
 * @param {boolean} [props.errorMessage=null] - Whether the input is disabled.
 * @param {string} [props.type="text"] - The type of the input.
 * @param {ReactNode} [props.startIcon=null] - The icon to display before the input.
 * @param {ReactNode} [props.endIcon=null] - The icon to display after the input.
 * @return {ReactElement} The rendered custom input component.
 */

function InputTextField({
    required = false,
    name = "",
    label = "Input Label",
    placeholder = "",
    onChange = () => {},
    onInput = () => {},
    onBlur = () => {},
    value = "",
    type = "text",
    startIcon = null,
    endIcon = null,
    disabled = false,
    labelStyle,
    minLength = "",
    maxLength = "",
    error = false,
    errorMessage = null,
    ...props
}) {
    console.log("value", value);
    const [field, meta] = useField(name);
    console.log(meta);
    const isError = meta.touched && meta.error;
    return (
        <CustomTextInputBasic
            required={required}
            label={label}
            name={name}
            labelStyle={labelStyle}
            disabled={disabled}
            placeholder={placeholder}
            type={type}
            value={value}
            onInput={onInput}
            onChange={onChange}
            onBlur={onBlur}
            minLength={minLength}
            maxLength={maxLength}
            startIcon={startIcon}
            endIcon={endIcon}
            error={isError || error}
            errorMessage={meta.error || errorMessage}
            {...props}
        />
    );
}

export default InputTextField;

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
