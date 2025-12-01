import React, { useState, useRef, useEffect } from "react";
import CLabel from "../CLabel";
import cssClasses from "./CustomSelect.module.css";
import baseCssClasses from "../../common/FormBase.module.css";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import CustomMenu from "../CustomMenu";
import CustomCheckbox from "../CustomCheckbox";

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
 * @param {boolean} [props.errorMessage=null] - Whether the input is disabled.
 * @param {boolean} [props.error=false] - Whether the input is disabled.
 * @param {boolean} [props.endIcon=null] - Whether the input is disabled.

 * @return {ReactElement} The rendered custom input component.
 */

const CustomSelectBasic = ({
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
    endIcon = null,
    multiple = false,
}) => {
    console.log("Endicon", endIcon?.props?.isPinCodeLoading);
    const handleToggle = () => {
        _handleToggle?.();
    };

    return (
        <div className="flex-1 relative flex-col flex gap-1">
            <CustomMenu
                disabled={disabled}
                wrapperStyle={{
                    width: "auto",
                }}
                contentStyle={{
                    width: "100%",
                }}
                label={
                    <div className={`${error ? baseCssClasses.error : ""}`}>
                        <CLabel label={label} required={required} />

                        <div
                            className={` ${disabled ? "cursor-not-allowed" : ""} ${
                                baseCssClasses.wrapper
                            }`}
                            onClick={e => {
                                !disabled && handleToggle();
                            }}
                        >
                            {disabled && <div className={cssClasses.disabledOverlay}></div>}

                            {/* <span className={cssClasses.input}>{value || placeholder}</span> */}
                            {
                                <span className={`${cssClasses.input} flex items-center`}>
                                    {multiple
                                        ? menuList
                                              ?.filter(option => value?.includes(option.value))
                                              .map(option => option.label)
                                              ?.join(",") ||
                                          value.join(",") ||
                                          placeholder
                                        : menuList.find(option => option.value === value)?.label ||
                                          placeholder}
                                </span>
                            }

                            {!disabled && (
                                <span
                                    className={`${baseCssClasses.icon} ${baseCssClasses.endIcon}`}
                                >
                                    {endIcon?.props?.isPinCodeLoading ? (
                                        endIcon
                                    ) : (
                                        <ChevronDownIcon />
                                    )}
                                </span>
                            )}
                        </div>
                    </div>
                }
            >
                {({ handleToggle }) =>
                    menuList.map((option, index) => (
                        <div
                            key={index}
                            className={`${baseCssClasses.option} flex gap-2`}
                            onMouseDown={() => {
                                if (multiple) {
                                    let newSelectedValues;
                                    if (value.includes(option.value)) {
                                        newSelectedValues = value.filter(
                                            val => val !== option.value,
                                        );
                                    } else {
                                        newSelectedValues = [...value, option.value];
                                    }

                                    onChange?.({
                                        target: {
                                            value: newSelectedValues,
                                            name: name,
                                            label: option.label,
                                        },
                                    });
                                } else {
                                    onChange?.({
                                        target: {
                                            value: option.value,
                                            name: name,
                                            label: option.label,
                                        },
                                    });
                                    handleToggle();
                                }
                            }}
                        >
                            {multiple && <CustomCheckbox checked={value.includes(option.value)} />}
                            {option.label}
                        </div>
                    ))
                }
            </CustomMenu>
            {typeof children === "function" ? children({}) : children}
            {error && <CLabel error label={errorMessage} />}
        </div>
    );
};

export default CustomSelectBasic;
