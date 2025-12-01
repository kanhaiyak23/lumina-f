import React from "react";
import cssClasses from "./CustomIconButton.module.css";
import RespIcon from "../RespIcon";

/**
 * Renders a custom button component with the specified properties.
 *
 * @param {Object} props - The properties for the CustomButton component.
 * @param {string} [props.className=""] - The label of the button.
 * @param {string} [props.type="submit" | "reset" | "button" | undefined] - The type of the button.
 * @param {boolean} [props.disabled=false] - Indicates if the button is disabled.
 * @param {ReactNode} [props.icon=null] - The icon to display before the input.
 * @param {(event: React.MouseEvent<HTMLButtonElement>) => void} [props.onClick=() => { }] - The click event handler for the button.
 * @return {JSX.Element} The custom button component.
 */

function CustomIconButton({
    type = "submit" | "reset" | "button" | undefined,
    disabled = false,
    onClick = () => {},
    variant = "default",
    style = {},
    size = "md",
    className = "",
    icon = null,
    isSvg = false,
}) {
    const _variant = getVariant(variant);
    const _size = getSize(size);

    return (
        <button
            className={`${cssClasses.wrapper} ${_variant} ${_size} ${className}`}
            type={type}
            disabled={disabled}
            onClick={onClick}
            style={style}
        >
            <RespIcon icon={icon} size={size} isSvg={isSvg} />
        </button>
    );
}

export default CustomIconButton;

function getVariant(variant) {
    switch (variant) {
        case "contained":
            return cssClasses.contained;
        case "outlined":
            return cssClasses.outlined;
        case "default":
            return cssClasses.default;
        case "default-outlined":
            return cssClasses["default-outlined"];
        case "text":
            return cssClasses.text;
        case "warning":
            return cssClasses.warning;
        case "pending":
            return cssClasses.pending;
        case "error":
            return cssClasses.error;
        default:
            return cssClasses.default;
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
