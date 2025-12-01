import React from "react";
import { useDispatch } from "react-redux";
import { Minus, Plus, Trash2 } from "lucide-react";
import CustomButton from "../../components/common/CustomButton/CustomButton";
import { updateQuantity, removeItem } from "../../Redux Store/Slices/cart";

const CartItem = ({ id, title, description, price, quantity, images }) => {
    const dispatch = useDispatch();

    const handleUpdateQuantity = newQuantity => {
        dispatch(updateQuantity({ id, quantity: newQuantity }));
    };

    const handleRemove = () => {
        dispatch(removeItem(id));
    };

    return (
        <div className="border-b border-gray-200 last:border-b-0">
            {/* Mobile Card View */}
            <div className="sm:hidden p-4 border-b border-gray-200">
                <div className="flex gap-4">
                    {/* Product Image */}
                    <img
                        src={images?.[0]}
                        alt={title}
                        className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                    />

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                        {/* Title and Description */}
                        <h3 className="text-base font-semibold truncate max-w-[100%]">{title}</h3>
                        <p className="text-gray-600 text-sm line-clamp-2 max-w-[90%] overflow-hidden">
                            {description}
                        </p>

                        {/* Price Section */}
                        <div className="flex items-center gap-2 my-2">
                            <span className="text-gray-600 text-sm">Price:</span>
                            <span className="font-semibold text-sm">₹{price.toFixed(2)}</span>
                        </div>

                        {/* Quantity Controls & Remove Button */}
                        <div className="flex items-center justify-start mt-2">
                            {/* Quantity Selector */}
                            <div className="flex items-center border border-gray-400 rounded-lg">
                                <button
                                    onClick={() => handleUpdateQuantity(quantity - 1)}
                                    disabled={quantity <= 1}
                                    className="px-2 py-1 hover:bg-gray-100 disabled:opacity-50 text-gray-600"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-10 text-center py-1 text-sm">{quantity}</span>
                                <button
                                    onClick={() => handleUpdateQuantity(quantity + 1)}
                                    className="px-2 py-1 hover:bg-gray-100 text-gray-600"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Remove Button */}
                            <CustomButton
                                variant="text"
                                size="sm"
                                onClick={handleRemove}
                                startIcon={<Trash2 className="w-5 h-5" />}
                                label=""
                                className="!text-gray-500 !px-0"
                            />
                        </div>

                        {/* Total Price */}
                        <div className="flex items-center gap-2 mt-2">
                            <span className="text-gray-600 text-sm">Total:</span>
                            <span className="font-semibold text-lg text-black">
                                ₹{(price * quantity).toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden sm:grid sm:grid-cols-12 gap-4 p-4 sm:px-6 sm:py-4 items-center">
                <div className="col-span-6 flex gap-4">
                    <img
                        src={images?.[0]}
                        alt={title}
                        className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0 ">
                        <h3 className="text-base font-semibold truncate">{title}</h3>
                        <p className="text-gray-600 text-sm line-clamp-2 w-full overflow-hidden max-w-[80%]">
                            {description}
                        </p>
                    </div>
                </div>

                <div className="col-span-2 flex justify-center ">
                    <div className="flex items-center border border-[#767676] rounded-lg w-20 md:w-auto">
                        <button
                            onClick={() => handleUpdateQuantity(quantity - 1)}
                            disabled={quantity <= 1}
                            className="px-2 py-1 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent text-[#767676]"
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center py-1">{quantity}</span>
                        <button
                            onClick={() => handleUpdateQuantity(quantity + 1)}
                            className="px-2 py-1 hover:bg-gray-100 text-[#767676]"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                    <CustomButton
                        variant="text"
                        size="sm"
                        onClick={handleRemove}
                        startIcon={<Trash2 className="w-4 h-4" />}
                        label=""
                        className="!text-[#808080] !px-0"
                    />
                </div>

                <div className="col-span-2 text-right">
                    <p className="font-semibold">₹{price.toFixed(2)}</p>
                </div>

                <div className="col-span-2 flex items-center justify-end gap-2">
                    <p className="font-semibold">₹{(price * quantity).toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
