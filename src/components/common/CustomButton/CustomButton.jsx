import React from "react";
import cssClasses from "./CustomButton.module.css";

/**
 * Renders a custom button component with the specified properties.
 *
 * @param {Object} props - The properties for the CustomButton component.
 * @param {string} [props.label="Title"] - The label of the button.
 * @param {string} [props.className=""] - The label of the button.
 * @param {boolean} [props.isLoading=false] - Indicates if the button is in a loading state.
 * @param {string} [props.type="submit" | "reset" | "button" | undefined] - The type of the button.
 * @param {boolean} [props.disabled=false] - Indicates if the button is disabled.
 * @param {ReactNode} [props.startIcon=null] - The icon to display before the input.
 * @param {ReactNode} [props.endIcon=null] - The icon to display after the input.
 * @param {(event: React.MouseEvent<HTMLButtonElement>) => void} [props.onClick=() => { }] - The click event handler for the button.
 * @return {JSX.Element} The custom button component.
 */

// variants(outlined, contained, default,text,warning,pending)
// size (md, sm)
// disabled
function CustomButton({
    startIcon = null,
    endIcon = null,
    label = "Title",
    isLoading = false,
    type = "submit" | "reset" | "button" | undefined,
    disabled = false,
    onClick = () => {},
    variant = "contained",
    style = {},
    size = "md",
    className = "",
    labelClassName = "",
}) {
    const _variant = getVariant(disabled ? "disabled" : variant);
    const _size = getSize(size);

    return (
        <button
            className={`${cssClasses.wrapper} ${_variant} ${_size} ${className} `}
            // className={
            //   `${cssClasses.buttonClass} ${className} ${
            //     size === "md" ? cssClasses.md : ""
            //   }  ${
            //     variant === "error"
            //       ? cssClasses.error
            //       : variant === "default"
            //       ? cssClasses.buttonDefault
            //       : variant === "contained"
            //       ? cssClasses.contained
            //       : cssClasses.buttonSecondary
            //   } ` + className
            // }
            type={type}
            disabled={disabled}
            onClick={onClick}
            style={style}
        >
            {isLoading && <div className={cssClasses.loaderSpinner} />}
            {startIcon && !isLoading && startIcon}
            <span
                className={labelClassName}
                style={{
                    whiteSpace: "nowrap",
                }}
            >
                {label}
            </span>
            {endIcon && endIcon}
        </button>
    );
}

export default CustomButton;

function getVariant(variant) {
    switch (variant) {
        case "contained":
            return cssClasses.contained;
        case "outlined":
            return cssClasses.outlined;
        case "default":
            return cssClasses.default;
        case "text":
            return cssClasses.text;
        case "warning":
            return cssClasses.warning;
        case "pending":
            return cssClasses.pending;
        case "error":
            return cssClasses.error;
        case "disabled":
            return cssClasses.disabled;
        case "green":
            return cssClasses.green;
        case "lightgreen":
            return cssClasses.lightgreen;

        default:
            return cssClasses.contained;
    }
}
function getSize(size) {
    switch (size) {
        case "md":
            return cssClasses.md;
        case "sm":
            return cssClasses.sm;
        default:
            return cssClasses.md;
    }
}
