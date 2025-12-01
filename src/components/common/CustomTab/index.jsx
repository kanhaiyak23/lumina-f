import React, { useEffect, useState } from "react";
import cssClasses from "./CustomTab.module.css";
const CustomTab = ({ tabList = [], tabIndex = 0, rightComp = null }) => {
    const [state, setState] = useState(tabIndex);
    useEffect(() => {
        setState(tabIndex);
    }, [tabIndex]);

    const activeComp = tabList.find((tab, index) => index === state);
    return (
        <div className={cssClasses.container}>
            <div className={`${rightComp ? "flex justify-between items-center" : ""}`}>
                <div
                    className={`${cssClasses.titleWrapper} ${rightComp ? "flex-none" : "flex-1"} `}
                >
                    {tabList.map((tab, index) => {
                        const isActive = index === state;
                        return (
                            <div
                                className={`${cssClasses.title} ${
                                    isActive ? cssClasses.titleActive : ""
                                }`}
                                onClick={() => setState(index)}
                            >
                                {tab.startIcon}
                                {tab.title}
                                {tab.endIcon}
                            </div>
                        );
                    })}
                </div>
                {rightComp}
            </div>
            <div className="children h-full flex flex-1 flex-col overflow-hidden" key={state}>
                {activeComp?.component}
            </div>
        </div>
    );
};

export default CustomTab;
