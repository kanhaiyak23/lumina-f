import React, { useState, useEffect } from "react";
import { Star, Truck, RotateCcw, Minus, Plus, ChevronRight } from "lucide-react";
import { selectSelectedProduct } from "../../Redux Store/Slices/products";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, updateQuantity } from "../../Redux Store/Slices/cart";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerticalTab from "../../components/common/VerticalTab/index";
import ProductCard from "./ProductCard";
import Grid from "../../components/layout/grid/Grid";
import { PRODUCT_INFO, REFUND_POLICY, SHIPPING_POLICY } from "../../constants/siteContent";
import { warnToast } from "../../utils/toasts";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
    const dispatch = useDispatch();

    const product = useSelector(selectSelectedProduct);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState(0);
    const selectAllProducts = useSelector(state => state.products.products);

    const location = useLocation();

    const { id } = useParams();

    useEffect(() => {
        // fetch or recalc based on id
        console.log("Product changed", id);
    });
    // Scroll to top when component mounts or product changes
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, [location.pathname, product]);

    if (!product) {
        return (
            <div className="w-full py-20 text-center text-gray-600">
                Loading product...
            </div>
        );
    }



    const handleAddToCart = product => {
        // Check if user is authenticated
        if (!isAuthenticated) {
            warnToast("Please login first to add items to cart!");
            return;
        }

        if (!selectedSize && product.sizes) {
            warnToast("Please select a size!");
            return;
        }

        try {
            dispatch(addToCart({ ...product, quantity, size: selectedSize }));
            toast.success(`${product.title} added to cart!`, {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
            });
        } catch (error) {
            toast.error("Failed to add product to cart!", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    const handleUpdateQuantity = newQuantity => {
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
            dispatch(updateQuantity({ id: product.id, quantity: newQuantity }));
        }
    };
    const descriptionText = product?.description?.trim()?.length
        ? product.description
        : PRODUCT_INFO.description;
    const highlightFeatures = PRODUCT_INFO.features;
    const usageGuidelines = PRODUCT_INFO.usage;

    const renderPolicySections = policy => (
        <div className="space-y-4">
            <p className="text-sm text-gray-600">{policy.intro}</p>
            {policy.sections.map(section => (
                <div key={section.heading} className="space-y-2">
                    <h4 className="text-base font-semibold text-gray-900">{section.heading}</h4>
                    {section.content && <p className="text-sm text-gray-600">{section.content}</p>}
                    {section.items && (
                        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                            {section.items.map(item => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );

    const tabs = [
        {
            id: "summary",
            title: "Product Summary",
            data: "summary",
            component: (
                <div className="prose max-w-none">
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-[#333333] mb-4">
                        Summary
                    </h3>
                    <p className="text-sm sm:text-base text-[#333333]">{descriptionText}</p>
                    <div className="mt-6">
                        <h4 className="text-lg font-semibold mb-3 text-[#333333]">Features</h4>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-[#333333]">
                            {highlightFeatures.map(feature => (
                                <li key={feature}>{feature}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-6">
                        <h4 className="text-lg font-semibold mb-3 text-[#333333]">Usage</h4>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-[#333333]">
                            {usageGuidelines.map(step => (
                                <li key={step}>{step}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            ),
        },
        {
            id: "shipping",
            title: "Shipping & Return",
            data: "shipping",
            component: (
                <div className="prose max-w-none">
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-[#333333] mb-4">
                        Shipping
                    </h3>
                    <div className="space-y-6">
                        {renderPolicySections(SHIPPING_POLICY)}
                        <div className="border-t border-gray-200 pt-4">
                            <h3 className="text-xl font-semibold text-[#333333] mb-4">
                                Return & Refund Policy
                            </h3>
                            {renderPolicySections(REFUND_POLICY)}
                        </div>
                    </div>
                </div>
            ),
        },

    ];

    return (
        <div className="main-content-container py-4 md:py-6 lg:py-8">
            {/* Breadcrumb */}
            <div className="px-4 md:px-6 lg:px-8">
                <nav className="w-full mb-4 md:mb-6 lg:mb-8">
                    <ol className="flex items-center space-x-2 text-sm md:text-base text-gray-600">
                        <li>
                            <a href="/products" className="hover:text-green-600">
                                Products
                            </a>
                        </li>
                        <li className="text-gray-400">
                            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 mx-1 md:mx-2" />
                        </li>
                        <li className="text-gray-900 truncate">{product.title}</li>
                    </ol>
                </nav>
            </div>

            {/* Main Product Section */}
            <div className="px-4 md:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-9">
                    {/* Image Gallery */}
                    <div className="flex flex-col-reverse lg:flex-row gap-4 lg:gap-9">
                        {/* Thumbnails */}
                        <div className="flex lg:flex-col gap-2 lg:gap-4 overflow-x-auto lg:overflow-x-visible scrollbar-hide">
                            {product?.images?.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`flex-shrink-0 aspect-square rounded-lg overflow-hidden border-2 w-16 h-16 md:w-20 md:h-20 lg:w-[100px] lg:h-[100px] ${selectedImage === index
                                        ? "border-green-600"
                                        : "border-gray-200"
                                        }`}
                                >
                                    <img
                                        src={image}
                                        alt={`${product.title} thumbnail ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Main Image */}
                        <div className="relative aspect-square w-full lg:w-[400px] lg:h-[400px] overflow-hidden rounded-lg">
                            <img
                                src={product?.images?.[selectedImage]}
                                alt={product?.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                        <h1 className="text-2xl md:text-3xl font-bold mb-4">{product.title}</h1>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex">
                                {[...Array(5)].map((_, index) => (
                                    <Star
                                        key={index}
                                        className={`w-4 h-4 md:w-5 md:h-5 ${index < product.rating
                                            ? "text-yellow-400 fill-current"
                                            : "text-gray-300"
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="text-sm md:text-base text-gray-600">
                                {product.reviews} Reviews
                            </span>
                        </div>

                        {/* Price */}
                        <div className="mb-6">
                            <div className="flex flex-wrap items-center gap-2 md:gap-4">
                                <span className="text-2xl md:text-3xl font-bold">
                                    ₹{product.price}
                                </span>
                                <span className="text-lg md:text-xl text-gray-500 line-through">
                                    ₹{product.originalPrice}
                                </span>
                                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                                    You Save ₹{product.originalPrice - product.price}
                                </span>
                            </div>
                            <p className="text-sm md:text-base text-gray-600 mt-1">Tax Included</p>
                        </div>

                        {/* Stock Status */}
                        <div className="mb-6">
                            <span className="text-green-600 font-medium">In Stock</span>
                        </div>

                        {/* Size Selector */}
                        {product.sizes && (
                            <div className="mb-6">
                                <h3 className="text-sm font-medium text-gray-900 mb-3">Select Size</h3>
                                <div className="flex flex-wrap gap-3">
                                    {product.sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`w-12 h-12 rounded-md border flex items-center justify-center text-sm font-medium transition-all
                                                ${selectedSize === size
                                                    ? "border-green-600 bg-green-50 text-green-600"
                                                    : "border-gray-200 text-gray-600 hover:border-green-600"
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 space-y-3 mb-8">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Why you'll love it
                            </h3>
                            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                                {highlightFeatures.map(feature => (
                                    <li key={feature}>{feature}</li>
                                ))}
                            </ul>
                            <div className="border-t border-gray-200 pt-3">
                                <h4 className="text-sm font-semibold text-gray-800 mb-2">
                                    Usage Tips
                                </h4>
                                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                                    {usageGuidelines.map(step => (
                                        <li key={step}>{step}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Quantity and Add to Cart */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
                            <div className="flex items-center border rounded-md">
                                <button
                                    onClick={() => handleUpdateQuantity(quantity - 1)}
                                    className="p-2 hover:bg-gray-100"
                                    disabled={quantity <= 1}
                                >
                                    <Minus className="w-4 h-4 md:w-5 md:h-5" />
                                </button>
                                <span className="w-10 text-center py-1 text-sm md:text-base">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => handleUpdateQuantity(quantity + 1)}
                                    className="p-2 hover:bg-gray-100"
                                >
                                    <Plus className="w-4 h-4 md:w-5 md:h-5" />
                                </button>
                            </div>
                            <button
                                onClick={() => handleAddToCart(product)}
                                className="flex-1 bg-[#04A42A] text-white py-3 px-6 rounded-md hover:bg-green-700 transition-colors text-sm md:text-base"
                            >
                                Add To Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Shipping and Returns */}
            <div className="bg-[#F9F9F9] py-6 mt-8">
                <div className="px-4 md:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-20">
                        <div className="flex items-center gap-3">
                            <Truck className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
                            <span className="text-sm md:text-base">Free standard shipping</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <RotateCcw className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
                            <span className="text-sm md:text-base">7 days return policy</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Details Tabs */}
            <div className="mt-8 md:mt-12 lg:mt-16">
                <div className="border-l border-t border-r rounded-t-lg bg-[#F9F9F9]">
                    <div className="p-4 md:p-6 lg:p-10">
                        <div className="max-w-full overflow-x-auto">
                            <VerticalTab
                                tabList={tabs}
                                tabIndex={0}
                                onChange={(data, index) =>
                                    console.log("Selected Tab:", data, index)
                                }
                                className="rounded-lg min-w-[250px] sm:min-w-[300px]"
                                titleWrapperClassName="mb-4 flex flex-row gap-2 sm:gap-4 overflow-x-auto whitespace-nowrap"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            <div className="mt-8 md:mt-12 lg:mt-16 px-4 md:px-6 lg:px-8 overflow-auto">
                <div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
                        <span className="text-[#04A42A]">You'll love</span> these too...
                    </h2>
                    <hr className="border-r-2 border-black w-full mt-4 md:mt-6" />

                    <div className="mt-6 overflow-x-auto">
                        <div className="">
                            <div className="flex gap-4 p-2 sm:p-4 md:p-5 overflow-x-auto whitespace-nowrap no-scrollbar">
                                {selectAllProducts.map(product => (
                                    <div
                                        key={product.id}
                                        className="flex-shrink-0 w-[200px] sm:w-[250px] lg:w-[300px]"
                                    >
                                        <ProductCard
                                            image={product?.images?.[0]}
                                            title={product.title}
                                            price={product.price}
                                            originalPrice={product.originalPrice}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
