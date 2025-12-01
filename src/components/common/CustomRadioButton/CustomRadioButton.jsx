import React from "react";
import CLabel from "../CLabel";
import cssClasses from "./CustomRadioButton.module.css";

/**
 * Renders a custom input component with below props.
 *
 * @param {Object} props - The props for the CustomInput component.
 * @param {string} [props.name=""] - The name of the input.
 * @param {array} [props.radioList=[]] - The placeholder text for the input.
 * @param {(event: React.ChangeEvent<HTMLInputElement>) => void} [props.onChange=() => {}] - The function to call when the input value changes. Takes a React.ChangeEvent<HTMLInputElement> as an argument and does not return anything.
 * @param {string} [props.value=""] - The value of the input. A string.
 * @param {boolean} [props.disabled=false] - Whether the input is disabled.
 * @param {boolean} [props.inRow=false] - Whether the input is disabled.
 * @return {ReactElement} The rendered custom input component.
 */

const CustomRadioButton = ({
    name,
    radioList = [],
    value,
    inRow = false,
    onChange,
    disabled = false,
}) => {
    return (
        <div>
            <fieldset className={`flex max-w-md flex-${!inRow ? "col" : "row"} gap-4`}>
                {radioList.map(opt => (
                    <div key={opt.value} className={cssClasses.inputWrapper}>
                        <input
                            disabled={disabled}
                            type="radio"
                            name={name}
                            value={opt.value}
                            onClick={e => onChange?.(e)}
                            defaultChecked={value === opt.value}
                            className={`cursor-pointer checked: text-primary`}
                        />
                        <CLabel label={opt.label} />
                    </div>
                ))}
            </fieldset>
        </div>
    );
};

export default CustomRadioButton;
