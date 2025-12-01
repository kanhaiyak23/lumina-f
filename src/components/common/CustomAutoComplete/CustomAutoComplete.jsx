import React, { useState, useRef, useEffect } from "react";

import { useField } from "formik";
import CustomAutoCompleteBasic from "./CustomAutoCompleteBasic";

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

const CustomAutoComplete = ({
    label,
    menuList,
    disabled = false,
    required = false,
    placeholder = "",
    name = "",
    multiple = false,
    onChange = () => {},
}) => {
    const [field, meta] = useField(name);
    const isError = meta.touched && meta.error;
    // const inputRef = useRef(null);

    return (
        <CustomAutoCompleteBasic
            {...field}
            onChange={e => {
                field.onChange(e);
                onChange?.(e);
            }}
            label={label}
            placeholder={placeholder}
            name={name}
            value={field.value}
            menuList={menuList}
            error={isError}
            errorMessage={meta.error}
            disabled={disabled}
            required={required}
            multiple={multiple}
        />
    );
};

export default CustomAutoComplete;
