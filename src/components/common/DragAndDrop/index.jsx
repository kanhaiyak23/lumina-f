import React, { useCallback, useState } from "react";
import { BiCloudUpload } from "react-icons/bi";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import CustomButton from "../CustomButton/CustomButton";
import Text from "../../typography/Text";

const DragAndDrop = ({ onChange = () => {}, accept = "image/*" }) => {
    const onDrop = useCallback(acceptedFiles => {
        // Filter acceptedFiles to keep only image files
        const imageFiles = acceptedFiles.filter(file => file.type.startsWith("image/"));
        let file = imageFiles[0];
        if (imageFiles.length === 0) {
            // No image files found, show a warning message
            toast("Please select image files only.");
            return;
        }

        // Do something with the image files
        // For now, we'll just log the first image file.
        setFile(imageFiles);
        console.log({ imageFiles });
        onChange(imageFiles);

        // console.log({ imageFiles });
    }, []);
    const [file, setFile] = useState(null);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: accept, // Accept only image files
    });

    return (
        <div>
            <div
                {...getRootProps()}
                className="flex flex-col gap-6 rounded-lg mx-auto p-5"
                style={{
                    background: isDragActive ? `whitesmoke` : "transparent",
                    transform: isDragActive && "scale(0.95)",
                    transition: "0.4s",
                    cursor: "pointer",
                }}
            >
                <input style={{ display: "none" }} {...getInputProps()} accept={accept} />
                <div className="border border-black border-dashed flex flex-col gap-4 items-center p-8 self-center">
                    <BiCloudUpload size={150} />
                    <Text>Drag and Drop the Photos</Text>
                    <div className="flex w-96 items-center gap-4">
                        <div className=" flex-1 w-full h-0 border border-gray-light"></div>
                        <p className="text-xl">or</p>
                        <div className=" flex-1 w-full h-0 border border-gray-light"></div>
                    </div>
                    <CustomButton
                        // onClick={selectFiles}
                        variant="outlined"
                        className="border-primary text-primary"
                        label="Browse the File"
                    />
                </div>
            </div>
        </div>
    );
};

export default DragAndDrop;
