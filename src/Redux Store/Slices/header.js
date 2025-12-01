import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

export const headerSlice = createSlice({
    name: "header",
    initialState,
    reducers: {
        setHeaderTitle: (state, action) => {
            const newState = action.payload;
            return newState;
        },
    },
});

export const { setHeaderTitle } = headerSlice.actions;

export default headerSlice.reducer;
