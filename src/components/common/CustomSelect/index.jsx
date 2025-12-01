import React, { useRef } from "react";
import { useField } from "formik";
import CustomSelectBasic from "./CustomSelectBasic";

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

const CustomSelect = ({
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
    const inputRef = useRef(null);
    console.log({ meta, name });

    return (
        <CustomSelectBasic
            label={label}
            value={field.value}
            onChange={e => {
                field.onChange(e);
                onChange?.(e);
            }}
            menuList={menuList}
            disabled={disabled}
            required={required}
            placeholder={placeholder}
            name={name}
            multiple={multiple}
            handleToggle={() => {
                inputRef.current.focus();
            }}
            error={isError}
            errorMessage={meta.error}
        >
            {({ isOpen }) => (
                <>
                    <input
                        {...field}
                        style={{
                            height: 0,
                            width: 0,
                            padding: 0,
                            border: "none",
                            position: "absolute",
                            zIndex: "-1",
                        }}
                        onBlur={e => !isOpen && field.onBlur(e)}
                        type="text"
                        ref={inputRef}
                    />
                </>
            )}
        </CustomSelectBasic>
    );
};

export default CustomSelect;
