import React from "react";

const CLabel = ({ label, required, className = "", error, labelStyle }) => {
    return (
        label && (
            <label className={"label font-medium text-sm text-left text-black" + className}>
                <span className={`${error ? "text-error" : "text-inherit"}`}>{label}</span>
                {required ? <span className="text-error">&nbsp;*</span> : null}
            </label>
        )
    );
};

export default CLabel;
