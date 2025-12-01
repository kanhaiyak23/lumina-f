import React from "react";

const Link1 = ({ className = "", children, onClick = () => {} }) => {
    return (
        <a className={"text-base text-[#2E7FFA]" + className} onClick={onClick}>
            {children}
        </a>
    );
};

export default Link1;
