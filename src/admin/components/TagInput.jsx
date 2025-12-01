import { useState } from "react";
import { X } from "lucide-react";

const TagInput = ({ value = [], onChange, placeholder = "Add tag" }) => {
    const [inputValue, setInputValue] = useState("");

    const addTag = () => {
        const trimmed = inputValue.trim();
        if (!trimmed) return;
        if (value.includes(trimmed)) {
            setInputValue("");
            return;
        }
        onChange([...(value || []), trimmed]);
        setInputValue("");
    };

    const handleKeyDown = e => {
        if (e.key === "Enter") {
            e.preventDefault();
            addTag();
        }
    };

    const removeTag = tag => {
        onChange(value.filter(item => item !== tag));
    };

    return (
        <div>
            <div className="flex flex-wrap gap-2 mb-2">
                {value?.map(tag => (
                    <span
                        key={tag}
                        className="flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-medium px-3 py-1 rounded-full"
                    >
                        {tag}
                        <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="text-emerald-500"
                        >
                            <X size={12} />
                        </button>
                    </span>
                ))}
            </div>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
                />
                <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2 rounded-xl bg-emerald-500 text-white text-sm font-semibold"
                >
                    Add
                </button>
            </div>
        </div>
    );
};

export default TagInput;
