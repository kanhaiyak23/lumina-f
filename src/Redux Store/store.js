import { configureStore, createReducer } from "@reduxjs/toolkit";

//* import reducer ( Slices files )
import authReducer from "./Slices/auth";
import headerReducer from "./Slices/header";
import globalDialogsReducer from "./Slices/globalDialogs";
import loaderReducer from "./Slices/loader";
import productsReducer from "./Slices/products";
import cartReducer from "./Slices/cart";
import orderReducer from "./Slices/order";
import subscriptionsReducer from "./Slices/subscriptionsSlice";
import businessReducer from "./Slices/business";

const store = configureStore({
    reducer: {
        auth: authReducer,
        header: headerReducer,
        globalDialogs: globalDialogsReducer,
        loader: loaderReducer,
        products: productsReducer,
        cart: cartReducer,

        order: orderReducer,
        subscriptions: subscriptionsReducer,
        business: businessReducer,
    },
    // devTools: true
});

export default store;
