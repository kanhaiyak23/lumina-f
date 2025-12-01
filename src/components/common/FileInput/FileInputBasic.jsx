import React, { useRef, useState } from "react";
import CustomButton from "../CustomButton/CustomButton";
import { MdAddCircle } from "react-icons/md";
import { warnToast } from "../../../utils/toasts";

const FileInputBasic = ({
    variant = "traditional",
    buttonVariant = "outlined",
    label = "Upload File",
    setSelectedFiles = () => {},
    icon = null,
    accept = "*",
    size = 0,
    sizeVariant = "MB",
    name = null,
    multipleFiles = false,
}) => {
    const fileSizeRestrict = size * (sizeVariant === "MB" ? 1024 * 1024 : 1024);
    const [files, setFiles] = useState({});
    const fileInputRef = useRef(null);

    console.log({ files });

    const handleClick = () => {
        fileInputRef.current.value = null;
        fileInputRef.current.click();
    };
    const onChange = event => {
        if (size) {
            const isLargerThen2mb = Object.values(event.target.files).some(
                file => file.size > fileSizeRestrict,
            );
            if (isLargerThen2mb) {
                warnToast(`Plese choose less than ${size}${sizeVariant} files`);
                return;
            } else {
                console.log("files", event.target.files);
                setSelectedFiles(event.target.files);
                setFiles(event.target.files);
            }
        } else {
            console.log("files", event.target.files);
            setSelectedFiles(event.target.files);
            setFiles(event.target.files);
        }
    };

    console.log(999);
    console.log(Object.values(files));

    const _files = Object.values(files);

    return (
        <>
            <input
                name={name}
                accept={accept}
                id="fileInput"
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={onChange}
                multiple={multipleFiles}
            />
            {variant === "traditional" ? (
                <div className="flex gap-2 items-center">
                    <label for="fileInput">
                        <button
                            className="rounded-md border py-1 px-2 text-sm"
                            onClick={handleClick}
                        >
                            {label}
                        </button>
                    </label>

                    <span
                        className="text-xs max-w-64"
                        onClick={() => console.log(fileInputRef.current.files?.[0]?.name)}
                    >
                        {_files.length === 0
                            ? size
                                ? `Max ${size}${sizeVariant} file size`
                                : "No Files"
                            : _files.map(file => file.name).join(", ")}
                    </span>
                    <span className="text-xs"></span>
                </div>
            ) : (
                <CustomButton
                    label={label}
                    variant={buttonVariant}
                    startIcon={icon || <MdAddCircle />}
                    onClick={handleClick}
                />
            )}
        </>
    );
};

export default FileInputBasic;
