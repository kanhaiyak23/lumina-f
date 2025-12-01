import React, { useEffect, useRef, useState } from "react";
import cssClasses from "./VerticalTab.module.css";
import CustomPaperBox from "../CustomPaperBox";
import LodingSvg from "../../../assets/loading.webp";
const VerticaltabScroll = ({
    tabList = [],
    tabIndex = 0,
    paperBox = false,
    onChange = () => {},
    onScrollEnd = () => {},
    className = "",
    titleWrapperClassName = "",
    isLoading = false,
}) => {
    const [state, setState] = useState(tabIndex);
    const titleWrapperRef = useRef(null);

    useEffect(() => {
        setState(tabIndex);
    }, [tabIndex]);

    const activeComp = tabList.find((tab, index) => index === state);

    useEffect(() => {
        const defaultData = tabList?.[0]?.data;
        if (defaultData) onChange(defaultData);
    }, []);

    const handleScroll = () => {
        const wrapper = titleWrapperRef.current;
        if (!wrapper) return;

        const { scrollTop, scrollHeight, clientHeight } = wrapper;
        if (scrollTop + clientHeight >= scrollHeight - 10) {
            onScrollEnd();
        }
    };

    return (
        <div className={`${cssClasses.container} ${className}`}>
            <div
                ref={titleWrapperRef}
                className={`${cssClasses.titleWrapper} ${titleWrapperClassName}`}
                onScroll={handleScroll}
            >
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
                {isLoading && (
                    <div className="h-full w-full flex justify-center items-center">
                        <img src={LodingSvg} alt="" className="w-16 h-16" />
                    </div>
                )}
            </div>
            <div className="flex-1 flex flex-col overflow-hidden">{activeComp?.component}</div>
        </div>
    );
};

export default VerticaltabScroll;
