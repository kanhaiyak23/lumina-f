import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const initialState = {
    products: [],
    selectedCategories: [],
    quantity: 0,
    priceRange: null,
    sortBy: "popularity",
    cart: [],
    categories: [],
    status: "idle",
    error: null,
    loading: false,
    selectedProduct: null,
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        toggleCategory: (state, action) => {
            const categoryId = action.payload;
            state.selectedCategories.includes(categoryId)
                ? (state.selectedCategories = state.selectedCategories.filter(
                      id => id !== categoryId,
                  ))
                : state.selectedCategories.push(categoryId);
        },

        setPriceRange: (state, action) => {
            state.priceRange = action.payload;
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload;
        },
        setCategories: (state, action) => {
            state.categories = action.payload; // ✅ Store fetched categories
        },
        // set products
        setProducts: (state, action) => {
            state.products = action.payload;
            const maxPrice = Math.max(...action.payload.map(product => product.price || 0));
            const minPrice = Math.min(...action.payload.map(product => product.price || 0));
            state.minPrice = minPrice;
            state.priceRange = maxPrice; // Dynamically setting initial price range
            state.maxPrice = maxPrice; // Dynamically setting
            state.loading = false; //
        },

        clearFilters: state => {
            state.selectedCategories = [];
            state.priceRange = state.maxPrice; // Reset price range
            state.sortBy = "popularity";
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        selectProduct: (state, action) => {
            state.selectedProduct = action.payload;
        },
        clearSelectedProduct: state => {
            state.selectedProduct = null;
        },
    },
});

export const {
    toggleCategory,
    setPriceRange,
    setSortBy,
    setCategories,
    addToCart,
    clearFilters,
    setProducts,
    setLoading,
    selectProduct,
    clearSelectedProduct,
} = productsSlice.actions;

/* 🔥 Create Selectors */
export const selectProducts = state => state.products.products; //arr of products
const selectSelectedCategories = state => state.products.selectedCategories;
export const selectSelectedProduct = state => state.products.selectedProduct; //single product
const selectPriceRange = state => state.products.priceRange;
const selectSortBy = state => state.products.sortBy;

/* ✅ Memoized Category Filter */
const selectFilteredByCategory = createSelector(
    [selectProducts, selectSelectedCategories],
    (products, selectedCategories) => {
        if (selectedCategories.length === 0) return products;

        return products.filter(
            product =>
                product.categories?.some(category => selectedCategories.includes(category.id)), // ✅ Efficient category filtering
        );
    },
);

/* ✅ Memoized Price Range Filter */
const selectFilteredByPrice = createSelector(
    [selectFilteredByCategory, selectPriceRange],
    (filteredProducts, priceRange) => {
        return filteredProducts.filter(product => product.price <= priceRange);
    },
);

/* ✅ Memoized Sorting */
export const selectFilteredProducts = createSelector(
    [selectFilteredByPrice, selectSortBy],
    (filteredProducts, sortBy) => {
        let sortedProducts = [...filteredProducts];

        switch (sortBy) {
            case "price-low-high":
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case "price-high-low":
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            default:
                break;
        }

        return sortedProducts;
    },
);

export default productsSlice.reducer;
