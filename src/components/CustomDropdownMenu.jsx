import React from "react";
import CustomMenu from "./common/CustomMenu";
import { LuChevronDown } from "react-icons/lu";
import CustomPaperBox from "./common/CustomPaperBox";

export const CustomDropDownMenuLabel = ({ label, icon }) => (
    <CustomPaperBox className="flex gap-2 items-center py-[0.25rem!important] px-[0.5rem!important] w-fit">
        {label && <span>{label}</span>}
        {icon || <LuChevronDown size={16} />}
    </CustomPaperBox>
);

const CustomDropdownMenu = ({
    list = [],
    label,
    icon = null,
    position = "default",
    labelComp = null,
    onClick = () => {},
    value = "",
}) => {
    const _label = `${label}${value && typeof value === "string" ? `: ${value}` : ""}`;
    return (
        <div className="relative">
            <CustomMenu
                position={position}
                label={labelComp || <CustomDropDownMenuLabel label={_label} icon={icon} />}
            >
                {({ handleToggle }) => (
                    <div className="flex flex-col ">
                        {list.map(item => (
                            <div
                                className="flex gap-3 item-center py-2 px-4 cursor-pointer hover:bg-slate-100"
                                onClick={() => {
                                    onClick(item);
                                    item?.onClick?.(item);
                                    handleToggle();
                                }}
                            >
                                {item.icon}
                                <span className="text-sm font-medium">{item.label}</span>
                            </div>
                        ))}
                    </div>
                )}
            </CustomMenu>
        </div>
    );
    return (
        <div className="relative">
            <CustomMenu>
                {({ handleToggle }) => (
                    <div className="flex flex-col ">
                        {list.map(item => (
                            <div
                                className="flex gap-3 item-center py-2 px-4 cursor-pointer hover:bg-slate-100"
                                onClick={() => {
                                    item?.onClick?.();

                                    handleToggle();
                                }}
                            >
                                {item.icon}
                                <span className="font-medium">{item.label}</span>
                            </div>
                        ))}
                    </div>
                )}
            </CustomMenu>
        </div>
    );
};

export default CustomDropdownMenu;
