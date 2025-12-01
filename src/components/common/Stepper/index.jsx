import React, { useEffect, useState } from "react";
import cssClasses from "./Stepper.module.css";
import { CheckIcon } from "@heroicons/react/16/solid";
const Stepper = ({
    tabList = [],
    tabIndex = 0,
    rightComp = null,
    stepperWidth = "auto",
    disableInnerStateHandling = false,
}) => {
    const [state, setState] = useState(tabIndex);
    useEffect(() => {
        setState(tabIndex);
    }, [tabIndex]);

    const activeComp = tabList.find((tab, index) => index === state);
    return (
        <div className={cssClasses.container}>
            <div className={`${rightComp ? "flex justify-between items-center" : ""}`}>
                <div
                    className={`${cssClasses.titleWrapper} ${
                        rightComp ? "flex-none" : "flex-1"
                    } w-[${stepperWidth}]`}
                >
                    {tabList.map((tab, index) => {
                        const isActive = index === state;
                        const isCurrentTab = index <= state;
                        const isPrevDoneTab = index <= state - 1;
                        return (
                            <>
                                {console.log(index, index + 1)}
                                <div
                                    className={`${cssClasses.title} ${
                                        isActive ? cssClasses.titleActive : ""
                                    }`}
                                    onClick={() => !disableInnerStateHandling && setState(index)}
                                >
                                    <div
                                        className={`${cssClasses.radioIcon} ${
                                            isPrevDoneTab
                                                ? cssClasses.radioIconActiveted
                                                : isCurrentTab
                                                  ? cssClasses.radioIconActive
                                                  : null
                                        }`}
                                    >
                                        {isPrevDoneTab ? (
                                            <div className="h-5 w-5">
                                                <CheckIcon color="white" />
                                            </div>
                                        ) : isCurrentTab ? (
                                            <div
                                                className={`${cssClasses.radioIconContent} ${
                                                    isCurrentTab
                                                        ? cssClasses.radioIconContentActive
                                                        : null
                                                }`}
                                            ></div>
                                        ) : null}
                                    </div>
                                    <span className={cssClasses.titleContent}>
                                        {tab.startIcon}

                                        {tab.title}
                                        {tab.endIcon}
                                    </span>
                                </div>
                                {!(index === tabList.length) && index + 1 !== tabList.length ? (
                                    <div className={cssClasses.breakLine}></div>
                                ) : null}
                            </>
                        );
                    })}
                </div>
                {rightComp}
            </div>
            <div className="children h-full">{activeComp.component}</div>
        </div>
    );
};

export default Stepper;
