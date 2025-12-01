import React from "react";
import { useNavigate } from "react-router-dom";
import { staticProducts } from "../../constants/staticData";

const Products = () => {
    const navigate = useNavigate();

    const features = [
        {
            title: "Diverse Collection",
            description: "From casual wear to formal attire, find your perfect style.",
        },
        {
            title: "Premium Materials",
            description: "Quality fabrics that last and feel amazing.",
        },
        {
            title: "Seasonal Updates",
            description: "New arrivals every season to keep you trendy.",
        },
    ];

    // Show only first 6 products on home page
    const displayProducts = staticProducts.slice(0, 6);

    return (
        <div className="max-w-7xl mx-auto px-4 py-16 bg-white">
            {/* Heading */}
            <div className="flex justify-center mb-12">
                <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Our Collection
                </h2>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 text-center shadow-lg border border-purple-100"
                    >
                        <h3 className="font-semibold text-lg bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                            {feature.title}
                        </h3>
                        <p className="text-gray-600">{feature.description}</p>
                    </div>
                ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayProducts.map(product => (
                    <div
                        key={product.id}
                        className="rounded-3xl p-4 bg-white shadow-lg border border-purple-100 hover:shadow-xl transition-shadow cursor-pointer"
                        onClick={() => navigate(`/product/${product.id}`)}
                    >
                        <div className="rounded-2xl overflow-hidden border border-purple-100 mb-6">
                            <img
                                src={product.images[0]}
                                alt={product.title}
                                className="w-full h-[280px] object-cover hover:scale-105 transition-transform"
                            />
                        </div>
                        <div className="px-4 pb-4">
                            <h3 className="font-semibold text-2xl text-gray-800 mb-3">
                                {product.title}
                            </h3>
                            <p className="text-gray-600 text-lg mb-3 line-clamp-2">
                                {product.summary}
                            </p>
                            <div className="flex items-center gap-2">
                                {product.salePrice ? (
                                    <>
                                        <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                                            ${product.salePrice}
                                        </span>
                                        <span className="text-lg text-gray-400 line-through">
                                            ${product.originalPrice}
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                                        ${product.price}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Explore All Button */}
            <div className="flex justify-center mt-12">
                <button
                    onClick={() => navigate('/products')}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all"
                >
                    Explore All Products
                </button>
            </div>
        </div>
    );
};

export default Products;
