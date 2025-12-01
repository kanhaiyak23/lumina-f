import React from "react";
import CLabel from "../CLabel";
import cssClasses from "./CustomCheckbox.module.css";

/**
 * Renders a custom input component with below props.
 *
 * @param {Object} props - The props for the CustomInput component.
 * @param {string} [props.name=""] - The name of the input.
 * @param {string} [props.label=""] - The name of the input.
 * @param {(event: React.ChangeEvent<HTMLInputElement>) => void} [props.onChange=() => {}] - The function to call when the input value changes. Takes a React.ChangeEvent<HTMLInputElement> as an argument and does not return anything.
 * @param {boolean} [props.checked=false] - Whether the input is disabled.
 * @param {boolean} [props.required=false] - Whether the input is disabled.
 * @return {ReactElement} The rendered custom input component.
 */

const CustomCheckbox = ({
    checked = false,
    onChange,
    label,
    required,
    name,
    className = "",
    value,
}) => {
    return (
        <div className={`${cssClasses.inputWrapper} ${className}`}>
            <input
                type="checkbox"
                checked={checked}
                value={value}
                name={name}
                onChange={e => {
                    console.log(e.target.checked);
                    onChange?.({
                        target: {
                            value: e.target.checked,
                            name: name,
                        },
                    });
                }}
                className={`cursor-pointer rounded-sm ${
                    checked ? "bg-primary" : "bg-white"
                } checked:bg-primary`}
            />
            <CLabel label={label} required={required} />
        </div>
    );
};

export default CustomCheckbox;
