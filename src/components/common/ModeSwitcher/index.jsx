import React, { useState } from "react";
import { TbHierarchy3 } from "react-icons/tb";
import { MdOutlineGridView } from "react-icons/md";
import RespIcon from "../RespIcon";

const ModeSwitcher = ({ onChange = () => {}, value = false }) => {
    return (
        <div
            className="w-20 h-10 rounded-[100px] bg-gray-light flex items-center"
            onClick={onChange}
        >
            <div
                className={`h-full w-10 flex justify-center items-center ${
                    value
                        ? "bg-primary rounded-full h-full w-10 flex justify-center items-center"
                        : ""
                }`}
            >
                <RespIcon
                    icon={<MdOutlineGridView className={`${value ? "text-white" : ""} `} />}
                />
            </div>
            <div
                className={`w-10 h-full flex justify-center items-center ${
                    !value
                        ? "bg-primary rounded-full h-full w-10 flex justify-center items-center"
                        : ""
                }`}
            >
                <RespIcon icon={<TbHierarchy3 className={`${!value ? "text-white" : ""} `} />} />
            </div>
        </div>
    );
};

export default ModeSwitcher;
