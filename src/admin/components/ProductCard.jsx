import { EllipsisVertical, PackagePlus } from "lucide-react";
import StatusBadge from "./StatusBadge";

const ProductCard = ({ product, onEdit, onDelete }) => {
    const primaryImage = product.images?.[0]?.image_url;
    const remaining = product.stock_quantity ?? 0;

    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center overflow-hidden">
                        {primaryImage ? (
                            <img
                                src={primaryImage}
                                alt={product.title}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <PackagePlus className="text-emerald-400" />
                        )}
                    </div>
                    <div>
                        <p className="text-base font-semibold text-gray-900">{product.title}</p>
                        <p className="text-xs text-gray-500">
                            {product.summary || product.description}
                        </p>
                    </div>
                </div>

                <button
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
                    onClick={() => onEdit?.(product)}
                    aria-label="Edit product"
                >
                    <EllipsisVertical size={18} />
                </button>
            </div>

            <div className="flex items-center justify-between text-sm">
                <div>
                    <p className="text-gray-500">Price</p>
                    <p className="text-lg font-semibold text-gray-900">
                        ₹{Number(product.sale_price ?? product.price ?? 0).toLocaleString("en-IN")}
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-gray-500">Remaining Products</p>
                    <p className="font-semibold text-emerald-600">{remaining}</p>
                </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div className="flex gap-2 flex-wrap">
                    {product.categories?.map(category => (
                        <span
                            key={category.id}
                            className="text-xs px-2 py-1 rounded-full bg-emerald-50 text-emerald-700"
                        >
                            {category.title}
                        </span>
                    ))}
                </div>

                <div className="flex gap-3">
                    <button
                        className="text-xs font-semibold text-emerald-600 hover:text-emerald-800"
                        onClick={() => onEdit?.(product)}
                    >
                        Edit
                    </button>
                    <button
                        className="text-xs font-semibold text-rose-500 hover:text-rose-700"
                        onClick={() => onDelete?.(product)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
