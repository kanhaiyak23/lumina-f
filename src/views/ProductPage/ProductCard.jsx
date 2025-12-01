import React, { useState } from "react";
import { ShoppingCart, Info, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
const ProductCard = ({ image, title, price, quantity, originalPrice, onAddToCart, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    const isOutOfStock = quantity === 0;
    const isLowStock = quantity > 0 && quantity <= 5;
    return (
        <motion.div
            className={`bg-white rounded-xl shadow-md overflow-hidden h-full border relative 
          ${isOutOfStock ? "border-gray-200" : "border-[#D9D9D9]"}
          ${isHovered && !isOutOfStock ? "shadow-lg" : "shadow-md"}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
        >
            {/* Image Container */}
            <div className="relative overflow-hidden  ">
                <div className="aspect-w-1 aspect-h-1 relative">
                    <img
                        src={image}
                        alt={title}
                        className={`w-full h-48 object-cover transition-all duration-500
                ${isOutOfStock ? "filter grayscale brightness-75" : ""}
                ${isHovered && !isOutOfStock ? "scale-105" : "scale-100"}`}
                    />

                    {/* Overlay for out of stock */}
                    {isOutOfStock && (
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center p-4">
                            <span className="text-white text-lg font-bold mb-2 bg-red-600 px-4 py-1 rounded-full">
                                OUT OF STOCK
                            </span>
                        </div>
                    )}

                    {/* Low stock warning */}
                    {isLowStock && (
                        <div className="absolute bottom-2 left-2 right-2 bg-yellow-500 bg-opacity-90 text-white text-xs font-medium px-2 py-1 rounded flex items-center">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Only {quantity} left in stock
                        </div>
                    )}
                </div>
            </div>

            {/* Product Details */}
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{title}</h3>

                {/* Price Section */}
                <div className="mt-2 flex items-center">
                    <span
                        className={`text-xl font-medium ${isOutOfStock ? "text-gray-500" : "text-gray-900"}`}
                    >
                        ₹{price.toLocaleString()}
                    </span>
                    {originalPrice && originalPrice > price && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                            ₹{originalPrice.toLocaleString()}
                        </span>
                    )}
                </div>

                {/* Action Button */}
                <div className="mt-4">
                    {isOutOfStock ? (
                        <div className="flex items-center justify-center text-gray-500 border border-gray-300 rounded-md py-2 px-4">
                            <Info className="w-4 h-4 mr-2" />
                            <span>Currently Unavailable</span>
                        </div>
                    ) : (
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-lg text-white py-2 px-4 rounded-md flex items-center justify-center transition-all"
                            onClick={onAddToCart}
                        >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Add to Cart
                        </motion.button>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
