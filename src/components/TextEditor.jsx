import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useField } from "formik";
import {
    ClassicEditor,
    AccessibilityHelp,
    Autoformat,
    Autosave,
    BlockQuote,
    Bold,
    Essentials,
    Heading,
    Indent,
    IndentBlock,
    Italic,
    Link,
    List,
    ListProperties,
    MediaEmbed,
    Paragraph,
    PasteFromOffice,
    SelectAll,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    TextTransformation,
    TodoList,
    Underline,
    Undo,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";
import CLabel from "./common/CLabel";

const TextEditor = ({
    label,
    required = false,
    placeholder = "",
    name = "",
    initialData = "",
    disabled = false,
}) => {
    const [field, meta, helpers] = useField(name); // useField hook for Formik integration
    const [isLayoutReady, setIsLayoutReady] = useState(false);

    useEffect(() => {
        setIsLayoutReady(true);
        return () => setIsLayoutReady(false);
    }, []);

    useEffect(() => {
        if (!field.value) {
            helpers.setValue(initialData); // Set initial data only if the field is empty (initial load)
        }
    }, [initialData, field.value, helpers]);

    const editorConfig = {
        toolbar: {
            items: [
                "undo",
                "redo",
                "|",
                "heading",
                "|",
                "bold",
                "italic",
                "underline",
                "|",
                "link",
                "mediaEmbed",
                "insertTable",
                "blockQuote",
                "|",
                "bulletedList",
                "numberedList",
                "todoList",
                "outdent",
                "indent",
            ],
            shouldNotGroupWhenFull: false,
        },
        plugins: [
            AccessibilityHelp,
            Autoformat,
            Autosave,
            BlockQuote,
            Bold,
            Essentials,
            Heading,
            Indent,
            IndentBlock,
            Italic,
            Link,
            List,
            ListProperties,
            MediaEmbed,
            Paragraph,
            PasteFromOffice,
            SelectAll,
            Table,
            TableCaption,
            TableCellProperties,
            TableColumnResize,
            TableProperties,
            TableToolbar,
            TextTransformation,
            TodoList,
            Underline,
            Undo,
        ],
        placeholder: placeholder || "Type or paste your content here!",
    };

    const isError = meta.touched;
    return (
        <div>
            {label && <CLabel label={label} error={isError} required={required} />}

            <div>
                {isLayoutReady && (
                    <CKEditor
                        editor={ClassicEditor}
                        config={editorConfig}
                        disabled={disabled}
                        data={field.value || initialData} // Use Formik field value or initialData
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            helpers.setValue(data); // Update Formik field value
                        }}
                        onBlur={() => helpers.setTouched(true)} // Mark field as touched when CKEditor is blurred
                    />
                )}
            </div>
            {isError && <CLabel label={meta.error} error={true} />}
        </div>
    );
};

export default TextEditor;
