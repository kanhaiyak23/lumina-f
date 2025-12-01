import { MinusIcon, XMarkIcon } from "@heroicons/react/16/solid";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import cssClasses from "./CustomDialog.module.css";
import { BiLeftArrowAlt } from "react-icons/bi";

const CustomDialog = ({
    open: _open = false,
    setOpen: _setOpen = () => {},
    buttonComp,
    width,
    children,
    onClose = () => {},
    sx = {},
    dontClose = false,
    dontCloseOnOverlay = false,
    height,
    title = "",
    titleClassName = "",
    className = "",
    handleMinimize = null,
    underlayColor = null,
    showBack = false,
    noTitleWrapper = false,
    showClose = false,
}) => {
    const [open, setOpen] = useState(_open || false);

    useEffect(() => {
        setOpen(_open);
    }, [_open]);

    const handleClose = () => {
        if (!dontClose) {
            setOpen(!open);
            _setOpen(!open);
            onClose?.();
        }
    };

    const childrenProps = {
        onClose: handleClose,
    };

    const modalContent = (
        <>
            {buttonComp?.({
                onClick: handleClose,
            })}
            {open &&
                ReactDOM.createPortal(
                    <div className={`${cssClasses.container}`}>
                        <div
                            onClick={() => {
                                if (!dontCloseOnOverlay) handleClose();
                            }}
                            className={`${cssClasses.overlay}`}
                            style={{ backgroundColor: underlayColor || "#F5F5F580" }}
                        ></div>

                        <div
                            className={`${className} ${cssClasses.content}`}
                            style={{ width: width || "auto", height: height || "auto" }}
                        >
                            {!noTitleWrapper && (
                                <div className={cssClasses.titleWrapper}>
                                    {showBack && (
                                        <div className={cssClasses.icon} onClick={handleClose}>
                                            <BiLeftArrowAlt size={24} />
                                        </div>
                                    )}
                                    {title && (
                                        <h4 className={`${cssClasses.title} ${titleClassName}`}>
                                            {title}
                                        </h4>
                                    )}
                                    <div className="flex gap-3">
                                        {handleMinimize && (
                                            <div
                                                className={cssClasses.icon}
                                                onClick={handleMinimize}
                                            >
                                                <MinusIcon />
                                            </div>
                                        )}
                                        {showClose && (
                                            <div className={cssClasses.icon} onClick={handleClose}>
                                                <XMarkIcon />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                            {typeof children === "function" ? children(childrenProps) : children}
                        </div>
                    </div>,
                    document.getElementById("root"), // Make sure to add this in your HTML
                )}
        </>
    );

    return modalContent;
};

export default CustomDialog;
