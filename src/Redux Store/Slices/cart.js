import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    addresses: [],
    selectedAddressId: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            if (!product.id) {
                console.error("Error: Product ID is missing.");
                return;
            }

            // Check if item exists with same ID AND same size (if size is applicable)
            const existingItem = state.items.find(
                item => item.id === product.id && item.size === product.size
            );

            if (existingItem) {
                // Update quantity for specific size variant
                state.items = state.items.map(item =>
                    (item.id === product.id && item.size === product.size)
                        ? { ...item, quantity: item.quantity + (product.quantity || 1) }
                        : item
                );
            } else {
                // Add new product variant to the cart
                state.items = [...state.items, { ...product, quantity: product.quantity || 1 }];
            }
        },

        updateQuantity: (state, action) => {
            const { id, quantity, size } = action.payload;
            const item = state.items.find(item => item.id === id && item.size === size);
            if (item) {
                item.quantity = Math.max(1, quantity);
            }
        },
        removeItem: (state, action) => {
            const { id, size } = action.payload;
            state.items = state.items.filter(item => !(item.id === id && item.size === size));
        },
        clearCart: state => {
            state.items = []; // Resets cart to empty
        },
        setAddresses: (state, action) => {
            state.addresses = action.payload;
        },
        selectAddress: (state, action) => {
            state.selectedAddressId = action.payload;
        },
        deleteAddress: (state, action) => {
            state.addresses = state.addresses.filter(addr => addr.id !== action.payload);
            if (state.selectedAddressId === action.payload) {
                state.selectedAddressId = null; // Reset if deleted address was selected
            }
        },
        updateAddress: (state, action) => {
            state.addresses = state.addresses.map(addr =>
                addr.id === action.payload.id ? action.payload : addr,
            );
        },
    },
});

export const {
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    setAddresses,
    selectAddress,
    deleteAddress,
} = cartSlice.actions;
export default cartSlice.reducer;

// Memoized Selectors
const selectCart = state => state.cart; //Gets the cart object from the Redux store.

export const selectCartItems = createSelector([selectCart], cart => cart.items); //Extracts the items array from cart.

export const selectCartTotal = createSelector(
    [selectCartItems],
    (
        items, //Computes the total price of all cart items.
    ) => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
);
