import React, { useEffect, useState } from "react";
import cssClasses from "./CustomAccordionSidebar.module.css";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import CustomButton from "../CustomButton/CustomButton";
import RespIcon from "../RespIcon";
export const CustomAccordionSidebar = ({
    icon,
    title,
    ButtonComp = null,
    children,
    defaultValue = false,
}) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (defaultValue) setShow(defaultValue);
    }, [defaultValue]);

    const iconWrapper = (
        <span className={show ? "rotate-180" : "rotate-0 "}>
            <RespIcon icon={<ChevronDownIcon />} />
        </span>
    );

    const traditional = (
        <>
            <div
                className={`${cssClasses.header} ${show ? cssClasses.headerActive : ""}`}
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
        <div className={cssClasses.container}>
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
