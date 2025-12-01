import React from "react";

const Headline1 = ({ className = "", children }) => {
    return <h1 className={"text-3xl font-semibold " + className}>{children}</h1>;
};

export default Headline1;
