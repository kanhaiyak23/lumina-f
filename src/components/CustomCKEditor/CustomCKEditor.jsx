import React from "react";
import { useField } from "formik";
import CLabel from "../common/CLabel";
import CustomCKEditorBasic from "./CustomCKEditorBasic";

const CustomCKEditor = ({
    label,
    required = false,
    placeholder = "",
    name = "",
    initialData = "",
    disabled = false,
    onChange = () => {},
}) => {
    const [field, meta, helpers] = useField(name);

    const isError = meta.touched;

    return (
        <div className="flex flex-1 flex-col gap-2">
            <CustomCKEditorBasic
                name={name}
                label={label}
                required={required}
                placeholder={placeholder}
                initialData={field.value || initialData}
                disabled={disabled}
                onChange={data => {
                    onChange?.(data);
                    helpers.setValue(data); // Update Formik field value
                }}
                onBlur={() => helpers.setTouched(true)} // Mark field as touched when the editor loses focus
            />

            {isError && <CLabel label={meta.error} error={true} />}
        </div>
    );
};

export default CustomCKEditor;
