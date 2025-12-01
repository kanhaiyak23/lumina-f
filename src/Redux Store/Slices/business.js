import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    business: null,
    isLoading: false,
    error: null,
    isDirty: false,
};

const businessSlice = createSlice({
    name: "business",
    initialState,
    reducers: {
        setBusinessData: (state, action) => {
            state.business = action.payload;
            state.isDirty = false;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        markDirty: state => {
            state.isDirty = true;
        },
    },
});

export const { setBusinessData, setLoading, setError, markDirty } = businessSlice.actions;
export default businessSlice.reducer;
