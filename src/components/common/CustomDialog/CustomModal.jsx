import React from "react";
import CustomDialog from ".";
import CustomButton from "../CustomButton/CustomButton";

const CustomModal = ({
    title = null,
    buttonComp = () => <></>,
    children = null,
    onSubmit = onClose => onClose(),
    onCancel = onClose => onClose(),
    open = false,
    submitLabel,
    cancelLabel,
    disabled = false,
    underlayColor = null,
    titleClassName = "",
    showBack = false,
    noTitleWrapper = false,
}) => {
    return (
        <CustomDialog
            open={open}
            title={title}
            titleClassName={titleClassName}
            buttonComp={buttonComp}
            dontClose={disabled}
            underlayColor={underlayColor}
            showBack={showBack}
            noTitleWrapper={noTitleWrapper}
            // onClose={() => onCancel(() => {})}
        >
            {props => (
                <div className="flex flex-col gap-4 h-[100%]">
                    {children}
                    <div className="flex justify-end gap-2 mt-auto">
                        <CustomButton
                            label={cancelLabel || "Cancel"}
                            variant="outlined"
                            onClick={() => !disabled && onCancel(props.onClose)}
                        />
                        <CustomButton
                            disabled={disabled}
                            label={submitLabel || "Submit"}
                            variant="contained"
                            onClick={() => onSubmit(props.onClose)}
                        />
                    </div>
                </div>
            )}
        </CustomDialog>
    );
};

export default CustomModal;
