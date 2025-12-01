import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
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
import CLabel from "../common/CLabel";

const CustomCKEditorBasic = ({
    label,
    required = false,
    placeholder = "",
    initialData = "",
    disabled = false,
    onChange = () => {},
    onBlur = () => {},
    name = "",
}) => {
    const [data, setData] = useState(initialData);
    const [isLayoutReady, setIsLayoutReady] = useState(false);

    useEffect(() => {
        setIsLayoutReady(true);
        return () => setIsLayoutReady(false);
    }, []);

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

    return (
        <div>
            {label && <CLabel label={label} required={required} />}

            <div>
                {isLayoutReady && (
                    <CKEditor
                        name={name}
                        editor={ClassicEditor}
                        config={editorConfig}
                        disabled={disabled}
                        data={data}
                        onChange={(event, editor) => {
                            const newData = editor.getData();
                            setData(newData);
                            onChange?.(newData);
                        }}
                        onBlur={(event, editor) => {
                            const newData = editor.getData();
                            onBlur?.(newData); // Call onBlur with the current data
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default CustomCKEditorBasic;
