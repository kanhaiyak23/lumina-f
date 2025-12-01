import { createSlice } from "@reduxjs/toolkit";

const initialState = { show: false, title: null };

export const loaderSlice = createSlice({
    name: "loader",
    initialState,
    reducers: {
        __showLoader: (state, action) => {
            state.show = true;
            if (action.payload) state.title = action.payload;
        },
        __hideLoader: state => {
            state.show = false;
            state.title = null;
        },
    },
});

export const { __showLoader, __hideLoader } = loaderSlice.actions;

export default loaderSlice.reducer;
