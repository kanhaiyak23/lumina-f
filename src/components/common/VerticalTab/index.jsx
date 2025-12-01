import React, { useEffect, useState } from "react";
import cssClasses from "./VerticalTab.module.css";
import CustomPaperBox from "../CustomPaperBox";
const VerticalTab = ({
    tabList = [],
    tabIndex = 0,
    paperBox = false,
    onChange = () => {},
    className = "",
    titleWrapperClassName = "",
}) => {
    const [state, setState] = useState(tabIndex);
    useEffect(() => {
        setState(tabIndex);
    }, [tabIndex]);

    const activeComp = tabList.find((tab, index) => index === state);

    useEffect(() => {
        const defaultData = tabList?.[0]?.data;
        if (defaultData) onChange(defaultData);
    }, []);

    return (
        <div className={`${cssClasses.container} ${className}`}>
            <div className={`${cssClasses.titleWrapper} ${titleWrapperClassName} relative `}>
                {tabList.map((tab, index) => {
                    const isActive = index === state;
                    return tab.tabRenderComponent ? (
                        tab.tabRenderComponent?.({
                            variant: isActive ? "primary" : "default",
                            className: "cursor-pointer",
                            onClick: () => {
                                setState(index);
                                onChange(tab.data, index);
                            },
                        })
                    ) : paperBox ? (
                        <CustomPaperBox
                            variant={isActive ? "primary" : "default"}
                            className="cursor-pointer"
                            onClick={() => {
                                setState(index);
                                onChange(tab.data, index);
                            }}
                        >
                            {tab.title}
                        </CustomPaperBox>
                    ) : (
                        <div
                            className={`${cssClasses.title} ${
                                isActive ? cssClasses.titleActive : ""
                            }`}
                            onClick={() => {
                                setState(index);
                                onChange(tab.data, index);
                            }}
                        >
                            {tab.title}
                        </div>
                    );
                })}
            </div>
            <div className="flex-1 flex flex-col overflow-hidden">{activeComp?.component}</div>
        </div>
    );
};

export default VerticalTab;
