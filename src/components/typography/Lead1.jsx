import React from "react";

const Lead1 = ({ className = "", children }) => {
    return <h1 className={"text-base text-[#475569]" + className}>{children}</h1>;
};

export default Lead1;
