import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { X } from "lucide-react";

const ImageUploader = ({ images = [], onChange = () => {} }) => {
    const handleRemove = image => {
        const next = images.filter(item => item.id !== image.id);
        if (image.preview) {
            URL.revokeObjectURL(image.preview);
        }
        onChange(next);
    };

    const onDrop = useCallback(
        acceptedFiles => {
            const formatted = acceptedFiles.map(file => ({
                id: `${file.name}-${Date.now()}`,
                file,
                preview: URL.createObjectURL(file),
                source: "local",
            }));
            onChange([...(images || []), ...formatted]);
        },
        [images, onChange],
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
    });

    return (
        <div className="space-y-4">
            <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-2xl px-4 py-6 text-center cursor-pointer ${
                    isDragActive ? "border-emerald-400 bg-emerald-50" : "border-gray-200"
                }`}
            >
                <input {...getInputProps()} />
                <p className="text-sm text-gray-600">
                    Click to upload or drag & drop SVG, PNG, JPG or GIF images
                </p>
            </div>

            <div className="flex flex-wrap gap-4">
                {images?.map(image => (
                    <div
                        key={image.id}
                        className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-100"
                    >
                        <img
                            src={image.preview || image.image_url}
                            alt="Product"
                            className="w-full h-full object-cover"
                        />
                        <button
                            type="button"
                            onClick={() => handleRemove(image)}
                            className="absolute top-1 right-1 bg-white/80 rounded-full p-0.5 text-gray-600 hover:text-rose-500"
                        >
                            <X size={14} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageUploader;
