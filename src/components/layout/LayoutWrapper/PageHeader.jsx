import React from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const PageHeader = ({
    title = "",
    label = "",
    showBack = false,
    showBackOnClick = () => {},
    rightComp = null,
    size = "sm",
    noShowBackNavigate = false,
}) => {
    const navigate = useNavigate();
    return (
        <div className="flex gap-3 items-center">
            {showBack && (
                <span
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => {
                        !noShowBackNavigate && navigate(-1);
                        showBackOnClick?.();
                    }}
                >
                    <BiLeftArrowAlt size={24} />
                </span>
            )}
            <div className="flex flex-col">
                <h2 className={`font-semibold  mb-1 ${size === "sm" ? "text-base" : "text-xl"} `}>
                    {title}
                </h2>
                <p className="text-sm text-[#64748B]">{label}</p>
            </div>
            {rightComp && <div className="ml-auto">{rightComp}</div>}
        </div>
    );
};

export default PageHeader;
