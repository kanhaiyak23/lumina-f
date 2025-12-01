import React, { useState, useRef, useEffect } from "react";
import CLabel from "../CLabel";
import cssClasses from "./CustomAutoComplete.module.css";
import baseCssClasses from "../../common/FormBase.module.css";
import { ChevronDownIcon, XCircleIcon } from "@heroicons/react/16/solid";
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
 * @return {ReactElement} The rendered custom input component.
 */

const CustomAutoCompleteBasic = ({
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
    multiple = false,
}) => {
    const handleToggle = () => {
        _handleToggle?.();
    };

    const [inputValue, setInputValue] = useState("");
    const InputValueHandler = e => setInputValue(e.target.value);

    const list = menuList.filter(option =>
        option.label.toLocaleLowerCase().match(inputValue.toLocaleLowerCase()),
    );
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
                    <div
                        className={`${cssClasses.containerWrapper} ${
                            error ? baseCssClasses.error : ""
                        }`}
                    >
                        <CLabel label={label} required={required} />
                        <div className="relative">
                            <input
                                autoComplete="off"
                                type="input"
                                name={name}
                                disabled={disabled}
                                placeholder={placeholder}
                                value={
                                    multiple
                                        ? value
                                              ?.map(v => menuList.find(o => o.value === v))
                                              ?.map(o => o.label)
                                        : inputValue || value
                                }
                                onChange={e => {
                                    InputValueHandler(e);
                                    // onChange(e);
                                }}
                                className={baseCssClasses.wrapper}
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
                            <span className={`${baseCssClasses.icon} ${baseCssClasses.endIcon}`}>
                                <ChevronDownIcon />
                            </span>
                            {!!inputValue && (
                                <span
                                    className={`${baseCssClasses.icon} ${baseCssClasses.endIcon} ${cssClasses.closeIcon}`}
                                    onClick={() => {
                                        setInputValue("");
                                        onChange?.({
                                            target: { value: "", name: name },
                                        });
                                    }}
                                >
                                    <XCircleIcon />
                                </span>
                            )}
                        </div>
                    </div>
                }
            >
                {({ handleToggle }) => (
                    <>
                        {list.map((option, index) => (
                            <div
                                key={index}
                                className={`${baseCssClasses.option} flex gap-3`}
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
                                                label: option?.label,
                                            },
                                        });
                                    } else {
                                        onChange?.({
                                            target: {
                                                value: option.value,
                                                name: name,
                                                label: option?.label,
                                            },
                                        });
                                        setInputValue(option.label);
                                        handleToggle();
                                    }
                                }}
                            >
                                {multiple && (
                                    <CustomCheckbox checked={value.includes(option.label)} />
                                )}
                                {option.label}
                            </div>
                        ))}
                        {list.length === 0 && (
                            <div
                                className={cssClasses.option}
                                onMouseDown={() => {
                                    setInputValue("");
                                    handleToggle();

                                    onChange?.({
                                        target: { value: "", name: name },
                                    });
                                }}
                            >
                                None
                            </div>
                        )}
                    </>
                )}
            </CustomMenu>

            {typeof children === "function" ? children({}) : children}
            {error && <CLabel error label={errorMessage} />}
        </div>
    );
};

export default CustomAutoCompleteBasic;
