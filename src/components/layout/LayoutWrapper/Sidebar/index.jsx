import React, { useState } from "react";
// import BrandPng from "../../../../assets/brand.png";
import { BriefcaseIcon, HomeIcon, UserIcon } from "@heroicons/react/16/solid";
import css from "./Sidebar.module.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LuFileScan, LuLogOut, LuSettings, LuSettings2 } from "react-icons/lu";
import CustomModal from "../../../common/CustomDialog/CustomModal";
import { useDispatch } from "react-redux";
import { logout, removeTokens } from "../../../../Redux Store/Slices/auth";
import { BiSolidGrid } from "react-icons/bi";
import { CustomAccordionSidebar } from "../../../common/CustomAccordionSidabar/CustomAccordionSidebar";
import { CustomAccordion } from "../../../common/CustomAccordion.jsx/CustomAccordion";
import RespIcon from "../../../common/RespIcon";
const Sidebar = ({ handleCloseSidebar }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const [list] = useState([
        {
            id: 1,
            name: "Dashboard",
            link: "/",
            icon: <HomeIcon />,
        },
        {
            id: 4,
            name: "Sign Out",
            icon: <LuLogOut />,
            onClick: () => {},
        },
    ]);

    return (
        <div className={css.wrapper}>
            <div className={css.brand} onClick={() => navigate("/login")}>
                <img src={""} alt="" />
            </div>

            <div className={css.menu}>
                {list.map((listItem, index) => {
                    return (
                        <LinkWrapper name={listItem.name}>
                            <CustomAccordionItem
                                listItem={listItem}
                                index={index}
                                onClick={handleCloseSidebar}
                            />
                        </LinkWrapper>
                    );
                })}
            </div>
        </div>
    );
};

export default Sidebar;

const LinkWrapper = ({ children, name }) => {
    const dispatch = useDispatch();
    if (name !== "Sign Out") return children;
    return (
        <CustomModal
            submitLabel={"Sure"}
            title={"Logout"}
            buttonComp={props => <span onClick={() => props?.onClick()}>{children}</span>}
            onSubmit={closeDialog => {
                dispatch(removeTokens());
                dispatch(logout());
                closeDialog();
            }}
            onCancel={closeDialog => {
                closeDialog();
            }}
        >
            <p className="text-base">Are you sure to logout?</p>
        </CustomModal>
    );
};

const CustomAccordionItem = ({ listItem, index, isChildren = false, onClick }) => {
    const location = useLocation();

    return (
        <NavLink
            to={listItem.link ? listItem.link : "#"}
            onClick={e => {
                onClick?.();
                if (listItem.link) {
                    // navigate(listItem.link);
                } else {
                    e.preventDefault();
                    listItem?.onClick?.();
                }
            }}
            className={({ isActive, isPending, isTransitioning }) =>
                [
                    css.menuItem,
                    listItem?.className || "",
                    isActive && listItem?.link ? css.menuItemActive : "",
                    `${isChildren ? "pl-[3.5rem!important]" : ""}`,
                ].join(" ")
            }
            key={`sideBar-${index}`}
        >
            <RespIcon icon={listItem.icon} />
            <p
                className={`${css.menuItemName} ${
                    location.pathname === listItem.link ? css.menuItemNameActive : ""
                }`}
            >
                {listItem.name}
            </p>
        </NavLink>
    );
};
