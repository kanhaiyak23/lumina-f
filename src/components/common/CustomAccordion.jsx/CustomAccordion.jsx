import React, { useEffect, useState } from "react";
import cssClasses from "./CustomAccordion.module.css";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import CustomButton from "../CustomButton/CustomButton";
export const CustomAccordion = ({
    icon,
    title,
    ButtonComp = null,
    children,
    defaultValue = false,
    variant = "paper",
}) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (defaultValue) setShow(defaultValue);
    }, [defaultValue]);

    const iconWrapper = (
        <span className={show ? "rotate-180" : "rotate-0 "}>
            <span className={cssClasses.icon}>
                <ChevronDownIcon />
            </span>
        </span>
    );

    const traditional = (
        <>
            <div
                className={`${cssClasses.header} ${getHeaderVariant(variant)} ${
                    show ? getActiveHeaderVariant(variant) : ""
                }`}
                onClick={() => setShow(!show)}
            >
                <div className={cssClasses.titleWrapper}>
                    {icon}
                    <h3 className={`${cssClasses.title} ${show ? cssClasses.titleActive : ""}`}>
                        {title}
                    </h3>
                </div>
                {iconWrapper}
            </div>
        </>
    );

    return (
        <div className={`${cssClasses.container} ${getContainerVariant(variant)}`}>
            {ButtonComp ? (
                <div className="relative">
                    <ButtonComp onClick={() => setShow(!show)} />
                    <div className="absolute h-full top-0 right-2 grid place-content-center">
                        {iconWrapper}
                    </div>
                </div>
            ) : (
                traditional
            )}
            {show && <div className={cssClasses.contentWrapper}>{children}</div>}
        </div>
    );
};

function getContainerVariant(variant = "paper") {
    switch (variant) {
        case "paper": {
            return cssClasses.paper;
        }
        case "traditional": {
            return cssClasses.traditional;
        }
        default: {
            return cssClasses.paper;
        }
    }
}

function getHeaderVariant(variant = "paper") {
    switch (variant) {
        case "paper": {
            return cssClasses["header-paper"];
        }
        case "traditional": {
            return cssClasses["header-traditional"];
        }
        default: {
            return cssClasses["header-paper"];
        }
    }
}

function getActiveHeaderVariant(variant = "paper") {
    switch (variant) {
        case "paper": {
            return cssClasses["headerActive-paper"];
        }
        case "traditional": {
            return cssClasses["headerActive-traditional"];
        }
        default: {
            return cssClasses["headerActive-paper"];
        }
    }
}
