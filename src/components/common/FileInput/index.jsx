import React, { useRef, useState } from "react";
import CustomButton from "../CustomButton/CustomButton";
import { MdAddCircle } from "react-icons/md";
import { warnToast } from "../../../utils/toasts";
import CLabel from "../CLabel";
import { useField } from "formik";
import FileInputBasic from "./FileInputBasic";

const FileInput = ({
    variant = "traditional",
    buttonVariant = "outlined",
    label = "Upload File",
    setSelectedFiles = () => {},
    icon = null,
    accept = "image/*",
    size = 0,
    sizeVariant = "MB",
    name = null,
    multipleFiles = false,
}) => {
    const [field, meta] = useField(name);
    const isError = meta.touched && meta.error;
    return (
        <div className="flex flex-col gap-4">
            <FileInputBasic
                variant={variant}
                buttonVariant={buttonVariant}
                label={label}
                setSelectedFiles={setSelectedFiles}
                icon={icon}
                accept={accept}
                size={size}
                sizeVariant={sizeVariant}
                {...field}
                multipleFiles={multipleFiles}
            />
            {isError && <CLabel error label={meta.error} />}
        </div>
    );
};

export default FileInput;
