import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { Upload } from "lucide-react";
import draganddropimage from "../../assets/draganddrop.svg";

const DragAndDrop = ({ onChange = () => {}, accept = "image/*" }) => {
    const [file, setFile] = useState(null);

    const onDrop = useCallback(
        acceptedFiles => {
            const imageFiles = acceptedFiles.filter(file => file.type.startsWith("image/"));

            if (imageFiles.length === 0) {
                toast("Please select image files only.");
                return;
            }

            setFile(imageFiles);
            onChange(imageFiles);
        },
        [onChange],
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".png", ".jpg", ".jpeg", ".gif", ".svg"],
        },
    });

    return (
        <div
            {...getRootProps()}
            className={`
        w-[345px] h-auto max-h-[120px] rounded-2xl border-2 border-dashed px-4 py-4
        flex flex-col items-center justify-center gap-4
        transition-all duration-300 cursor-pointer
        ${isDragActive ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-gray-400"}
      `}
        >
            <input {...getInputProps()} className="hidden" />

            <div className="w-10 h-10  rounded-xl flex items-center justify-center">
                <img src={draganddropimage} alt="draganddrop" className="w-10 h-10" />
                {/* <Upload className="w-8 h-8 text-gray-600" /> */}
            </div>

            <div className="text-center">
                <p className="text-base">
                    <span className="text-green-500 font-medium">Click to upload Photo</span>
                    <span className="text-gray-700"> or drag and drop</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG or GIF</p>
            </div>
        </div>
    );
};

export default DragAndDrop;
