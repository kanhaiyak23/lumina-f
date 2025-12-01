import React, { useEffect, useState } from "react";
import Grid from "../../components/layout/grid/Grid";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css";
import { warnToast } from "../../utils/toasts";
import { SlidersHorizontal } from "lucide-react";
import { CustomAccordion } from "../../components/common/CustomAccordion.jsx/CustomAccordion";
import CustomCheckbox from "../../components/common/CustomCheckbox";
import CustomButton from "../../components/common/CustomButton/CustomButton";
import CustomRange from "../../components/common/CustomRange";
import CustomDropdownMenu from "../../components/CustomDropdownMenu.jsx";
import sorting from "../../assets/ProductPage/arrow-data-transfer-vertical.svg";
import LoaderWebp from "../../assets/loading.webp";
import ProductHero from "../herosection/productherosection.jsx";
import {
    toggleCategory,
    setPriceRange,
    setSortBy,
    clearFilters,
    selectFilteredProducts,
} from "../../Redux Store/Slices/products";

import { getCategoryList } from "../../Services/category.service.js";
import { setCategories } from "../../Redux Store/Slices/products";
import { setProducts, setLoading } from "../../Redux Store/Slices/products";
import { getProductList } from "../../Services/product.service.js";
import { addToCart } from "../../Redux Store/Slices/cart";
import { ShoppingCart, X, LogIn, ArrowRight } from "lucide-react";
// import SignInModal from "./SigninModal.jsx";
import { Modal } from "./SigninModal.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import { selectProduct } from "../../Redux Store/Slices/products";

const ProductPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const selectedCategories = useSelector(state => state.products.selectedCategories);
    const priceRange = useSelector(state => state.products.priceRange);
    const categories = useSelector(state => state.products.categories);
    const sortBy = useSelector(state => state.products.sortBy);
    const filteredProducts = useSelector(selectFilteredProducts);
    const selectAllProducts = useSelector(state => state.products.products);
    const maxProductPrice = useSelector(state => state.products.maxPrice);
    const minProductPrice = useSelector(state => state.products.minPrice);

    const user = useSelector(state => state.auth.user);
    const isAuth = useSelector(state => state.auth.isAuthenticated);
    const loading = useSelector(state => state.products.loading);

    const [isOpen, setIsOpen] = useState(false);
    console.log(filteredProducts);
    const onClose = () => {
        setIsOpen(false);
    };

    const onSignIn = () => {
        navigate(`/userLogin?redirect=${encodeURIComponent(location.pathname)}`);
    };

    const handleAddToCart = (e, product) => {
        e.stopPropagation(); // Prevent card click navigation

        if (!isAuth) {
            warnToast("Please login first to add items to cart!");
            return;
        }

        try {
            dispatch(addToCart({ ...product, quantity: 1 }));
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
    const handleProductClick = product => {
        dispatch(selectProduct(product)); // Store selected product in Redux
        navigate(`/product/${product.id}`); // Navigate to product details page
    };
    const handleCategoryChange = categoryId => {
        dispatch(toggleCategory(categoryId));
    };

    const handleClearFilters = () => {
        dispatch(clearFilters());
    };

    const handleSortChange = e => {
        dispatch(setSortBy(e.target.value));
    };

    //get user from supabase after login in

    useEffect(() => {
        dispatch(setLoading(true));
        getCategoryList()
            .then(res => {
                dispatch(setCategories(res));
            })
            .catch(err => {
                console.log(err);
            });
        getProductList()
            .then(res => {
                dispatch(setProducts(res)); // Assuming you add a setProducts action in your slice
            })
            .catch(err => console.log(err))
            .finally(() => dispatch(setLoading(false)));
    }, []);

    return (
        <div className="min-h-screen bg-[#FFFFFF]">
            <div className="w-full">
                <ProductHero />
            </div>
            <div className="main-content-container mx-auto py-16">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Filters Section */}
                    <div className="w-full md:w-64 flex-shrink-0">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold flex items-center">
                                    <SlidersHorizontal className="w-5 h-5 mr-2" />
                                    Filters ({
                                        selectedCategories.length
                                    })
                                </h2>
                                <CustomButton
                                    label="Clear All"
                                    variant="green"
                                    size="sm"
                                    onClick={handleClearFilters}
                                />
                            </div>
                            <div className="border-b border-[#CCCCCC]"></div>

                            <div className="flex overflow-x-auto sm:flex-col space-x-4 sm:space-x-0 whitespace-nowrap pb-2">
                                <CustomAccordion
                                    title="Categories"
                                    defaultValue={false}
                                    variant="traditional"
                                >
                                    <div className="space-y-2 flex sm:flex-col gap-2">
                                        {categories.map(category => (
                                            <CustomCheckbox
                                                key={category.id}
                                                label={category.title} // Display category title
                                                checked={selectedCategories.includes(category.id)} // Check by ID
                                                onChange={() => handleCategoryChange(category.id)} // Pass ID instead of title
                                                name={category.title} // Optional: keep for accessibility
                                            />
                                        ))}
                                    </div>
                                </CustomAccordion>

                                <div className="border-b border-[#CCCCCC] sm:hidden"></div>

                                <CustomAccordion
                                    title="Price Range"
                                    defaultValue={false}
                                    variant="traditional"
                                >
                                    <div className="space-y-4 flex sm:flex-col gap-4">
                                        <CustomRange
                                            value={priceRange}
                                            min={minProductPrice}
                                            max={maxProductPrice}
                                            onChange={e =>
                                                dispatch(setPriceRange(Number(e.target.value)))
                                            }
                                            setValue={val => dispatch(setPriceRange(Number(val)))}
                                            className="bg-[#04A42A]"
                                        />
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>₹0</span>
                                            <span>₹{priceRange}</span>
                                        </div>
                                    </div>
                                </CustomAccordion>
                            </div>
                        </div>
                    </div>

                    {/* Products Grid Section */}
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-6 flex-wrap sm:flex-nowrap gap-2 sm:gap-0">
                            <h1 className="text-xl font-bold">
                                Showing {selectAllProducts.length} Products
                            </h1>
                            <div className="flex items-center gap-2">
                                <CustomDropdownMenu
                                    labelComp={
                                        <div className="flex items-center gap-2  border-2 border-[#787878] p-2 rounded-lg">
                                            <img src={sorting} alt="Sort Icon" className="" />
                                            <span className="  ">
                                                Sort By:{" "}
                                                {sortBy ? sortBy.replace("-", " ") : "Select"}
                                            </span>
                                        </div>
                                    }
                                    value={sortBy}
                                    onClick={item =>
                                        handleSortChange({ target: { value: item.value } })
                                    }
                                    list={[
                                        {
                                            label: "Popularity",
                                            value: "popularity",
                                            icon: (
                                                <img
                                                    src={sorting}
                                                    alt="Popularity"
                                                    className="w-4 h-4"
                                                />
                                            ),
                                        },
                                        {
                                            label: "Price: Low to High",
                                            value: "price-low-high",
                                            icon: (
                                                <img
                                                    src={sorting}
                                                    alt="Price Low to High"
                                                    className="w-4 h-4"
                                                />
                                            ),
                                        },
                                        {
                                            label: "Price: High to Low",
                                            value: "price-high-low",
                                            icon: (
                                                <img
                                                    src={sorting}
                                                    alt="Price High to Low"
                                                    className="w-4 h-4"
                                                />
                                            ),
                                        },
                                    ]}
                                />
                            </div>
                        </div>

                        {loading ? (
                            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[9999]">
                                <div className="flex flex-col items-center justify-center gap-4">
                                    {/* Animated Loader with Outer Glow */}
                                    <img
                                        src={LoaderWebp}
                                        className="w-16 h-16 animate-spin drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]"
                                        alt="Loading..."
                                    />
                                    <p className="text-white text-lg font-semibold">
                                        Loading, please wait...
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <Grid gap={24}>
                                {filteredProducts.map(product => (
                                    <Grid key={product.id} item xs={12} md={6} lg={4}>
                                        <ProductCard
                                            image={product?.images?.[1]}
                                            title={product.title}
                                            price={product.price}
                                            originalPrice={product.originalPrice}
                                            onAddToCart={e => handleAddToCart(e, product)}
                                            onClick={() => {
                                                handleProductClick(product);
                                            }}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </div>
                </div>
            </div>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                title="Your Cart"
                message="Please sign in to add items to your cart and checkout."
                icon={<ShoppingCart className="h-5 w-5 text-green-600" />}
                actions={[
                    {
                        label: "Sign In",
                        variant: "primary",
                        onClick: onSignIn,
                        icon: <LogIn className="h-5 w-5" />,
                    },
                    {
                        label: "Cancel",
                        variant: "secondary",
                        onClick: onClose,
                        icon: <X className="h-4 w-4" />,
                    },
                ]}
            />
        </div>
    );
};

export default ProductPage;
